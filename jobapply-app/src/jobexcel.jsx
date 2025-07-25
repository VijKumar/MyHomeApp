import React, { useState, useRef } from 'react';
import axios from 'axios';
import image from './image.png'; 
import './jobexcel.css';
import Tesseract from 'tesseract.js';



function RegistrationForm() {

    const [enteredId, setEnteredId] = useState('');
      const [extractedId, setExtractedId] = useState('');
      const [paidTo, setPaidTo] = useState('');
      const [paymentStatus, setPaymentStatus] = useState('');
      const [isValid, setIsValid] = useState(false);
      const [loading, setLoading] = useState(false);
      const [imageName, setImageName] = useState('');
    
      const fileInputRef = useRef(null);
    
    const handleTextChange = (e) => {
    setEnteredId(e.target.value.trim());
    setExtractedId('');
    setPaidTo('');
    setPaymentStatus('');
    setIsValid(false);
    setImageName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file || !enteredId) return;
  
      setLoading(true);
      setImageName(file.name);
      setExtractedId('');
      setPaidTo('');
      setPaymentStatus('');
      setIsValid(false);
  
      try {
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
  
        const transMatch = text.match(/T\d{18,}/);
        const nameMatch = text.match(/Paid to\s+([A-Za-z0-9&.\s]+)/i);
  
        const transactionId = transMatch ? transMatch[0].trim() : '';
        const paidToName = nameMatch ? nameMatch[1].trim().replace(/\n/g, '') : '';
  
        setExtractedId(transactionId);
  
        if (transactionId === enteredId) {
          setIsValid(true);
          setPaymentStatus('Payment Successful');
          setPaidTo(paidToName);
        } else {
          setIsValid(false);
          setPaymentStatus('Payment Failed');
          setPaidTo('');
          alert(`Mismatch!\nEntered: ${enteredId}\nFound: ${transactionId}`);
        }
    
  
      } catch (err) {
        console.error('OCR Error:', err);
        setPaymentStatus('Payment Failed');
        setIsValid(false);
        setPaidTo('');
        alert('Failed to process image.');
      }
  
      setLoading(false);
    };



    const [form, setForm] = useState({
        name: '',
        age: '',
        address: '',
        mobile: '',
        email: '',
        transid: '',
        transstatus: '',
        
    });

    const 
    handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        form.transid = extractedId; // Set transid
        form.transstatus = paidTo; // Set transstatus
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
                    
                    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Transaction Validator</h2>

      <label className="block text-sm font-medium mb-1">Enter Transaction ID:</label>
      <input
        type="text"
        className="border px-3 py-2 w-full mb-4"
        value={enteredId}
        onChange={handleTextChange}
        placeholder="Enter ID like T2507..."
      />

      <label className="block text-sm font-medium mb-1">Upload Transaction Screenshot:</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={!enteredId}
        className="mb-2"
      />
      {imageName && <p className="text-sm text-gray-600 mb-2">📎 {imageName}</p>}
      {loading && <p className="text-sm text-gray-500 mb-2">⏳ Reading image...</p>}

      {extractedId && (
        <p className="text-sm text-gray-800 mb-2">
          <strong>Extracted ID:</strong> 
          <span name="transid"  id="transid"
          value={extractedId}
                    className="text-blue-700" >{extractedId}</span>
        </p>
      )}

      {paymentStatus && (
        <p
          className={`text-md font-semibold mb-2 ${
            isValid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isValid ? '✅' : '❌'} Payment Status: {paymentStatus}
        </p>
      )}

      {isValid && paidTo && (
        <p className="text-sm text-gray-700 mb-4">
          <strong>Paid To:</strong> 
          <span name="transstatus" id="transstatus"
          value={paidTo}
                     className="text-blue-700 font-semibold">{paidTo}</span>
        </p>
      )}

     
      <button disabled={!isValid} type="submit" style={{ marginTop: 16 }}>Register</button>
    </div>

                    
                </span>
                </span>
            </div>
            <div style={{ color: 'red', marginTop: 10 }}>
                NOTE:
                You will get mail in 24hrs only you have done valid payment.
            </div>
            <button disabled={!isValid}
             type="submit" style={{ marginTop: 16 }}>Register</button>
        </form>
        </div>
    );
}

export default RegistrationForm;