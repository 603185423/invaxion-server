const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s00000', {
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    finishLevel_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_4kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_4knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_4khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_6kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_6knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_6khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_8kez: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_8knm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    finishLevel_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    score_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    combo_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFullCombo_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maxPercent_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    miss_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    just_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    life_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    accuracy_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isAllMax_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    playCount_8khd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    time_4kez: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_4knm: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_4khd: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_6kez: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_6knm: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_6khd: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_8kez: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_8knm: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    time_8khd: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 's00000',
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
