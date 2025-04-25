// frontend/pages/teachers.js
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Teachers() {
  const { role } = useContext(RoleContext);
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  const fetchData = () =>
    fetch('/api/teachers').then(r => r.json()).then(setList);

  useEffect(() => {
    fetchData();
  }, []);

  const add = () => {
    fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name }),
    }).then(fetchData);
  };

  const del = id => {
    fetch(`/api/teachers/${id}`, { method: 'DELETE' }).then(fetchData);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Profs</h1>
      <ul>
        {list.map(t => (
          <li key={t.id}>
            {t.name}
            {role === 'admin' && (
              <button onClick={()=>del(t.id)} style={{ marginLeft:10 }}>Suppr.</button>
            )}
          </li>
        ))}
      </ul>
      {role === 'admin' && (
        <>
          <input 
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Nom prof"
          />
          <button onClick={add}>Ajouter</button>
        </>
      )}
    </div>
  );
}