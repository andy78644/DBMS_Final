'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BookRank.init({
    book_id: DataTypes.INTEGER,
    book_type: DataTypes.STRING,
    rank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookRank',
  });
  return BookRank;
};