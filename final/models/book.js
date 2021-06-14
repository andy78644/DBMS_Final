'use strict';
const {
  Sequelize, DataTypes, Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Salerecord,{
        foreignKey: 'book_id',
        as: 'book', 
      });
      Book.hasMany(models.Best_seller,{
        foreignKey: 'book_id',
        as: 'book_rank', 
      });
    }
  };
  Book.init({
    book_id: DataTypes.INTEGER,
    book_name: DataTypes.STRING,
    count: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};