'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ref_role',
      [
        {
          label: 'Administrateur',
          code: 'ADMIN',
        },
        {
          label: 'Standard',
          code: 'STANDARD',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ref_role', null, {})
  },
}
