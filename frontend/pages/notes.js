// frontend/pages/notes.js
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../contexts/RoleContext';

export default function Notes() {
  const { role } = useContext(RoleContext);
  const [list, setList] = useState([]);
  const [students, setStudents] = useState([]); // Liste des étudiants
  const [studentName, setStudentName] = useState(''); // Nom de l'étudiant
  const [subject, setSubject] = useState('');
  const [value, setValue] = useState('');

  const fetchData = () =>
    fetch('/api/notes').then((r) => r.json()).then(setList);

  const fetchStudents = () =>
    fetch('/api/students').then((r) => r.json()).then(setStudents);

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  const add = () => {
    const student = students.find((s) => s.name.toLowerCase() === studentName.toLowerCase());
    if (!student) {
      alert('Étudiant introuvable');
      return;
    }

    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: student.id, subject, value: +value }),
    }).then(fetchData);
  };

  const del = (id) => {
    fetch(`/api/notes/${id}`, { method: 'DELETE' }).then(fetchData);
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
    backgroundColor: '#dc3545', // Rouge pour le bouton supprimer
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    marginLeft: '1rem', // Ajoute un espacement à gauche
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Notes</h1>
      <ul>
        {list.map((n) => {
          const student = students.find((s) => s.id === n.studentId); // Trouve l'étudiant correspondant
          return (
            <li key={n.id}>
              {student ? student.name : `ID: ${n.studentId}`} – {n.subject} : {n.value}
              {(role === 'admin' || role === 'teacher') && (
                <button onClick={() => del(n.id)} style={deleteButtonStyle}>
                  Suppr.
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {(role === 'admin' || role === 'teacher') && (
        <>
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nom de l'élève"
            style={inputStyle}
          />
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Matière"
            style={inputStyle}
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Note"
            type="number"
            style={inputStyle}
          />
          <button onClick={add} style={addButtonStyle}>
            Ajouter Note
          </button>
        </>
      )}
    </div>
  );
}