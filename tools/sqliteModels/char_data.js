const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('char_data', {
    charId: {
      type: DataTypes.CHAR(10),
      primaryKey: true,
      allowNull: true
    },
    s63123: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65014: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80034: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68106: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s64005: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s84101: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80003: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65011: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68107: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80016: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82006: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82002: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80041: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63122: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65012: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62011: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s67002: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68003: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63120: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82007: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68101: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62023: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s81005: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80007: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82011: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82004: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62010: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69008: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80020: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82005: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80044: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80018: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62004: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68002: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80006: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63101: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80010: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62017: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69002: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80004: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80009: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65032: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63204: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80014: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65006: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80008: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82008: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80012: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65102: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62020: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80045: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82010: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80015: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82000: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82009: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80019: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s82003: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69017: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62012: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65036: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80011: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62019: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80013: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s64002: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s84102: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80040: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63103: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62006: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68004: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68008: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80033: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63121: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80038: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62013: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68108: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80035: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63003: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s84100: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62024: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80002: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80005: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80042: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80043: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80017: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65034: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80036: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62016: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68104: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80046: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80028: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s67004: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80031: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68005: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65035: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80032: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65037: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80023: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65101: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s67003: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68105: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s63102: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80037: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62008: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68007: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62022: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s64004: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69903: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68006: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69901: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68103: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68102: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s66001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80039: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s64003: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62005: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65031: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62018: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69012: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s69018: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s68009: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s64001: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s62021: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80021: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80030: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s65033: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s80029: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    s90000: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'char_data',
    timestamps: false
  });
};
