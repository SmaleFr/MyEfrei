// frontend/pages/teachers.js
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Teachers() {
  const { role } = useContext(RoleContext);
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  const fetchData = () =>
    fetch('/api/teachers').then((r) => r.json()).then(setList);

  useEffect(() => {
    fetchData();
  }, []);

  const add = () => {
    fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    }).then(fetchData);
  };

  const del = (id) => {
    fetch(`/api/teachers/${id}`, { method: 'DELETE' }).then(fetchData);
  };

  const containerStyle = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#001f3f',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '5rem',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    margin: '0.5rem 0',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  const addButtonStyle = {
    backgroundColor: 'white',
    color: '#001f3f',
    border: 'none',
    borderRadius: '5px',
    padding: '1rem 1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    display: 'block',
    width: '100%',
    fontWeight: 'bold',
  };
  const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    marginLeft: '1rem',
  };

  return (
    <div style={containerStyle}>
     <h1 style={titleStyle}>Profs</h1>
      <ul>
        {list.map((t) => (
          <li key={t.id}>
            {t.name}
            {role === 'admin' && (
              <button onClick={() => del(t.id)} style={deleteButtonStyle}>
                Suppr.
              </button>
            )}
          </li>
        ))}
      </ul>
      {role === 'admin' && (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom prof"
            style={inputStyle}
          />
          <button onClick={add} style={addButtonStyle}>
            Ajouter Prof
          </button>
        </>
      )}
    </div>
  );
}