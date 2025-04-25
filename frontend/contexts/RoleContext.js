// frontend/contexts/RoleContext.js
import { createContext, useState } from 'react';

export const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState('student');
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
