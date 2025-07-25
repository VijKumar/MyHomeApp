import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';

const TransactionValidator = () => {
  const [enteredId, setEnteredId] = useState('');
  const [qrId, setQrId] = useState('');
  const [isValid, setIsValid] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null); // ✅ File input reference

  const handleTextChange = (e) => {
    setEnteredId(e.target.value.trim());
    setQrId('');
    setIsValid(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // ✅ Clear file if user edits input
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code && code.data) {
          const scannedId = code.data.trim();
          setQrId(scannedId);

          if (scannedId === enteredId) {
            setIsValid(true);
          } else {
            setIsValid(false);
            alert(`Mismatch!\nEntered: ${enteredId}\nQR: ${scannedId}`);
            if (fileInputRef.current) {
              fileInputRef.current.value = ''; // ✅ Clear file input on mismatch
            }
          }
        } else {
          alert('Unable to read QR code.');
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // ✅ Clear file input on failure
          }
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Transaction ID Validator</h2>

      <label className="block mb-2 text-sm font-medium">Enter Transaction ID:</label>
      <input 
        type="text"
        className="border px-3 py-2 w-full mb-4"
        value={enteredId}
        onChange={handleTextChange}
        placeholder="Enter Transaction ID"
      /><br/>
<br/> 
      <label className="block mb-2 text-sm font-medium">Upload Payment Screenshot:</label>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // ✅ attach ref here
        onChange={handleImageUpload}
        disabled={!enteredId}
        className="mb-4"
      />

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Payment Transaction ID:{' '}
          <span name='transid' className="text-blue-600">{qrId}</span>
        </p>
      </div>

      <div className="mb-4">
        <p  className="text-sm text-gray-600">
          Payment Transaction Status:{' '}
          <span name='transstatus' className="text-blue-600">{qrId}</span>
        </p>
      </div>

      <button
        disabled={!isValid}
        className={`w-full py-2 px-4 rounded text-white font-semibold ${
          isValid ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Activate
      </button>
    </div>
  );
};

export default TransactionValidator;
