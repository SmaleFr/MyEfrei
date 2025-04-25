import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../utils/AuthContext';

export default function Notes() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ studentId:'',course:'',grade:'' });
  useEffect(() => {
    const url = user.role==='student'? '/notes/mine' : '/notes';
    api.get(url).then(res=>setNotes(res.data));
  }, [user.role]);

  const handleAdd = async () => {
    await api.post('/notes', { ...newNote, profId:user.id });
    const res = await api.get('/notes'); setNotes(res.data);
  };

  return (
    <div>
      <h2>Notes</h2>
      {['prof','admin'].includes(user.role) && (
        <div>
          <input placeholder="Élève ID" onChange={e=>setNewNote({...newNote,studentId:e.target.value})} />
          <input placeholder="Cours" onChange={e=>setNewNote({...newNote,course:e.target.value})} />
          <input placeholder="Note" onChange={e=>setNewNote({...newNote,grade:e.target.value})} />
          <button onClick={handleAdd}>Ajouter</button>
        </div>
      )}
      <ul>
        {notes.map(n => <li key={n.id}>{`Étudiant ${n.studentId} - ${n.course}: ${n.grade}`}</li>)}
      </ul>
    </div>
  );
}