'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Massage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Massage.belongsTo(models.User);
    }
  }
  Massage.init(
    {
      name: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Massage',
    }
  );
  return Massage;
};
