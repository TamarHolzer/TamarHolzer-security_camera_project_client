
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios form 'axios'     בשורה 58 fetch לרשום במקום המילה 

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    postalCode: '',
    password: '',
    email: '',
    userType: 'professional'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/Registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.status === 'success') {
        navigate('./FileUploadPage');
      } else {
        alert('Registration : ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="registration-page">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />
        <label htmlFor="postalCode">Postal Code:</label><br />
        <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />
        <label htmlFor="userType">Professional/Amateur:</label><br />
        <select id="userType" name="userType" value={formData.userType} onChange={handleChange}>
          <option value="professional">Professional</option>
          <option value="amateur">Amateur</option>
        </select><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;