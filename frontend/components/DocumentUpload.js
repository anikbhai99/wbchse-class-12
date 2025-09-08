import React, { useRef } from 'react';

function DocumentUpload({ subject, onUploaded }) {
  const inputRef = useRef();

  const uploadDocument = async (e) => {
    e.preventDefault();
    const file = inputRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);

    await fetch(`http://localhost:5000/api/subjects/${subject._id}/documents`, {
      method: 'POST',
      body: formData,
      headers: {
        "x-admin-token": localStorage.getItem("admin-token")
      }
    });
    onUploaded();
  };

  return (
    <form onSubmit={uploadDocument} style={{ margin: '10px 0' }}>
      <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" ref={inputRef} required />
      <button type="submit">Upload Document</button>
    </form>
  );
}

export default DocumentUpload;