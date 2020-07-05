'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'article',
      [
        {
          title: 'Montitre',
          image: '',
          text: "texte de l'article",
          tags: '',
          is_public: true,
          user_id: 1,
          created_at: '2020-01-01',
          updated_at: '2020-01-01',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('article', null, {})
  },
}
