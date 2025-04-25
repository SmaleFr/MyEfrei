import jwt from 'jsonwebtoken';
const secret = 'VOTRE_CLE_SECRETE';
export default function authenticateJwt(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token manquant' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.status(403).json({ error: 'Token invalide' });
  }
}