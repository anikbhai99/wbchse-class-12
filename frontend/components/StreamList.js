import React, { useEffect, useState } from 'react';

function StreamList({ onSelect }) {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/streams')
      .then(res => res.json())
      .then(setStreams);
  }, []);

  return (
    <div>
      <h2>Streams</h2>
      <ul>
        {streams.map(s => (
          <li
            key={s._id}
            style={{ cursor: 'pointer', margin: '8px 0' }}
            onClick={() => onSelect(s)}
          >
            <b>{s.name}</b> <br/>
            <span style={{ color: '#777' }}>{s.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;