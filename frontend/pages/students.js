// frontend/pages/students.js
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Students() {
  const { role } = useContext(RoleContext);
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  const fetchData = () =>
    fetch('/api/students').then(r => r.json()).then(setList);

  useEffect(() => {
    fetchData();
  }, []);
  const add = () => {
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name }),
    }).then(fetchData);
  };

  const del = id => {
    fetch(`/api/students/${id}`, { method: 'DELETE' }).then(fetchData);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Étudiants</h1>
      <ul>
        {list.map(s => (
          <li key={s.id}>
            {s.name}
            {role === 'admin' && (
              <button onClick={()=>del(s.id)} style={{ marginLeft:10 }}>Suppr.</button>
            )}
          </li>
        ))}
      </ul>
      {role === 'admin' && (
        <>
          <input 
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Nom étudiant"
          />
          <button onClick={add}>Ajouter</button>
        </>
      )}
    </div>
  );
}