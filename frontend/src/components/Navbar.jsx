import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

export default function Navbar() {
  const { token, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  return (
    <nav>
      {token ? (
        <> 
          <Link to="/notes">Notes</Link>
          <Link to="/planning">Planning</Link>
          {user.role==='admin' && <Link to="/admin">Admin</Link>}
          {user.role==='prof' && <Link to="/prof">Prof</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <> <Link to="/login">Login</Link> <Link to="/register">Register</Link> </>
      )}
    </nav>
  );
}