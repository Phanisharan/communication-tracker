import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, Container } from '@mui/material';
import { API_BASE_URL } from '../config';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/reporting-module/reports/`)
      .then(response => setReports(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <List>
        {reports.map(report => (
          <ListItem key={report.id} style={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText
              primary={`${report.company.name} - ${report.report_date}`}
              secondary={report.summary}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ReportManagement;
