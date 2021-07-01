const DataTypes = require("sequelize").DataTypes;
const _songTemplate = require("./models/songTemplate");

function initSongModels(sequelize, songId) {
    let songTemplate = _songTemplate(sequelize, DataTypes, songId);
    return songTemplate;

}
module.exports = initSongModels;
module.exports.initSongModels = initSongModels;
module.exports.default = initSongModels;
