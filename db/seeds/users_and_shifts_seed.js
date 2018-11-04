exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Connor',
          last_name: 'O\'Brien',
          email: 'cobrien.js@gmail.com',
        },
        {
          id: 2,
          first_name: 'Reena',
          last_name: 'Stripling',
          email: 'reena.stripling@gmail.com',
        },
        {
          id: 3,
          first_name: 'Max',
          last_name: 'Lund',
          email: 'max.lund@gmail.com',
        },
        {
          id: 4,
          first_name: 'Jon',
          last_name: 'Alme',
          email: 'jon.alme@gmail.com',
        },
        {
          id: 5,
          first_name: 'Rebecca',
          last_name: 'Birch',
          email: 'rebecca.birch@gmail.com',
        },
      ]);
    })
    .then(() => {
      // Deletes ALL existing entries
      const today = new Date();
      const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
      return knex('shifts').del()
        // Inserts seed entries
        .then(() => {
          return knex('shifts').insert([
            {
              id: 1,
              start: today,
              end: tomorrow,
              user_id: 1,
            },
            {
              id: 2,
              start: today,
              end: tomorrow,
              user_id: 2,
            },
            {
              id: 3,
              start: today,
              end: tomorrow,
              user_id: 3,
            },
          ]);
        });
    });
};
