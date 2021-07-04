const songList = require("../config/songListConfig");
const Sequelize = require('./mysqlConfig');
const initSongModels = require('./initSongModels');

function songModels(songId) {
    return initSongModels(Sequelize, songId);
}

async function initSongTables(){
    for (let i in songList){
        await songModels(songList[i]).sync();
    }
}
module.exports = initSongTables;