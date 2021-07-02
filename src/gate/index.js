const log4js = require('log4js');
const Ntf_CharacterFullData = require('./tmp-data/Ntf_CharacterFullData.js');
const Ret_ShopInfo = require('./tmp-data/Ret_ShopInfo.js');
const Ret_Event_Info = require('./tmp-data/Ret_Event_Info.js');
const sqlite3 = require("sqlite3").verbose();
const Sequelize = require('../sql/mysqlConfig');
const models = require('../sql/models/init-models')(Sequelize);
const initSongModels = require('../sql/initSongModels');
const {Op} = require("sequelize");

function songModels(songId) {
    return initSongModels(Sequelize, songId);
}

const logger = log4js.getLogger('app:gate:handler');

const handlers = new Map();
const dbname = "db.db"
const rankListLength = 100;

const modeLink = {1: '4k', 2: '6k', 3: '8k',}
const difficultyLink = {1: 'ez', 2: 'nm', 3: 'hd',}

function getSuf(mode, difficulty) {
    return '_' + modeLink[mode] + difficultyLink[difficulty]
};

function addSuf(suf, ...strs) {
    let res = [];
    strs.forEach(function (v) {
        res.push([v + suf, v]);
    });
    return res;
}

handlers.set(1003, (req, res) => {  //gate
    logger.info('上报游戏时间');
});

handlers.set(1005, async (req, res, now, sessionid) => {  //gate
    logger.info('登陆入口检测');
    res.write({
        mainCmd: 1,
        paraCmd: 1,
        data: {
            gametime: parseInt((new Date().getTime() / 1000).toString())
        }
    });
    let accId = req.data["accId"];
    let token = req.data["token"];
    let acc = await models.account.findOne({where: {accId: accId}});
    if (acc === null || acc.token !== token) return;
    let [chara, created] = await models.character.findOrCreate( {where: {accId: accId}, defaults: {accId: accId}});
    models.character.update({sessionid: sessionid}, {where: {accId: accId}});
    let userList = [{charId: chara.charId, accStates: 0}];
    if (chara.charId === "0000000000") userList = [];
    res.write({
        mainCmd: 3,
        paraCmd: 6,
        data: {
            userList: userList
        }
    });

});

handlers.set(1007, async (req, res, now, sessionid) => {  //gate
    logger.info('新建角色的进入游戏');
    await models.character.update({
        name: req.data["name"],
        selectCharId: req.data["selectCharId"],
        language: req.data["language"],
        country: req.data["country"],
        headId: req.data["selectCharId"]
    }, {where: {sessionid: sessionid}});
    let chara = await models.character.findOne({where: {sessionid: sessionid}});
    let charId = Math.round(chara.accId + 4000000000).toString()
    await models.character.update({charId: charId}, {where: {sessionid: sessionid}});
    res.write({
        mainCmd: 5,
        paraCmd: 1,
        data: await Ntf_CharacterFullData(chara.accId, charId, chara.name, chara.headId, chara.selectCharId, chara.selectThemeId)
    });
});

handlers.set(1008, async (req, res, now, sessionid) => { //gate
    logger.info('进入游戏');
    let chara = await models.character.findOne({where: {sessionid: sessionid}})
    res.write({
        mainCmd: 5,
        paraCmd: 1,
        data: await Ntf_CharacterFullData(chara.accId, chara.charId, chara.name, chara.headId, chara.selectCharId, chara.selectThemeId)
    });
});

handlers.set(2, (req, res) => {
    logger.info('开始打歌');
});

