import React from 'react';

export default function Navbar({ onLogout, user }) {
  return (
    <div className="navbar">
      <h1>Todo App</h1>
      <div>
        <span style={{ marginRight: '10px' }}>Welcome, {user.name}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
