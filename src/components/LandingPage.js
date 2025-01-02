import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';


const HeroSection = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #70e1f5 10%, #ffd194 100%)', 
  padding: '100px 0',
  color: '#fff',
  textAlign: 'center',
  marginBottom: '40px',
}));

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontSize: '1.2rem',
}));

const LandingPage = () => {
  return (
    <>
      <HeroSection>
        <Container maxWidth="sm">
          <Typography variant="h2" gutterBottom>Welcome to Communication Tracker</Typography>
          <Typography variant="h5" gutterBottom>Track all your communications and schedules effortlessly</Typography>
          <ActionButton variant="contained" color="primary" component={Link} to="/dashboard">Get Started</ActionButton>
          <ActionButton variant="outlined" color="primary" component={Link} to="/users">Register</ActionButton>
        </Container>
      </HeroSection>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeaturePaper>
              <Typography variant="h5" gutterBottom>Unified Communication</Typography>
              <Typography>Manage all your communications in one place with ease and efficiency.</Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeaturePaper>
              <Typography variant="h5" gutterBottom>Integrated Calendar</Typography>
              <Typography>Keep track of your schedule with our user-friendly integrated calendar.</Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeaturePaper>
              <Typography variant="h5" gutterBottom>Reminders & Alerts</Typography>
              <Typography>Get reminders for important tasks and never miss a deadline again.</Typography>
            </FeaturePaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
