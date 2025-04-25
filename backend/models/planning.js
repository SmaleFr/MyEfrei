// models/planning.js
let slots = [];
let nextSlotId = 1;
module.exports = {
  getAll: () => slots,
  getById: id => slots.find(s => s.id === id),
  getByUserId: userId => slots.filter(s => s.userId === userId),
  create: ({ userId, title, date }) => {
    const slot = { id: nextSlotId++, userId, title, date: new Date(date) };
    slots.push(slot);
    return slot;
  },
  update: (id, fields) => {
    const slot = slots.find(s => s.id === id);
    Object.assign(slot, fields);
    return slot;
  },
  remove: id => { slots = slots.filter(s => s.id !== id); }
};