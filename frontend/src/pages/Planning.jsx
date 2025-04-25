import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../utils/AuthContext';

export default function Planning() {
  const { user } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ userId:'',title:'',date:'' });
  useEffect(() => {
    const url = user.role==='student'||user.role==='prof'? '/planning/mine' : '/planning';
    api.get(url).then(res=>setSlots(res.data));
  }, [user.role]);

  const handleAdd = async () => {
    await api.post('/planning', { ...newSlot });
    const res = await api.get('/planning'); setSlots(res.data);
  };

  return (
    <div>
      <h2>Planning</h2>
      {user.role==='admin' && (
        <div>
          <input placeholder="User ID" onChange={e=>setNewSlot({...newSlot,userId:e.target.value})} />
          <input placeholder="Titre" onChange={e=>setNewSlot({...newSlot,title:e.target.value})} />
          <input type="datetime-local" onChange={e=>setNewSlot({...newSlot,date:e.target.value})} />
          <button onClick={handleAdd}>Ajouter</button>
        </div>
      )}
      <ul>
        {slots.map(s => <li key={s.id}>{`${s.title} – ${new Date(s.date).toLocaleString()}`}</li>)}
      </ul>
    </div>
  );
}