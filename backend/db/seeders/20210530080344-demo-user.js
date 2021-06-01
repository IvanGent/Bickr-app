'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { fake } = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: '-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        firstName: 'Fake1',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        firstName: 'Fake2',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      firstName: { [Op.in]: ['Demo', 'Fake1', 'Fake2']}
    }, {});
  }
};
