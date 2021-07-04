const Sequelize_mysql = require('../src/sql/mysqlConfig');
const models_mysql = require('../src/sql/models/init-models')(Sequelize_mysql);
const initSongModels = require('../src/sql/initSongModels');
const initSongTables = require('../src/sql/initSongTables');

function songModels_mysql(songId) {
    return initSongModels(Sequelize_mysql, songId);
}

const Sequelize_sqlite = require('sequelize');
const sequelize_sqlite = new Sequelize_sqlite({
    dialect: 'sqlite',
    storage: '../src/db.db',
});
const models_sqlite = require("./sqliteModels/init-models")(sequelize_sqlite);


const modeLink = {1: '4k', 2: '6k', 3: '8k',};
const difficultyLink = {1: 'ez', 2: 'nm', 3: 'hd',};

function getSuf(mode, difficulty) {
    return '_' + modeLink[mode] + difficultyLink[difficulty];
}

(async function () {
    let songTableNotExist = [];
    await models_mysql.account.sync();
    await models_mysql.character.sync();
    await initSongTables();
    let accData = await models_sqlite.acc_data.findAll();
    let charData = await models_sqlite.char_data.findAll();
    // for (let i in accData) {
    //     models_mysql.account.create({
    //         accId: accData[i].accId,
    //         steamId: accData[i].steamId,
    //         token: accData[i].token,
    //     });
    //     models_mysql.character.create({
    //         accId: accData[i].accId,
    //         sessionid: accData[i].sessionid,
    //         charId: accData[i].charId,
    //         name: accData[i].name,
    //         language: accData[i].language,
    //         country: accData[i].country,
    //         selectCharId: accData[i].selectCharId,
    //         selectThemeId: accData[i].selectThemeId,
    //         headId: accData[i].headId,
    //         totalScore: accData[i].totalScore,
    //         total4KScore: accData[i].total4KScore,
    //         total6KScore: accData[i].total6KScore,
    //         total8KScore: accData[i].total8KScore,
    //     });
    // }
    for (let i in charData) {
        console.log(i);
        for (let key in charData[i].dataValues) {
            if (key === 'charId' || charData[i][key] === null) continue;
            let info = JSON.parse(charData[i].dataValues[key]);
            let songId = parseInt(key.slice(1));
            let cre = {charId: charData[i]['charId'], songId: songId};
            for (let mode in info) {
                for (let difficulty in info[mode]) {
                    cre["finishLevel" + getSuf(mode, difficulty)] = info[mode][difficulty]["finishLevel"];
                    cre["score" + getSuf(mode, difficulty)] = info[mode][difficulty]["score"];
                    cre["isFullCombo" + getSuf(mode, difficulty)] = info[mode][difficulty]["isFullCombo"];
                    cre["miss" + getSuf(mode, difficulty)] = info[mode][difficulty]["miss"];
                    cre["isAllMax" + getSuf(mode, difficulty)] = info[mode][difficulty]["isAllMax"];
                    cre["time" + getSuf(mode, difficulty)] = info[mode][difficulty]["time"];
                    cre["playCount" + getSuf(mode, difficulty)] = info[mode][difficulty]["playCount"];
                }
            }
            try {
                songModels_mysql(songId).create(cre);
            } catch (e) {
                console.log(e);
                songTableNotExist.push(songId);
            }
        }
    }
    console.log('waiting...');
})()