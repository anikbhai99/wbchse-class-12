import React, { useRef } from 'react';

function SyllabusUpload({ subject, onUploaded }) {
  const inputRef = useRef();

  const uploadSyllabus = async (e) => {
    e.preventDefault();
    const file = inputRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('syllabus', file);

    await fetch(`http://localhost:5000/api/subjects/${subject._id}/syllabus`, {
      method: 'POST',
      body: formData,
      headers: {
        "x-admin-token": localStorage.getItem("admin-token")
      }
    });
    onUploaded();
  };

  return (
    <form onSubmit={uploadSyllabus} style={{ margin: '10px 0' }}>
      <input type="file" accept="application/pdf" ref={inputRef} required />
      <button type="submit">Upload Syllabus PDF</button>
    </form>
  );
}

export default SyllabusUpload;