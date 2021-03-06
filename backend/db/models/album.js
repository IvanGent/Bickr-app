'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // const Album = sequelize.define('Album', {
  //   name: DataTypes.STRING,
  //   userId: DataTypes.INTEGER
  // }, {});
  // Album.associate = function(models) {
  //   // associations can be defined here
  // };
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async createAlbum({name, userId}) {
      const album = await Album.create({
        name,
        userId
      })
      // console.log(album);
      return album;
    }

    static async deleteAlbum({id}) {
      await Album.destroy({
        where: {
          id
        }
      })
      const message = 'Album Deleted'
      return message;
    }

    static associate(models) {
      // define association here
      Album.belongsTo(models.User, { foreignKey: 'userId' })
      Album.hasMany(models.AlbumPhoto, {foreignKey: 'albumId'})
    }
  };
  Album.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};