import React, { useState } from 'react';
import axios from 'axios';
import image from './image.png'; 
import './jobexcel.css';
import TransactionValidator from './TransactionValidator.jsx';

function RegistrationForm() {
    const [form, setForm] = useState({
        name: '',
        age: '',
        address: '',
        mobile: '',
        email: '',
        transid: '',
        transstatus: ''
    });

    const 
    handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        const formData = JSON.stringify(form, null, 2);
        alert('Registration submitted:\n' + formData);
         e.preventDefault();
            try {
                const response = await axios.post('http://localhost:8080/Register', { formData });
                // Assuming your Spring Boot app runs on port 8080
                console.log(response.data); // Log the response from the backend
                alert('Data submitted successfully!');
            } catch (error) {
                console.error('Error submitting data:', error);
                alert('Error submitting data.');
            }
    };

    return (
        <div className="container">
        <form onSubmit={handleSubmit} style={{ maxWidth: 450, margin: '0 auto' }}>
            <h2>Registration Form</h2>
            <div>
                <label>Name:</label><br />
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Age:</label><br />
                <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Location:</label><br />
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Mobile:</label><br />
                <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email ID:</label><br />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone Pay Qr for Rs. 100 Payment :</label><br />
                <img src={image} alt="Phone Pay QR" />
            </div>
            <div>
                <span style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginBottom: '8px'
                }}>Transaction Details:<br />
                {/*<span>
                <label>Transaction Id:</label><br />
                <input
                    type="text"
                    name="transactionId"
                    value={form.transactionId}
                    onChange={handleChange}
                    required
                />
                </span><br />
                 <span>
                <label>Payment Status:</label><br />
                <input
                    type="text"
                    name="paymentStatus"
                    value={form.paymentStatus}
                    onChange={handleChange}
                    required
                />
                </span> */}
                <span>
                    <TransactionValidator />
                </span>
                </span>
            </div>
            <div style={{ color: 'red', marginTop: 10 }}>
                NOTE:
                You will get mail in 24hrs only you have done valid payment.
            </div>
            <button type="submit" style={{ marginTop: 16 }}>Register</button>
        </form>
        </div>
    );
}

export default RegistrationForm;