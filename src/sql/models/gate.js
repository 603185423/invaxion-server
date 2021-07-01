const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gate', {
    gateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gateIP: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    gatePort: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    enable: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'gate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "gateID" },
        ]
      },
    ]
  });
};
