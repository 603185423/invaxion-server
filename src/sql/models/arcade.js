const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arcade', {
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    finishData1: {
      type: DataTypes.JSON,
      allowNull: true
    },
    finishData2: {
      type: DataTypes.JSON,
      allowNull: true
    },
    finishData3: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'arcade',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "charId" },
        ]
      },
    ]
  });
};
