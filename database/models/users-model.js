const db = require(`../dbConfig`);

const find = username => {
  return db(`users`).modify(qb => {
    if (username) {
      qb.where({ username }).first();
    }
  });
};

const add = user => {
  return db(`users`).insert(user, "id");
};

const remove = id => {
  return db(`users`)
    .del()
    .where({ id });
};

module.exports = {
  find,
  add,
  remove
};
