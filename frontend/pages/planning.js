// frontend/pages/planning.js
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Planning() {
  const { role } = useContext(RoleContext);
  const [list, setList] = useState([]);
  const [userId, setUserId] = useState('');
  const [course, setCourse] = useState('');

  const fetchData = () =>
    fetch('/api/planning').then(r => r.json()).then(setList);

  useEffect(() => {
    fetchData();
  }, []);
  
  const add = () => {
    fetch('/api/planning', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ userId: +userId, role, course }),
    }).then(fetchData);
  };

  const del = id => {
    fetch(`/api/planning/${id}`, { method: 'DELETE' }).then(fetchData);
  };

  // filtration pour étudiant / prof
  const visible = role==='student' || role==='teacher'
    ? list.filter(p => p.role===role)
    : list;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Planning</h1>
      <ul>
        {visible.map(p => (
          <li key={p.id}>
            #{p.userId} – {p.course}
            {role==='admin' && (
              <button onClick={()=>del(p.id)} style={{ marginLeft:10 }}>Suppr.</button>
            )}
          </li>
        ))}
      </ul>
      {role==='admin' && (
        <>
          <input 
            value={userId}
            onChange={e=>setUserId(e.target.value)}
            placeholder="ID utilisateur"
            type="number"
          />
          <input 
            value={course}
            onChange={e=>setCourse(e.target.value)}
            placeholder="Cours (ex: Maths Lun. 10h)"
          />
          <button onClick={add}>Ajouter Cours</button>
        </>
      )}
    </div>
  );
}