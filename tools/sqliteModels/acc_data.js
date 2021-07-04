const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('acc_data', {
    accId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    sessionid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    steamId: {
      type: DataTypes.STRING(26),
      allowNull: true
    },
    token: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      defaultValue: "0000000000"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    language: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    selectCharId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    headId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    selectThemeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
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
    }
  }, {
    sequelize,
    tableName: 'acc_data',
    timestamps: false
  });
};