handlers.set(4, async (req, res, now, sessionid) => {
    logger.info('完成打歌');
    let songInfo = req.data["data"];
    let totalScore = songInfo["totalScore"], total4KScore = songInfo["total4KScore"],
        total6KScore = songInfo["total6KScore"], total8KScore = songInfo["total8KScore"];
    models.character.update({
        totalScore: totalScore,
        total4KScore: total4KScore,
        total6KScore: total6KScore,
        total8KScore: total8KScore,
        sessionid: sessionid
    }, {where: {sessionid: sessionid}})
    let songId = songInfo["songId"];
    let difficulty = songInfo["difficulty"];
    let mode = songInfo["mode"];
    songInfo = songInfo["playData"];
    songInfo = {
        songId: songId,
        finishLevel: songInfo["finishLevel"],
        score: songInfo["score"],
        combo: songInfo["combo"],
        isFullCombo: songInfo["isFullCombo"],
        maxPercent: songInfo["maxPercent"],
        miss: songInfo["miss"],
        just: songInfo["just"],
        life: songInfo["life"],
        accuracy: songInfo["accuracy"],
        isAllMax: songInfo["isAllMax"],
        time: Date.now()
    };

    let chara = await models.character.findOne({attributes: ['charId'], where: {sessionid: sessionid}});
    let charId = chara.charId;
    let suf = getSuf(mode, difficulty);
    let att = addSuf(suf, "finishLevel", "score", "combo", "isFullCombo", "maxPercent", "miss", "just", "life", "accuracy", "isAllMax", "time", "playCount");
    att.push('songId');
    await songModels(songId).sync();
    let [songInfoOld,] = await songModels(songId).findOrCreate({attributes: att, where: {charId: charId}});
    let upd = {};
    if (songInfoOld.score > songInfo.score) {
        songInfo = songInfoOld.dataValues;
        upd['playCount' + suf] = ++songInfo.playCount;
    } else {
        songInfo["playCount"] = ++songInfoOld.dataValues.playCount;
        for (let key in songInfo) {
            if (key === 'songId') upd[key] = songInfo[key];
            else upd[key + suf] = songInfo[key];
        }
    }
    songModels(songId).update(upd, {where: {charId: charId}});
    songInfo.playCount++;
    songInfo = {
        songId: songInfo["songId"],
        finishLevel: songInfo["finishLevel"],
        score: songInfo["score"],
        isFullCombo: songInfo["isFullCombo"],
        miss: songInfo["miss"],
        playCount: songInfo["playCount"],
        isAllMax: songInfo["isAllMax"],
    }
    res.write({
        mainCmd: 5,
        paraCmd: 5,
        data: {
            songInfo: songInfo,
            settleData: {changeList: [{type: 9, count: 450, id: 0}], expData: {level: 30, curExp: 0, maxExp: 0}},
            newRank: 0
        }
    });

});

handlers.set(6, async (req, res) => {
    logger.info('单一歌曲排行榜');
    let weekly = {};
    const deltaTime = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let suf = getSuf(req.data["mode"], req.data["difficulty"]);
    if (req.data.hasOwnProperty("isWeek")) weekly['time' + suf] = {[Op.gt]: deltaTime};
    await songModels(req.data["songId"]).sync();
    let att = addSuf(suf, "score");
    att.push('charId');
    let rank = await songModels(req.data["songId"]).findAll({
        attributes: att,
        where: weekly,
        include: [{
            association: songModels(req.data["songId"]).belongsTo(models.character, {
                foreignKey: 'charId',
                targetKey: 'charId'
            }),
            attributes: [['name', 'charName'], 'headId', 'country', 'titleId']
        }],
        order: [['score' + suf, 'DESC']],
        limit: rankListLength,
        raw: false
    })
    let rankList = [];
    rank.forEach(function (v, i) {
        //if (!(v.hasOwnProperty("dataValues") && v.dataValues.character.hasOwnProperty("dataValues"))) return;
        rankList.push({
            rank: i + 1,
            charName: v.dataValues.character.dataValues.charName,
            score: v.dataValues.score,
            headId: v.dataValues.character.dataValues.headId,
            charId: v.dataValues.charId,
            country: v.dataValues.character.dataValues.country,
            titleId: v.dataValues.character.dataValues.titleId,
        });
    });
    if (rankList.length === 0) rankList.push({
        rank: 1,
        charName: "此歌暂时无人游玩",
        score: 1,
        headId: 10010,
        charId: "000000000",
        country: 1,
        teamName: "",
        titleId: 10001
    }, {
        rank: 2,
        charName: "快来争当排行榜第一！",
        score: 2,
        headId: 10010,
        charId: "000000000",
        country: 1,
        teamName: "",
        titleId: 10001
    });
    res.write({
        mainCmd: 5,
        paraCmd: 7,
        data: {
            list: rankList
        }
    });

});

