import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.get('/users').then(res=>setUsers(res.data)); }, []);
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>{users.map(u=><li key={u.id}>{`${u.id}: ${u.name} (${u.role})`}</li>)}</ul>
    </div>
  );
}