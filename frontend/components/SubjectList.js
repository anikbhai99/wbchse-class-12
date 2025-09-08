import React, { useEffect, useState } from 'react';
import SyllabusUpload from './SyllabusUpload';
import DocumentUpload from './DocumentUpload';

function SubjectList({ stream, isAdmin }) {
  const [subjects, setSubjects] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (stream) {
      fetch(`http://localhost:5000/api/subjects?stream=${stream._id}`)
        .then(res => res.json())
        .then(setSubjects);
    } else {
      setSubjects([]);
    }
  }, [stream, refresh]);

  const doRefresh = () => setRefresh(r => !r);

  if (!stream) return <div>Select a stream to view subjects.</div>;
  return (
    <div>
      <h2>Subjects for {stream.name}</h2>
      <ul>
        {subjects.map(sub => (
          <li key={sub._id} style={{ border: '1px solid #eee', margin: 12, padding: 12 }}>
            <b>{sub.name}</b> ({sub.code})<br/>
            {/* Syllabus */}
            {sub.syllabusFile ?
              (<div>
                <a href={`http://localhost:5000/uploads/${sub.syllabusFile}`} target="_blank" rel="noopener noreferrer">
                  📄 View Syllabus
                </a>
              </div>)
              : <span style={{ color: 'red' }}>No syllabus uploaded</span>
            }
            {isAdmin && <SyllabusUpload subject={sub} onUploaded={doRefresh} />}

            {/* Documents */}
            <div>
              <b>Documents:</b>
              <ul>
                {sub.documents && sub.documents.length > 0 ? sub.documents.map((doc, i) =>
                  <li key={i}>
                    <a href={`http://localhost:5000/uploads/${doc}`} target="_blank" rel="noopener noreferrer">
                      {doc}
                    </a>
                  </li>
                ) : <li style={{ color: 'red' }}>No documents uploaded</li>}
              </ul>
            </div>
            {isAdmin && <DocumentUpload subject={sub} onUploaded={doRefresh} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;