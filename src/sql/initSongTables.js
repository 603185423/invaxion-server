const songList = require("../config/songListConfig");
const Sequelize = require('./mysqlConfig');
const initSongModels = require('./initSongModels');

function songModels(songId) {
    return initSongModels(Sequelize, songId);
}

function initSongTables(){
    songList.forEach(function (v){
       songModels(v).sync();
    });
}
module.exports = initSongTables;