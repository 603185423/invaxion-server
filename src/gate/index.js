const log4js = require('log4js');
const Ntf_CharacterFullData = require('./tmp-data/Ntf_CharacterFullData.js');
const Ret_ShopInfo = require('./tmp-data/Ret_ShopInfo.js');
const Ret_Event_Info = require('./tmp-data/Ret_Event_Info.js');
const sqlite3 = require("sqlite3").verbose();
const Sequelize = require('../sql/mysqlConfig');
const models = require('../sql/models/init-models')(Sequelize);
const initSongModels = require('../sql/initSongModels');
const {Op} = require("sequelize");
const arcadeList = require("./arcadeList");
const shuffle = require('knuth-shuffle').knuthShuffle;

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
    return '_' + modeLink[mode] + difficultyLink[difficulty];
}

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
    let [chara, created] = await models.character.findOrCreate({where: {accId: accId}, defaults: {accId: accId}});
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
    let sqlReqStr = "", sqlReqStr2 = "";
    let scoreList = [];
    let noPlayer1 = {rank: 1, charName: "暂时无人游玩", score: 1, headId: 10010, country: 1, teamName: "", titleId: 10001};
    let noPlayer2 = {
        rank: 2,
        charName: "快来争当第一",
        score: 2,
        headId: 10010,
        charId: "000000000",
        country: 1,
        teamName: "",
        titleId: 10001
    };
    if (rankType === 0) sqlReqStr = "totalScore";
    else if (rankType === 5) sqlReqStr = "total4KScore";
    else if (rankType === 6) sqlReqStr = "total6KScore";
    else if (rankType === 7) sqlReqStr = "total8KScore";
    else if (rankType === 8) sqlReqStr = "totalArcadeScore";
    else if (rankType === 4) {
        sqlReqStr = "preRank";
        sqlReqStr2 = "preRankParam";
    } else if (rankType === 9) {
        sqlReqStr = "preRank4k";
        sqlReqStr2 = "preRank4kParam";
    } else if (rankType === 10) {
        sqlReqStr = "preRank6k";
        sqlReqStr2 = "preRank6kParam";
    } else {
        res.write({mainCmd: 5, paraCmd: 9, data: {list: [noPlayer1, noPlayer2], type: rankType,}});
        return;
    }
    let whe = {};
    whe[sqlReqStr] = {[Op.gt]: 0};
    let att = [['name', 'charName'], 'headId', [sqlReqStr, 'score'], 'country', 'titleId'];
    let ord = [[sqlReqStr, 'DESC']];
    if (rankType === 4 || rankType === 9 || rankType === 10) {
        whe[sqlReqStr2] = {[Op.gt]: 0};
        att.push([sqlReqStr2, 'param']);
        ord.push([sqlReqStr2, 'DESC']);
    }
    let scores = await models.character.findAll({
        attributes: att,
        where: whe,
        order: ord,
        limit: rankListLength
    })
    scores.forEach(function (v, i) {
        let sl = {
            rank: i + 1,
            charName: v.dataValues.charName,
            score: v.dataValues.score,
            headId: v.dataValues.headId,
            country: v.dataValues.country,
            titleId: v.dataValues.titleId,
        };
        if (rankType === 4 || rankType === 9 || rankType === 10) {
            sl['param'] = v.dataValues.param;
        }
        scoreList.push(sl);
    });
    if (scoreList.length === 0) scoreList.push(noPlayer1, noPlayer2);
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
    models.character.update({headId: req.data["id"]}, {where: {sessionid: sessionid}});
});

handlers.set(32, (req, res, now, sessionid) => {
    logger.info('更换角色');
    res.write({
        mainCmd: 5,
        paraCmd: 33,
        data: {id: req.data["id"]}
    });
    models.character.update({selectCharId: req.data["id"]}, {where: {sessionid: sessionid}});
});

