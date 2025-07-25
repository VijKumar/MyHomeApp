import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const TransactionValidator = () => {
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

  return (
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
          <strong>Extracted ID:</strong> <span name="transid" className="text-blue-700" >{extractedId}</span>
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
          <strong>Paid To:</strong> <span name="transstatus" className="text-blue-700 font-semibold">{paidTo}</span>
        </p>
      )}

     
      <button disabled={!isValid} type="submit" style={{ marginTop: 16 }}>Register</button>
    </div>
  );
};

export default TransactionValidator;
