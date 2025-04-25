import React from 'react';
export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow">
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">×</button>
    </div>
  );
}