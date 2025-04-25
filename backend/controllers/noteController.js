import notesModel from '../models/notes.js';

// Récupère toutes les notes (admin, prof)
export function getAllNotes(req, res) {
  const notes = notesModel.getAll();
  res.json(notes);
}

// Récupère une note par ID (admin, prof)
export function getNoteById(req, res) {
  const id = parseInt(req.params.id, 10);
  const note = notesModel.getById(id);
  if (!note) return res.status(404).json({ error: 'Note introuvable' });
  res.json(note);
}

// Récupère les notes d'un étudiant (admin, prof, ou étudiant/mine)
export function getNotesByStudent(req, res) {
  const id = req.params.studentId
    ? parseInt(req.params.studentId, 10)
    : req.user.id;
  const notes = notesModel.getByStudentId(id);
  res.json(notes);
}

// Crée une note (admin, prof)
export function createNote(req, res) {
  const { studentId, profId, course, grade } = req.body;
  const note = notesModel.create({ studentId, profId, course, grade });
  res.status(201).json(note);
}

// Met à jour une note (admin, prof)
export function updateNote(req, res) {
  const id = parseInt(req.params.id, 10);
  const updated = notesModel.update(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Note introuvable' });
  res.json(updated);
}

// Supprime une note (admin, prof)
export function deleteNote(req, res) {
  const id = parseInt(req.params.id, 10);
  notesModel.remove(id);
  res.status(204).send();
}