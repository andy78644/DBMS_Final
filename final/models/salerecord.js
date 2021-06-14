'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salerecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Salerecord.belongsTo(models.Member, {
        foreignKey: 'mem_id',
        as: 'member'
      });
      Salerecord.belongsTo(models.Employ, {
        foreignKey: 'emp_id',
        as: 'employ'
      });
      Salerecord.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book'
      });
      Salerecord.belongsTo(models.Employ, {
        foreignKey: 'check_id',
        as: 'check'
      });
    }
  };
  Salerecord.init({
    record_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    selling_price: DataTypes.INTEGER,
    mem_id: DataTypes.INTEGER,
    emp_id: DataTypes.INTEGER,
    check_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Salerecord',
  });
  return Salerecord;
};