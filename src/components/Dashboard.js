import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import { format } from 'date-fns';
import '../styles/Dashboard.css';
import { API_BASE_URL } from '../config';

// Helper function to format dates
const formatDate = (date) => (date ? format(new Date(date), 'dd MMM yyyy') : 'No data available');

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [overrides, setOverrides] = useState({}); // Store overrides

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin-module/companies/`)
      .then((response) => {
        setCompanies(response.data); // Set company data
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle override toggle
  const handleOverrideToggle = (id) => {
    setOverrides((prevOverrides) => ({
      ...prevOverrides,
      [id]: !prevOverrides[id], // Toggle override state
    }));
  };

  const columns = [
    { field: 'name', headerName: 'Company Name', width: 200 },
    {
      field: 'lastCommunications',
      headerName: 'Last Five Communications',
      width: 400,
      renderCell: (params) => {
        const communications = params.value || [];
        const displayText =
          communications.length > 0
            ? communications.map((comm) => `${comm.method.name} (${formatDate(comm.date)})`).join(', ')
            : 'No data available';
        return (
          <Tooltip title={communications.map((comm) => comm?.notes || '').join(', ')}>
            <span>{displayText}</span>
          </Tooltip>
        );
      },
    },
    {
      field: 'nextCommunication',
      headerName: 'Next Scheduled Communication',
      width: 300,
      renderCell: (params) => {
        const { id, nextScheduledCommunication } = params.row || {};
        const isOverride = overrides[id]; 
        const date = nextScheduledCommunication?.date ? new Date(nextScheduledCommunication.date) : null;

        const getHighlightClass = () => {
          if (isOverride) return ''; 
          if (date) {
            const today = new Date();
            const diff = (date - today) / (1000 * 60 * 60 * 24);
            if (diff < 0) return 'redHighlight'; 
            if (diff === 0) return 'yellowHighlight';
          }
          return '';
        };

    
        const communicationText =
          nextScheduledCommunication && nextScheduledCommunication.method
            ? `${nextScheduledCommunication.method} (${formatDate(nextScheduledCommunication.date)})`
            : 'No data available';

        return (
          <div>
            <Tooltip title={nextScheduledCommunication?.notes || ''}>
              <span className={getHighlightClass()}>{communicationText}</span>
            </Tooltip>
            <input
              style={{ margin: '20px' }}
              type="checkbox"
              onChange={() => handleOverrideToggle(id)} 
              checked={isOverride || false}
              title="Override Highlight"
            />
          </div>
        );
      },
    },
  ];


  const rows = companies.map((company) => ({
    id: company.id || 0,
    name: company.name || 'Unnamed',
    lastCommunications: company.lastFiveCommunications || [],
    nextScheduledCommunication: company.nextScheduledCommunication || null,
  }));

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default Dashboard;
