'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employ.hasMany(models.Salerecord,{
        foreignKey: 'emp_id',
        as: 'employ', 
      });
      Employ.hasMany(models.Salerecord,{
        foreignKey: 'check_id',
        as: 'check', 
      });
    }
  };
  Employ.init({
    emp_id: DataTypes.INTEGER,
    emp_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employ',
  });
  return Employ;
};