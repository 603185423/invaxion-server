var DataTypes = require("sequelize").DataTypes;
var _acc_data = require("./acc_data");
var _char_data = require("./char_data");

function initModels(sequelize) {
  var acc_data = _acc_data(sequelize, DataTypes);
  var char_data = _char_data(sequelize, DataTypes);


  return {
    acc_data,
    char_data,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
