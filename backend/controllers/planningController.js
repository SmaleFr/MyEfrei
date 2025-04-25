import planningModel from '../models/planning.js';

// Récupère tous les créneaux (admin)
export function getAllSlots(req, res) {
  const slots = planningModel.getAll();
  res.json(slots);
}

// Récupère un créneau par ID (admin)
export function getSlotById(req, res) {
  const id = parseInt(req.params.id, 10);
  const slot = planningModel.getById(id);
  if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });
  res.json(slot);
}

// Récupère les créneaux d'un utilisateur (admin, prof, étudiant/mine)
export function getSlotsByUser(req, res) {
  const id = req.params.userId
    ? parseInt(req.params.userId, 10)
    : req.user.id;
  const slots = planningModel.getByUserId(id);
  res.json(slots);
}

// Crée un créneau (admin)
export function createSlot(req, res) {
  const { userId, title, date } = req.body;
  const slot = planningModel.create({ userId, title, date });
  res.status(201).json(slot);
}

// Met à jour un créneau (admin)
export function updateSlot(req, res) {
  const id = parseInt(req.params.id, 10);
  const updated = planningModel.update(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Créneau introuvable' });
  res.json(updated);
}

// Supprime un créneau (admin)
export function deleteSlot(req, res) {
  const id = parseInt(req.params.id, 10);
  planningModel.remove(id);
  res.status(204).send();
}