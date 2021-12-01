const Sequelize = require('./sql/mysqlConfig');
const models = require('./sql/models/init-models')(Sequelize);
const crypto = require('crypto');
const initSongModels = require('./sql/initSongModels');
const sequelize = require('sequelize');
const songList = require('./config/songListConfig')
const gate = require('./gate');
const {Op} = require("sequelize");
const queryInterface = Sequelize.getQueryInterface();
const DataTypes = require("sequelize").DataTypes;

const modeLink = {1: '4k', 2: '6k', 3: '8k',};
const difficultyLink = {1: 'ez', 2: 'nm', 3: 'hd',};
const keyModeList = {1: "key4List", 2: "key6List", 3: "key8List"};
const difficultList = {1: "easyList", 2: "normalList", 3: "hardList"};
const shuffle = require('knuth-shuffle').knuthShuffle;

function songModels(songId) {
    return initSongModels(Sequelize, songId);
}

function addSuf(suf, ...strs) {
    let res = [];
    strs.forEach(function (v) {
        res.push([v + suf, v]);
    });
    return res;
}

function getSuf(mode, difficulty) {
    return '_' + modeLink[mode] + difficultyLink[difficulty];
}

(async function () {
    let sessionid = 1629787663158;
    let data = {
        "pkgLen": 20,
        "mainCmd": 5,
        "paraCmd": 164,
        "dataLen": 16,
        "data": {"data": {"levelId": 303, "curState": 3, "percent": 9675, "score": 2965325}, "type": 1}
    };
    // await gate.dispatch(data, {
    //     write: function (a) {
    //     }
    // }, sessionid, sessionid);
    let req={data:{}};
    req.data["songId"]=69002;
    req.data["mode"]=1;
    req.data["difficulty"]=3;
    let suf = getSuf(req.data["mode"], req.data["difficulty"]);
    let att = addSuf(suf, "score");
    let weekly = {};
    weekly['score' + suf] = {[Op.gt]: 0};
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
        order: [['score' + suf, 'DESC'], ['time' + suf]],
        limit: 100,
        raw: false
    })
    console.log(1);
})()

