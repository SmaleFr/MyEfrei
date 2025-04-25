import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name:'',email:'',password:'',role:'student' });
  const navigate = useNavigate();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try { await api.post('/auth/register', form); navigate('/login'); }
    catch { alert('Erreur inscription'); }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="student">Étudiant</option>
        <option value="prof">Prof</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  );
}