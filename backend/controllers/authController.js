import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usersModel from '../models/users.js';
const secret = 'VOTRE_CLE_SECRETE';

export async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (usersModel.getByEmail(email)) {
    return res.status(400).json({ error: 'Email déjà utilisé' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = usersModel.create({ name, email, passwordHash, role });
  res.json(user);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = usersModel.getByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(400).json({ error: 'Identifiants invalides' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '8h' });
  res.json({ token });
}