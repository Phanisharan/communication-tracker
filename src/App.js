import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import CompanyManagement from './components/CompanyManagement';
import CommunicationMethodManagement from './components/CommunicationMethodManagement';
import Notifications from './components/Notifications';
import CalendarView from './components/CalendarView';
import UserManagement from './components/UserManagement';
import ReportManagement from './components/ReportManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import LandingPage from './components/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = ({ showNavbar, setShowNavbar, hideUsersButton }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/users') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location.pathname, setShowNavbar]);

  return (
    <>
      {showNavbar && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Communication Tracker
            </Typography>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/companies">Companies</Button>
            <Button color="inherit" component={Link} to="/methods">Methods</Button>
            <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
            <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
            <Button color="inherit" component={Link} to="/reports">Reports</Button>
            <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
          </Toolbar>
        </AppBar>
      )}
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<CompanyManagement />} />
          <Route path="/methods" element={<CommunicationMethodManagement />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/users" element={<UserManagement setShowNavbar={setShowNavbar} />} />
          <Route path="/reports" element={<ReportManagement />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </Container>
    </>
  );
};

const App = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [hideUsersButton, setHideUsersButton] = useState(false);

  return (
    <Router>
      <AppContent showNavbar={showNavbar} setShowNavbar={setShowNavbar} hideUsersButton={hideUsersButton} />
    </Router>
  );
};

export default App;
