import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './utils/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Planning from './pages/Planning';
import AdminDashboard from './pages/AdminDashboard';
import ProfDashboard from './pages/ProfDashboard';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProtectedRoute({ children, roles }) {
  const { token, user } = React.useContext(AuthContext);
  if (!token || !roles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<ProtectedRoute roles={["student","prof","admin"]}><Notes /></ProtectedRoute>} />
          <Route path="/planning" element={<ProtectedRoute roles={["student","prof","admin"]}><Planning /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/prof" element={<ProtectedRoute roles={["prof"]}><ProfDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}