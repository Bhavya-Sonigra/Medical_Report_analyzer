import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!token || !userData) {
      window.location.href = '/';
    } else {
      setUser(userData);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a PDF file.');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/report/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message || 'Upload successful!');
    } catch (err) {
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}</h2>
      <div className="upload-box">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload PDF</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
