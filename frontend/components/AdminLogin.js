import React, { useRef, useState } from 'react';

function AdminLogin({ onLogin }) {
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const password = inputRef.current.value;
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const data = await res.json();
      onLogin(data.token);
      setError("");
    } else {
      setError("Invalid admin password.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "inline" }}>
      <input type="password" ref={inputRef} placeholder="Admin password" />
      <button type="submit">Admin Login</button>
      {error && <span style={{ color: "red", marginLeft: 8 }}>{error}</span>}
    </form>
  );
}

export default AdminLogin;