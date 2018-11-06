exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('shifts').del();
  await knex('users').del();
  // Inserts seed entries
  await knex('users').insert([
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
  await knex('shifts').insert([
    {
      start: '2018-10-06T09:00:00+0000',
      end: '2018-10-06T17:00:00+0000',
      user_id: 1,
    },
    {
      start: '2018-10-06T09:00:00+0000',
      end: '2018-10-06T17:00:00+0000',
      user_id: 2,
    },
    {
      start: '2018-10-06T09:00:00+0000',
      end: '2018-10-06T17:00:00+0000',
      user_id: 3,
    },
  ]);
}

const addDays = num => {
  const today = new Date();
  return new Date(new Date().setDate(today.getDate() + num));
}

