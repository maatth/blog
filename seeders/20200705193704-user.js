'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          nickname: 'MrAdmin',
          email: '1@gmail.com',
          password:
            '$argon2i$v=19$m=4096,t=3,p=1$CFlk+SPIoKNqM6qE2IAdlfQ71KgfEdIdG1MkxXIdw4E$4li+G2T/zMezZV2u01a0dWnjJLLlHtYgOgGYprBCaoM', // mdp : 123456
          salt:
            '085964f923c8a0a36a33aa84d8801d95f43bd4a81f11d21d1b5324c5721dc381',
          avatar: null,
          role_id: 1,
          created_at: '2020-01-01',
          updated_at: '2020-01-01',
        },
        {
          nickname: 'Matthieu',
          email: '2@gmail.com',
          password:
            '$argon2i$v=19$m=4096,t=3,p=1$CFlk+SPIoKNqM6qE2IAdlfQ71KgfEdIdG1MkxXIdw4E$4li+G2T/zMezZV2u01a0dWnjJLLlHtYgOgGYprBCaoM', // mdp : 123456
          salt:
            '085964f923c8a0a36a33aa84d8801d95f43bd4a81f11d21d1b5324c5721dc381',
          avatar: null,
          role_id: 2,
          created_at: '2020-01-01',
          updated_at: '2020-01-01',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {})
  },
}
