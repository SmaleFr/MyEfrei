let users = [];
let nextId = 1;
module.exports = {
  getAll: () => users,
  getById: id => users.find(u => u.id === id),
  getByEmail: email => users.find(u => u.email === email),
  create: ({ name, email, passwordHash, role }) => {
    const user = { id: nextId++, name, email, passwordHash, role };
    users.push(user);
    return user;
  },
  update: (id, fields) => {
    const user = users.find(u => u.id === id);
    Object.assign(user, fields);
    return user;
  },
  remove: id => { users = users.filter(u => u.id !== id); }
};