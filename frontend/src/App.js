import React, { useState } from 'react';
import StreamList from './components/StreamList';
import SubjectList from './components/SubjectList';
import AdminLogin from './components/AdminLogin';

function App() {
  const [selectedStream, setSelectedStream] = useState(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin-token") ? true : false
  );

  function handleAdminLogin(token) {
    localStorage.setItem("admin-token", token);
    setIsAdmin(true);
  }

  function handleAdminLogout() {
    localStorage.removeItem("admin-token");
    setIsAdmin(false);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>WBCHSE Subjects & Streams</h1>
      <div style={{ marginBottom: 16 }}>
        {isAdmin ? (
          <span>
            <b>Admin Mode</b> <button onClick={handleAdminLogout}>Logout</button>
          </span>
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
      </div>
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <StreamList onSelect={setSelectedStream} />
        <SubjectList stream={selectedStream} isAdmin={isAdmin} />
      </div>
    </div>
  );
}

export default App;