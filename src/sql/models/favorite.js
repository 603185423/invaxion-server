const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorite', {
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'favorite',
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
