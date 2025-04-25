import usersModel from '../models/users.js';
import bcrypt from 'bcryptjs';

// Récupère tous les utilisateurs
export function getAllUsers(req, res) {
  const users = usersModel.getAll();
  res.json(users);
}

// Récupère un utilisateur par ID
export function getUserById(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = usersModel.getById(id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.json(user);
}

// Crée un nouvel utilisateur (admin seulement)
export async function createUser(req, res) {
  const { name, email, password, role } = req.body;
  if (usersModel.getByEmail(email)) {
    return res.status(400).json({ error: 'Email déjà utilisé' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = usersModel.create({ name, email, passwordHash, role });
  res.status(201).json(user);
}

// Met à jour un utilisateur (admin seulement)
export function updateUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const updated = usersModel.update(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.json(updated);
}

// Supprime un utilisateur (admin seulement)
export function deleteUser(req, res) {
  const id = parseInt(req.params.id, 10);
  usersModel.remove(id);
  res.status(204).send();
}