// components/BioconApplicationForm.jsx
import MVLogo from '../images/MVLogo.png'; 
import Tesseract from 'tesseract.js';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  Paper
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { startTransition, useState, useRef } from 'react';

const years = ['2022', '2023', '2024', '2025'];
const pgOptions = [
  'MSc Chemistry',
  'Microbiology',
  'M.Sc Organic Chemistry',
  'MSc Inorganic Chemistry',
  'MSc Biotechnology'
];

const BioconApplicationForm = () => {

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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    //alert(data)
    data.transstatus = paymentStatus;
    data.a_degree = 'B.Sc Chemistry';
    startTransition(() => {
      navigate('/biocon-thankyou', { state: { formData: data } });
    });
  };
  return (
    <Box sx={{ bgcolor: '#f8f9fc', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img
              src={MVLogo}
              alt="Logo"
              style={{ height: 50, marginRight: 12 }}
            />
            <Typography variant="h6" component="div">
              MV Technologies
            </Typography>
          </Box>
          {/* <div className="text-white text-lg font-medium">
            Career Portal
          </div> */}
        </Toolbar>
      </AppBar>

      {/* Job Description Card */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper
          elevation={4}
          sx={{
            p: 6,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb   100%)',
            color: '#fff'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Greetings from Biocon!
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Role: Production Machine Operator
          </Typography>

          <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            <li>
              Responsible for all the manufacturing operations as per standard operating procedures
              / checklist.
            </li>
            <li>Routine monitoring and recording of documents as per approved procedures.</li>
            <li>
              Responsible for receiving, dispensing, storage, packing of Raw Material / In process
              materials / Finished product.
            </li>
            <li>Operate the equipment and instruments through DCS or manually.</li>
          </ul>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Qualification Criteria:
              </Typography>
              <Typography>
                Only 2022/2023 and 2024 passed out FRESHERS are eligible. <br />
                BSc. Chemistry / MSc. Chemistry.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Benefits:
              </Typography>
              <Typography>
                • Monthly stipend: ₹13,500/- <br />
                • Apprenticeship period: 6 to 12 months <br />• Work Location: Hyderabad and
                Visakhapatnam
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Application Form */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5, fontFamily: 'Poppins, sans-serif' }}>
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: '#fff'
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className="font-bold text-center text-blue-600 mb-8"
            sx={{ fontWeight: 'bold', color: '#2563eb' }}
          >
            Job Application Form
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information */}
            <Typography
              variant="h6"
              sx={{ mt: 4, mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <PersonIcon className="w-5 h-5 mr-2" />
                Personal Information
              </h3>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  fullWidth
                  {...register('p_fname', { required: 'Full name required' })}
                  error={!!errors.p_fname}
                  helperText={errors.p_fname?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register('p_mobile', {
                    required: 'Phone number required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Enter 10-digit phone number'
                    }
                  })}
                  error={!!errors.p_mobile}
                  helperText={errors.p_mobile?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email ID"
                  fullWidth
                  {...register('p_email', {
                    required: 'Email required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format'
                    }
                  })}
                  error={!!errors.p_email}
                  helperText={errors.p_email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="College Name"
                  fullWidth
                  {...register('p_collegename', { required: 'College name required' })}
                  error={!!errors.p_collegename}
                  helperText={errors.p_collegename?.message}
                />
              </Grid>
            </Grid>

            {/* Academic Information */}
            <Typography
              variant="h6"
              sx={{ mt: 5, mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              <SchoolIcon sx={{ mr: 1, color: '#1976d2' }} /> Academic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Year of Degree Passing"
                  select
                  fullWidth
                  defaultValue=""
                  {...register('a_year', { required: 'Select year' })}
                  error={!!errors.a_year}
                  helperText={errors.a_year?.message}
                >
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="a_degree" fullWidth value="B.Sc Chemistry" disabled />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="PG Specialization"
                  select
                  fullWidth
                  defaultValue=""
                  {...register('a_specilization', { required: 'Select PG specialization' })}
                  error={!!errors.a_specilization}
                  helperText={errors.a_specilization?.message}
                >
                  {pgOptions.map((a_specilization) => (
                    <MenuItem key={a_specilization} value={a_specilization}>
                      {a_specilization}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* Percentages */}
            <Typography
              variant="h6"
              sx={{ mt: 5, mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              <InsertChartIcon
                sx={{
                  mr: 1,
                  color: '#1976d2',
                  fontSize: '1.8rem'
                }}
              />{' '}
              Academic Percentages
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="10th %"
                  fullWidth
                  {...register('ap_10', {
                    required: '10th % is required',
                    validate: (value) =>
                      (value >= 0 && value <= 100) || 'Enter a valid percentage (0-100)'
                  })}
                  error={!!errors.ap_10}
                  helperText={errors.ap_10?.message}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="12th %"
                  fullWidth
                  {...register('ap_12', {
                    required: '12th % is required',
                    validate: (value) =>
                      (value >= 0 && value <= 100) || 'Enter a valid percentage (0-100)'
                  })}
                  error={!!errors.ap_12}
                  helperText={errors.ap_12?.message}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="UG %"
                  fullWidth
                  {...register('ap_ug', {
                    required: 'UG % is required',
                    validate: (value) =>
                      (value >= 0 && value <= 100) || 'Enter a valid percentage (0-100)'
                  })}
                  error={!!errors.ap_ug}
                  helperText={errors.ap_ug?.message}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="PG %"
                  fullWidth
                  {...register('ap_pg', {
                    validate: (value) =>
                      value === '' ||
                      (value >= 0 && value <= 100) ||
                      'Enter a valid percentage (0-100)'
                  })}
                  error={!!errors.ap_pg}
                  helperText={errors.ap_pg?.message}
                />
              </Grid>
            </Grid>



            <Typography
              variant="h6"
              sx={{ mt: 5, mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              <InsertChartIcon
                sx={{
                  mr: 1,
                  color: '#1976d2',
                  fontSize: '1.8rem'
                }}
              />{' '}
              Transaction Validator
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Enter Transaction ID"
                  fullWidth
                  {...register('transid', {
                    required: 'Enter Transaction ID is required',
                    validate: (value) =>
                      /^T2507[0-9]/.test(value) || 'Enter a valid Transaction Id like T2507...'
                  })}
                  error={!!errors.transid}
                  helperText={errors.transid?.message}
                  onChange={handleTextChange}
                />
              </Grid>

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
                      <span className="text-blue-700" >{extractedId}</span>
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
                      <span  className="text-blue-700 font-semibold">{paidTo}</span>
                    </p>
                  )}
            </Grid>

            {/* Submit */}
            <Box textAlign="center" mt={5}>
              <Button disabled={!isValid}
                variant="contained"
                type="submit"
                sx={{
                  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                  px: 5,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Apply Now
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a1a2e', color: '#ccc', mt: 6, py: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2025 Biocon Limited. All rights reserved.
            <br />
            Empowering global healthcare through innovation and excellence.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default BioconApplicationForm;
