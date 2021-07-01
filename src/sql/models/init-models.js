var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _character = require("./character");
var _favorite = require("./favorite");
var _friend = require("./friend");
var _gate = require("./gate");
var _s00000 = require("./s00000");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var character = _character(sequelize, DataTypes);
  var favorite = _favorite(sequelize, DataTypes);
  var friend = _friend(sequelize, DataTypes);
  var gate = _gate(sequelize, DataTypes);
  var s00000 = _s00000(sequelize, DataTypes);


  return {
    account,
    character,
    favorite,
    friend,
    gate,
    s00000,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
