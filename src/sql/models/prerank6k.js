const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prerank6k', {
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    curState_101: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_102: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_103: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_104: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_201: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_202: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_203: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_204: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_301: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_302: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    curState_303: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    percent_101: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_102: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_103: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_104: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_201: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_202: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_203: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_204: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_301: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_302: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    percent_303: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_101: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_102: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_103: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_104: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_201: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_202: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_203: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_204: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_301: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_302: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_303: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    unLocked_101: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_102: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_103: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_104: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_201: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_202: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_203: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_204: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    unLocked_301: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    unLocked_302: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    unLocked_303: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'prerank6k',
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
