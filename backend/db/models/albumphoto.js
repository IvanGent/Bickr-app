'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // const AlbumPhoto = sequelize.define('AlbumPhoto', {
  //   photoId: DataTypes.INTEGER,
  //   albumId: DataTypes.INTEGER
  // }, {});
  // AlbumPhoto.associate = function(models) {
  //   // associations can be defined here
  // };
  class AlbumPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addPhoto({ albumId, photoId }) {
      const rel = await AlbumPhoto.create({
        albumId,
        photoId
      })
      const message = 'Photo Added';
      return message;
    }

    static async removePhoto({ albumId, photoId }) {
      await AlbumPhoto.destroy({
        where: {
          photoId,
          albumId
        }
      })
      const message = 'Photo Deleted';
      return message;
    }


    static associate(models) {
      // // define association here
      AlbumPhoto.belongsTo(models.Photo, { foreignKey: 'photoId'});
      AlbumPhoto.belongsTo(models.Album, { foreignKey: 'albumId'});
    }
  };
  AlbumPhoto.init({
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Photos',
      //   key: 'id'
      // }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Albums',
      //   key: 'id'
      // }
    }
  }, {
    sequelize,
    modelName: 'AlbumPhoto',
  });
  return AlbumPhoto;
};