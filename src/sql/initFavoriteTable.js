const Sequelize = require('./mysqlConfig');
const queryInterface = Sequelize.getQueryInterface();
const DataTypes = require("sequelize").DataTypes;
const songList = require('../config/songListConfig')

module.exports = async function (){
    let fav = await queryInterface.describeTable('favorite');
    for (let i in songList){
        let songId = songList[i].toString();
        if (!fav[songId]) {
            queryInterface.addColumn('favorite', songId, {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            });
        }

    }

}