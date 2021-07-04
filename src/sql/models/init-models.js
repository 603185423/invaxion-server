var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _arcade = require("./arcade");
var _character = require("./character");
var _favorite = require("./mfavorite");
var _friend = require("./friend");
var _gate = require("./gate");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var arcade = _arcade(sequelize, DataTypes);
  var character = _character(sequelize, DataTypes);
  var favorite = _favorite(sequelize, DataTypes);
  var friend = _friend(sequelize, DataTypes);
  var gate = _gate(sequelize, DataTypes);


  return {
    account,
    arcade,
    character,
    favorite,
    friend,
    gate,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
