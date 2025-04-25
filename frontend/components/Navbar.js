// frontend/components/Navbar.js
import Link from 'next/link';
import { useContext } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Navbar() {
  const { role, setRole } = useContext(RoleContext);

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#001f3f', // Bleu marine
  };

  const linkStyle = {
    marginRight: 15,
    color: 'white', // Texte en blanc
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
  };

  const selectStyle = {
    marginLeft: 20,
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  return (
    <nav style={navStyle}>
      <Link href="/students" style={linkStyle}>
        Étudiants
      </Link>
      <Link href="/teachers" style={linkStyle}>
        Profs
      </Link>
      <Link href="/notes" style={linkStyle}>
        Notes
      </Link>
      <Link href="/planning" style={linkStyle}>
        Planning
      </Link>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={selectStyle}
      >
        <option value="admin">Admin</option>
        <option value="teacher">Prof</option>
        <option value="student">Élève</option>
      </select>
    </nav>
  );
}