handlers.set(34, (req, res, now, sessionid) => {
    logger.info('更换主题');
    res.write({
        mainCmd: 5,
        paraCmd: 35,
        data: {id: req.data["id"]}
    });
    models.character.update({selectThemeId: req.data["id"]}, {where: {sessionid: sessionid}});
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

handlers.set(10, async (req, res, now, sessionid) => {
    logger.info('收藏歌曲');
    res.write({
        mainCmd: 5,
        paraCmd: 11,
        data: {
            songId: req.data['songId'],
            isFavorite: req.data['isFavorite']
        }
    });
    let chara = await models.character.findOne({attributes: ['charId']}, {where: {sessionid: sessionid}});
    let charId = chara.charId;
    let upd = {};
    upd[req.data['songId']] = req.data['isFavorite'];
    models.favorite.update(upd, {where: {charId: charId}});
});

handlers.set(87, (req, res) => {
    logger.info('街机模式');
    let stageList = [];
    for (let i = 0; i < 3; i++) {
        shuffle(arcadeList[i]);
        let songList = [];
        for (let j = 0; j < 8; j++) {
            songList.push(arcadeList[i][j]);
        }
        stageList.push({
            stageId: i + 1,
            songList: songList,
        })
    }
    res.write({
        mainCmd: 5,
        paraCmd: 88,
        data: {
            stageList: stageList
        }
    });
});

handlers.set(89, async (req, res, now, sessionid) => {
    logger.info('街机模式结束');
    res.write({
        mainCmd: 5,
        paraCmd: 90,
        data: {}
    });
    let totalArcadeScore = req.data["finishList"][0]["finishData"]["playData"]["score"] +
        req.data["finishList"][1]["finishData"]["playData"]["score"] +
        req.data["finishList"][2]["finishData"]["playData"]["score"];
    let chara = await models.character.findOne({attributes: ['charId', 'totalArcadeScore']}, {where: {sessionid: sessionid}});
    if (chara.totalArcadeScore < totalArcadeScore) {
        models.character.update({totalArcadeScore: totalArcadeScore}, {where: {sessionid: sessionid}});
        await models.arcade.findOrCreate({where: {charId: chara.charId}});
        models.arcade.update({
            finishData1: req.data["finishList"][0]["finishData"],
            finishData2: req.data["finishList"][1]["finishData"],
            finishData3: req.data["finishList"][2]["finishData"],
        }, {
            where: {charId: chara.charId}
        });
    }
});

handlers.set(160, async (req, res, now, sessionid) => {
    logger.info('段位模式');
    let data = {preRank: {list: [], curRank: 0}, preRank4K: {list: [], curRank: 0}, preRank6K: {list: [], curRank: 0}};
    let chara = await models.character.findOne({attributes: ['charId', 'preRank', 'preRank4k', 'preRank6k']}, {where: {sessionid: sessionid}});
    let [preRank,] = await models.prerank.findOrCreate({where: {charId: chara.charId}});
    let [preRank4k,] = await models.prerank4k.findOrCreate({where: {charId: chara.charId}});
    let [preRank6k,] = await models.prerank6k.findOrCreate({where: {charId: chara.charId}});
    const levelIdList = [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303];
    let preRankDic = {preRank: preRank, preRank4K: preRank4k, preRank6K: preRank6k};
    for (let pr in preRankDic) {
        for (let id in levelIdList) {
            if (preRankDic[pr].getDataValue('unLocked_' + levelIdList[id])) {
                data[pr].list.push({
                    levelId: levelIdList[id],
                    curState: preRankDic[pr].getDataValue('curState_' + levelIdList[id]),
                    percent: preRankDic[pr].getDataValue('percent_' + levelIdList[id]),
                    score: preRankDic[pr].getDataValue('score_' + levelIdList[id])
                });
            }
            if (preRankDic[pr].getDataValue('score_' + levelIdList[id])) {
                data[pr].curRank = levelIdList[id];
            }
        }
    }
    res.write({
        mainCmd: 5,
        paraCmd: 161,
        data: data
    });
});

handlers.set(162, (req, res, now, sessionid) => {
    logger.info('段位开始');
    res.write({
        mainCmd: 5,
        paraCmd: 163,
        data: {
            levelId: req.data['levelId'],
            type: req.data['type'],
            settleData: {}
        }
    });
});

handlers.set(164, async (req, res, now, sessionid) => {
    logger.info('段位结束');
    const levelIdList = [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303];
    let chara = await models.character.findOne({attributes: ['charId']}, {where: {sessionid: sessionid}})
    let curPRId = req.data['data']['levelId'];
    let nextPRId = 0;
    let data = {newRank: 0, type: req.data['type']};
    let preRankModelsLink = {1: models.prerank, 2: models.prerank4k, 3: models.prerank6k};
    let preRankColumnLink = {1: 'preRank', 2: 'preRank4k', 3: 'preRank6k'};
    if (curPRId !== 303) {
        for (let i in levelIdList) {
            if (levelIdList[i] === curPRId) {
                nextPRId = levelIdList[parseInt(i) + 1];
                let charPR = await preRankModelsLink[req.data['type']].findOne({attributes: [['unLocked_' + nextPRId, 'unLocked']]}, {where: {charId: chara.charId}});
                if (!charPR.unLocked) {
                    data['openData'] = {
                        levelId: nextPRId,
                        curState: 1,
                        percent: 0,
                        score: 0
                    };
                    let upd1 = {};
                    upd1['unLocked_' + nextPRId] = true;
                    preRankModelsLink[req.data['type']].update(upd1, {where: {charId: chara.charId}});
                    let upd2 = {};
                    upd2[preRankColumnLink[req.data['type']]] = curPRId;
                    upd2[preRankColumnLink[req.data['type']] + 'Param'] = req.data['data']['percent'];
                    models.character.update(upd2, {where: {charId: chara.charId}});
                }
                break;
            }
        }
    } else {
        let upd2 = {};
        upd2[preRankColumnLink[req.data['type']]] = curPRId;
        models.character.update(upd2, {where: {charId: chara.charId}});
    }
    res.write({
        mainCmd: 5,
        paraCmd: 165,
        data: data
    });
    let pr = await preRankModelsLink[req.data['type']].findOne({
        attributes: [['percent_' + curPRId, 'percent']],
        where: {charId: chara.charId}
    });
    if (pr.dataValues.percent < req.data['data']['percent']) {
        let upd1 = {};
        upd1['curState_' + curPRId] = req.data['data']['curState'];
        upd1['percent_' + curPRId] = req.data['data']['percent'];
        upd1['score_' + curPRId] = req.data['data']['score'];
        preRankModelsLink[req.data['type']].update(upd1, {where: {charId: chara.charId}});
        let upd2 = {};
        upd2[preRankColumnLink[req.data['type']] + 'Param'] = req.data['data']['percent'];
        models.character.update(upd2, {where: {charId: chara.charId}})
    }
});

async function dispatch(req, res, now, sessionid) {
    const handler = handlers.get((req.mainCmd === 1 || req.mainCmd === 3) ? req.paraCmd + 1000 : req.paraCmd);
    if (!handler)
        logger.error('Handler not implemented! paraCmd %d', req.paraCmd);
    return handler(req, res, now, sessionid);
}

exports.dispatch = dispatch;
