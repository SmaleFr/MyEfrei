// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// données en mémoire
let students = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
let teachers = [
  { id: 1, name: 'M. Dupont' },
  { id: 2, name: 'Mme Martin' },
];
let notes = [
  // { id:1, studentId:1, teacherId:1, subject:'Math', value:15 }
];
let planning = [
  // { id:1, userId:2, role:'student', course:'Physique Lundi 10h' }
];

// helper pour générer des IDs
const genId = arr => arr.length ? Math.max(...arr.map(o=>o.id))+1 : 1;

// Routes CRUD génériques
function makeCrudRoutes(path, store) {
  app.get(`/${path}`, (req, res) => res.json(store));
  app.get(`/${path}/:id`, (req, res) => {
    const obj = store.find(o => o.id == req.params.id);
    obj ? res.json(obj) : res.status(404).end();
  });
  app.post(`/${path}`, (req, res) => {
    const o = { id: genId(store), ...req.body };
    store.push(o);
    res.status(201).json(o);
  });
  app.put(`/${path}/:id`, (req, res) => {
    const idx = store.findIndex(o => o.id == req.params.id);
    if (idx === -1) return res.status(404).end();
    store[idx] = { id: store[idx].id, ...req.body };
    res.json(store[idx]);
  });
  app.delete(`/${path}/:id`, (req, res) => {
    const idx = store.findIndex(o => o.id == req.params.id);
    if (idx === -1) return res.status(404).end();
    store.splice(idx,1);
    res.status(204).end();
  });
}

// appliquez sur chaque entité
makeCrudRoutes('students', students);
makeCrudRoutes('teachers', teachers);
makeCrudRoutes('notes', notes);
makeCrudRoutes('planning', planning);

// démarrage
const PORT = 5001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));