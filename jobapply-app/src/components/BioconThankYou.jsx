import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

const BioconThankYou = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const hasPosted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData && !hasPosted.current) {
      hasPosted.current = true;
      fetch('https://applyjob-4twz.onrender.com/Biocon_UserRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((data) => {
          console.log('Form submitted successfully:', data);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [formData]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Submitting your application...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Thank you for applying
        </Typography>
        <Typography variant="body1">
          We've received your application.
        </Typography>
        <Typography variant="body1">
          Our team will get back to you shortly.
        </Typography>
      </Box>
    </Container>
  );
};

export default BioconThankYou;