handlers.set(8, async (req, res) => {
    logger.info('排行榜');
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    let rankType = req.data["type"];
    let sqlReqStr = "";
    if (rankType === 0) sqlReqStr = "totalScore";
    else if (rankType === 5) sqlReqStr = "total4KScore";
    else if (rankType === 6) sqlReqStr = "total6KScore";
    else if (rankType === 7) sqlReqStr = "total8KScore";
    else return;
    let whe = {};
    whe[sqlReqStr]={[Op.gt]: 0};
    let scores = await models.character.findAll({
        attributes: [['name','charName'], 'headId', [sqlReqStr, 'score'], 'country', 'titleId'],
        where: whe,
        order: [[sqlReqStr, 'DESC']],
        limit: rankListLength
    })
    let scoreList = [];
    scores.forEach(function (v, i) {
        scoreList.push({
            rank: i + 1,
            charName: v.dataValues.charName,
            score: v.dataValues.score,
            headId: v.dataValues.headId,
            country: v.dataValues.country,
            titleId: v.dataValues.titleId,
        });
    });
    if (scoreList.length === 0)scoreList.push({
            rank: 1,
            charName: "暂时无人游玩",
            score: 1,
            headId: 10010,
            country: 1,
            teamName: "",
            titleId: 10001
        },
        {
            rank: 2,
            charName: "快来争当第一",
            score: 2,
            headId: 10010,
            charId: "000000000",
            country: 1,
            teamName: "",
            titleId: 10001
        });
    res.write({
        mainCmd: 5,
        paraCmd: 9,
        data: {
            list: scoreList,
            type: rankType,
        }
    });
});

handlers.set(30, (req, res, now, sessionid) => {
    logger.info('更换头像');
    res.write({
        mainCmd: 5,
        paraCmd: 31,
        data: {id: req.data["id"]}
    });
    models.character.update({headId: req.data["id"]},{where: {sessionid: sessionid}});
});

handlers.set(32, (req, res, now, sessionid) => {
    logger.info('更换角色');
    res.write({
        mainCmd: 5,
        paraCmd: 33,
        data: {id: req.data["id"]}
    });
    models.character.update({selectCharId: req.data["id"]},{where: {sessionid: sessionid}});
});

handlers.set(34, (req, res, now, sessionid) => {
    logger.info('更换主题');
    res.write({
        mainCmd: 5,
        paraCmd: 35,
        data: {id: req.data["id"]}
    });
    models.character.update({selectThemeId: req.data["id"]},{where: {sessionid: sessionid}});
});

handlers.set(36, (req, res) => {
    logger.info('店铺信息');
    res.write({
        mainCmd: 5,
        paraCmd: 37,
        data: Ret_ShopInfo
    });
});

handlers.set(58, (req, res) => {
    logger.info('新建角色');
    res.write({
        mainCmd: 5,
        paraCmd: 59,
        data: {}
    });
});

handlers.set(73, (req, res) => {
    logger.info('公开动态');
    res.write({
        mainCmd: 5,
        paraCmd: 74,
        data: {
            contentList: req.data["contentList"]
        }
    });
});

handlers.set(100, (req, res) => {
    logger.info('店铺信息');
    res.write({
        mainCmd: 5,
        paraCmd: 101,
        data: Ret_Event_Info
    });
});

async function dispatch(req, res, now, sessionid) {
    const handler = handlers.get((req.mainCmd === 1 || req.mainCmd === 3) ? req.paraCmd + 1000 : req.paraCmd);
    if (!handler)
        logger.error('Handler not implemented! paraCmd %d', req.paraCmd);
    return handler(req, res, now, sessionid);
}

exports.dispatch = dispatch;
