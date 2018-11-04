exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Connor',
          last_name: 'O\'Brien',
          email: 'cobrien.js@gmail.com',
        },
        {
          first_name: 'Reena',
          last_name: 'Stripling',
          email: 'reena.stripling@gmail.com',
        },
        {
          first_name: 'Max',
          last_name: 'Lund',
          email: 'max.lund@gmail.com',
        },
        {
          first_name: 'Jon',
          last_name: 'Alme',
          email: 'jon.alme@gmail.com',
        },
        {
          first_name: 'Rebecca',
          last_name: 'Birch',
          email: 'rebecca.birch@gmail.com',
        },
      ]);
    })
    .then(() => {
      // Deletes ALL existing entries
      const today = new Date();
      return knex('shifts').del()
        // Inserts seed entries
        .then(() => {
          return knex('shifts').insert([
            {
              start: today,
              end: new Date().setDate(today.getDate() + 1),
              user_id: 1,
            },
            {
              start: today,
              end: new Date().setDate(today.getDate() + 1),
              user_id: 2,
            },
            {
              start: today,
              end: new Date().setDate(today.getDate() + 1),
              user_id: 3,
            },
          ]);
        });
    });
};
