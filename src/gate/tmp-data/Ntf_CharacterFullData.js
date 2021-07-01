const songList = require('../../config/songListConfig')
const Sequelize = require('../../sql/mysqlConfig');
const models = require('../../sql/models/init-models')(Sequelize);
const initSongModels = require('../../sql/initSongModels');

const modeLink = {1: '4k', 2: '6k', 3: '8k',};
const difficultyLink = {1: 'ez', 2: 'nm', 3: 'hd',};
const keyModeList = {1: "key4List", 2: "key6List", 3: "key8List"};
const difficultList = {1: "easyList", 2: "normalList", 3: "hardList"};


function songModels(songId) {
    return initSongModels(Sequelize, songId);
}

async function getScoreList(charId){
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
            where: {charId: charId},
            include: inc[v],
            raw: false
        });
        if (!scores[0].hasOwnProperty('dataValues')) return {"key4List": {},"key6List": {},"key8List": {}};
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
    };
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
                });
            }
        }
    }
    return res;
}


module.exports = async function (accId = 1, charId = 1, charName = "6031", headId = 30040, curCharacterId = 30040, curThemeId = 1) {
    return {
        "data": {
            "baseInfo": {
                "accId": accId,
                "charId": charId,
                "charName": charName,
                "headId": headId,
                "level": 30,
                "curExp": 0,
                "maxExp": 0,
                "guideStep": 7,
                "curCharacterId": curCharacterId,
                "curThemeId": curThemeId,
                "onlineTime": 0,
                "needReqAppReceipt": 0,
                "activePoint": 0,
                "preRankId": 0,
                "guideList": [
                    9,
                    8,
                    7,
                    6,
                    5,
                    4,
                    3,
                    2,
                    1
                ],
                "country": 1,
                "preRankId4K": 0,
                "preRankId6K": 0,
                "titleId": 10001
            },
            "currencyInfo": {
                "gold": 0,
                "diamond": 999999,
                "curStamina": 0,
                "maxStamina": 10,
                "honourPoint": 0
            },
            "scoreList": await getScoreList(charId),
            "songList": {
                "list": [
                    {"songId" : 80031},
                    {"songId" : 80008},
                    {"songId" : 80011},
                    {"songId" : 80012},
                    {"songId" : 80010},
                    {"songId" : 80034},
                    {"songId" : 80007},
                    {"songId" : 80015},
                    {"songId" : 80013},
                    {"songId" : 80009},
                    {"songId" : 80014},
                    {"songId" : 80019},
                    {"songId" : 80020},
                    {"songId" : 80018},
                    {"songId" : 63122},
                    {"songId" : 63123},
                    {"songId" : 63204},
                    {"songId" : 62005},
                    {"songId" : 62006},
                    {"songId" : 63103},
                    {"songId" : 69008},
                    {"songId" : 68008},
                    {"songId" : 68108},
                    {"songId" : 80002},
                    {"songId" : 64005},
                    {"songId" : 69018},
                    {"songId" : 68002},
                    {"songId" : 68001},
                    {"songId" : 82005},
                    {"songId" : 82006},
                    {"songId" : 82007},
                    {"songId" : 82011},
                    {"songId" : 65102},
                    {"songId" : 68106},
                    {"songId" : 64003},
                    {"songId" : 62021},
                    {"songId" : 65036}
                ]
            },
            "charList": {
                "list": [
                    {
                        "charId": 20060,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40090,
                        "level": 1,
                        "exp": 0,
                        "playCount": 1
                    },
                    {
                        "charId": 40130,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 50010,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40010,
                        "level": 1,
                        "exp": 0,
                        "playCount": 422
                    },
                    {
                        "charId": 40040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 7
                    },
                    {
                        "charId": 10050,
                        "level": 1,
                        "exp": 0,
                        "playCount": 660
                    },
                    {
                        "charId": 10010,
                        "level": 1,
                        "exp": 0,
                        "playCount": 10
                    },
                    {
                        "charId": 10020,
                        "level": 1,
                        "exp": 0,
                        "playCount": 10
                    },
                    {
                        "charId": 20040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 76
                    },
                    {
                        "charId": 40220,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 10040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 2
                    },
                    {
                        "charId": 20050,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30070,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20020,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20090,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40320,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20030,
                        "level": 1,
                        "exp": 0,
                        "playCount": 1
                    },
                    {
                        "charId": 10030,
                        "level": 1,
                        "exp": 0,
                        "playCount": 6
                    },
                    {
                        "charId": 30050,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40150,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40260,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 171
                    },
                    {
                        "charId": 40330,
                        "level": 1,
                        "exp": 0,
                        "playCount": 65
                    },
                    {
                        "charId": 40120,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20170,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 10060,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30090,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40250,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30100,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30110,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId":1006010,
                        "level":1,
                        "exp":0,
                        "playCount":0
                    },
                    {
                        "charId":50050,
                        "level":1,
                        "exp":0,
                        "playCount":0
                    },
                    {
                        "charId":3004010,
                        "level":1,
                        "exp":0,
                        "playCount":0
                    },
                    {
                        "charId":30060,
                        "level":1,
                        "exp":0,
                        "playCount":0
                    }
                ]
            },
            "socialData": {},
            "announcement": {
                "list": [
                    {
                        "title": "运营公告",
                        "content": "<b><color=#ffa500ff>《音灵INVAXION》关服公告</color></b>\n\t\t  \n\n　　久等了，各位音之守护者。\n\t\t  \n　　欢迎来到<color=#ffa500ff>《音灵INVAXION》</color>的世界。\n\t\t  \n\n　　我们跑路了",
                        "picId": 0,
                        "tag": 1
                    },
                ],
                "picList": []

            },
            "themeList": {
                "list": [
                    {
                        "themeId": 1
                    },
                    {
                        "themeId": 2
                    },
                    {
                        "themeId": 3
                    },
                    {
                        "themeId": 4
                    },
                    {
                        "themeId": 5
                    },
                    {
                        "themeId": 6
                    },
                    {
                        "themeId": 7
                    },
                    {
                        "themeId": 8
                    },
                    {
                        "themeId": 9
                    },
                    {
                        "themeId": 10
                    },
                    {
                        "themeId": 11
                    },
                    {
                        "themeId": 12
                    },
                    {
                        "themeId": 13
                    },
                    {
                        "themeId": 14
                    }
                ]
            },
            "vipInfo": {
                "level": 0,
                "exp": 0,
                "levelUpExp": 100,
                "inSubscription": 0
            },
            "arcadeData": {
                "key4List": {},
                "key6List": {},
                "key8List": {}
            },
            "titleList": {
                "list": []
            },
            "team": {
                "teamId": 0,
                "teamName": "",
                "uploadSongCount": 3,
                "canUploadSong": 0
            }
        }
    }
};
