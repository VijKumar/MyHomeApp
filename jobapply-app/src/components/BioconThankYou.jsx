import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const BioconThankYou = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const hasPosted = useRef(false);

  useEffect(() => {
    if (formData && !hasPosted.current) {
      hasPosted.current = true;
      fetch('http://localhost:8080/Biocon_UserRegister', {
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
        });
    }
  }, [formData]);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Thank you for applying, {formData?.fullName}!
        </Typography>
        <Typography variant="body1">
          We've received your application for {formData?.pg}.
        </Typography>
        <Typography variant="body1">
          Our team will get back to you shortly at {formData?.email}.
        </Typography>
      </Box>
    </Container>
  );
};

export default BioconThankYou;