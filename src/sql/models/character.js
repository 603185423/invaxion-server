const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('character', {
    accId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sessionid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      defaultValue: "0000000000"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "我名字呢？"
    },
    language: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    selectCharId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30040
    },
    selectThemeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    headId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30040
    },
    titleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10001
    },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    total4KScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    total6KScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    total8KScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30
    },
    curExp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxExp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    totalArcadeScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    preRank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    preRank4k: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    preRank6k: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    preRankParam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    preRank4kParam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    preRank6kParam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'character',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accId" },
        ]
      },
    ]
  });
};
