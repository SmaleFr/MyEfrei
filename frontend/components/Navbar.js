// frontend/components/Navbar.js
import Link from 'next/link';
import { useContext } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Navbar() {
  const { role, setRole } = useContext(RoleContext);

  const linkStyle = { marginRight: 10, color: 'blue', textDecoration: 'none' };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link href="/students" style={linkStyle}>Étudiants</Link>
      <Link href="/teachers" style={linkStyle}>Profs</Link>
      <Link href="/notes"    style={linkStyle}>Notes</Link>
      <Link href="/planning" style={linkStyle}>Planning</Link>

      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        style={{ marginLeft: 20 }}
      >
        <option value="admin">Admin</option>
        <option value="teacher">Prof</option>
        <option value="student">Élève</option>
      </select>
    </nav>
  );
}