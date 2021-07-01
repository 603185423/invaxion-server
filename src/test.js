const Sequelize = require('./sql/mysqlConfig');
const models = require('./sql/models/init-models')(Sequelize);
const crypto = require('crypto');
const initSongModels = require('./sql/initSongModels');
const sequelize = require('sequelize');
const songList = require('./config/songListConfig')

const modeLink = {1: '4k', 2: '6k', 3: '8k',};
const difficultyLink = {1: 'ez', 2: 'nm', 3: 'hd',};
const keyModeList = {1: "key4List", 2: "key6List", 3: "key8List"};
const difficultList = {1: "easyList", 2: "normalList", 3: "hardList"};

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

(async function () {
    let sessionid = 1625125366631;
    let inc = [];
    songList.forEach(function (v, i) {
        if (i % 60 === 0) inc.push([]);
        inc[Math.floor(i / 60)].push({
            association: models.character.belongsTo(songModels(v), {
                foreignKey: 'charId',
                targetKey: 'charId'
            }),
            exclude: ['charId', 'songId']
        })
    });
    let scoreList = {};
    for (let v in inc){
        let scores = await models.character.findAll({
            attributes: [],
            where: {sessionid: sessionid},
            include: inc[v],
            raw: false
        });
        for (let key in scores[0].dataValues){
            if (scores[0].dataValues[key] !== null){
                scoreList[parseInt(key.slice(1))]=scores[0].dataValues[key].dataValues;
            }
        }
    }
    let res = {
        "key4List": {},
        "key6List": {},
        "key8List": {}
    }
    for (let songId in scoreList){
        for (let keyNum in modeLink){
            for (let diffNum in difficultyLink){
                if (scoreList[songId]['score_' + modeLink[keyNum] + difficultyLink[diffNum]]===0)continue;
                if (!res[keyModeList[keyNum]].hasOwnProperty(difficultList[diffNum]))res[keyModeList[keyNum]][difficultList[diffNum]] = [];
                res[keyModeList[keyNum]][difficultList[diffNum]].push({
                    songId: songId,
                    finishLevel: scoreList[songId]['finishLevel_' + modeLink[keyNum] + difficultyLink[diffNum]],
                    score: scoreList[songId]['score_' + modeLink[keyNum] + difficultyLink[diffNum]],
                    isFullCombo: scoreList[songId]['isFullCombo_' + modeLink[keyNum] + difficultyLink[diffNum]],
                    miss: scoreList[songId]['miss_' + modeLink[keyNum] + difficultyLink[diffNum]],
                    playCount: scoreList[songId]['playCount_' + modeLink[keyNum] + difficultyLink[diffNum]],
                    isAllMax: scoreList[songId]['isAllMax_' + modeLink[keyNum] + difficultyLink[diffNum]],
                })
            }
        }
    }

    console.log(1);
})()