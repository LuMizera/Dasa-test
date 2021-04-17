/* eslint-disable no-undef */
db.createUser({
  user: 'defaultUser',
  pwd: 'defaultPwd',
  roles: [
    {
      role: 'readWrite',
      db: 'Dasa',
    },
  ],
});
