// frontend/pages/notes.js
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Notes() {
  const { role } = useContext(RoleContext);
  const [list, setList] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [value, setValue] = useState('');

  const fetchData = () =>
    fetch('/api/notes').then(r => r.json()).then(setList);

  useEffect(() => {
    fetchData();
  }, []);
  
  const add = () => {
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ studentId: +studentId, subject, value: +value }),
    }).then(fetchData);
  };

  const del = id => {
    fetch(`/api/notes/${id}`, { method: 'DELETE' }).then(fetchData);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Notes</h1>
      <ul>
        {list.map(n => (
          <li key={n.id}>
            Élève #{n.studentId} – {n.subject} : {n.value}
            {(role==='admin'||role==='teacher') && (
              <button onClick={()=>del(n.id)} style={{ marginLeft:10 }}>Suppr.</button>
            )}
          </li>
        ))}
      </ul>
      {(role==='admin'||role==='teacher') && (
        <>
          <input 
            value={studentId}
            onChange={e=>setStudentId(e.target.value)}
            placeholder="ID élève"
            type="number"
          />
          <input 
            value={subject}
            onChange={e=>setSubject(e.target.value)}
            placeholder="Matière"
          />
          <input 
            value={value}
            onChange={e=>setValue(e.target.value)}
            placeholder="Note"
            type="number"
          />
          <button onClick={add}>Ajouter Note</button>
        </>
      )}
    </div>
  );
}