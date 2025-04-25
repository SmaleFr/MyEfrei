// models/notes.js
let notes = [];
let nextNoteId = 1;
module.exports = {
  getAll: () => notes,
  getById: id => notes.find(n => n.id === id),
  getByStudentId: studentId => notes.filter(n => n.studentId === studentId),
  create: ({ studentId, profId, course, grade }) => {
    const note = { id: nextNoteId++, studentId, profId, course, grade };
    notes.push(note);
    return note;
  },
  update: (id, fields) => {
    const note = notes.find(n => n.id === id);
    Object.assign(note, fields);
    return note;
  },
  remove: id => { notes = notes.filter(n => n.id !== id); }
};