const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friend', {
    charId: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'friend',
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
