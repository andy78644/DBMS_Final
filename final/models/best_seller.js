'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Best_seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Best_seller.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book_rank'
      });
    }
  };
  Best_seller.init({
    book_id: DataTypes.INTEGER,
    book_type: DataTypes.STRING,
    rank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Best_seller',
  });
  return Best_seller;
};