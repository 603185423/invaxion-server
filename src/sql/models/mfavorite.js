const Sequelize = require('sequelize');
const songList = require('../../config/songListConfig')

function colInit(DataTypes) {
    let ret = {
        charId: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            primaryKey: true
        }
    }
    songList.forEach(function (v){
        ret[v] = {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0};
    })
    return ret;
}

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('favorite', colInit(DataTypes), {
        sequelize,
        tableName: 'favorite',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "charId"},
                ]
            },
        ]
    });
};
