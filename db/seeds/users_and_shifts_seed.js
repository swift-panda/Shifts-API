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
      return knex('shifts').del()
        // Inserts seed entries
        .then(() => {
          return knex('shifts').insert([
            {
              start: addDays(0),
              end: addDays(1),
              user_id: 1,
            },
            {
              start: addDays(2),
              end: addDays(3),
              user_id: 2,
            },
            {
              start: addDays(4),
              end: addDays(5),
              user_id: 3,
            },
          ]);
        });
    });
};

const addDays = num => {
  const today = new Date();
  return new Date(new Date().setDate(today.getDate() + num));
}

