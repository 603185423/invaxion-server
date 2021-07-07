var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _arcade = require("./arcade");
var _character = require("./character");
var _favorite = require("./mfavorite");
var _friend = require("./friend");
var _gate = require("./gate");
var _prerank = require("./prerank");
var _prerank4k = require("./prerank4k");
var _prerank6k = require("./prerank6k");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var arcade = _arcade(sequelize, DataTypes);
  var character = _character(sequelize, DataTypes);
  var favorite = _favorite(sequelize, DataTypes);
  var friend = _friend(sequelize, DataTypes);
  var gate = _gate(sequelize, DataTypes);
  var prerank = _prerank(sequelize, DataTypes);
  var prerank4k = _prerank4k(sequelize, DataTypes);
  var prerank6k = _prerank6k(sequelize, DataTypes);


  return {
    account,
    arcade,
    character,
    favorite,
    friend,
    gate,
    prerank,
    prerank4k,
    prerank6k,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
