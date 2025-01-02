import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import { format } from 'date-fns';
import './Dashboard.css'; 
import { API_BASE_URL } from '../config';

const formatDate = (date) => (date ? format(new Date(date), 'dd MMM yyyy') : 'No data available');

const Dashboard = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Apple Inc.',
      lastFiveCommunications: [
        { type: 'Email', date: '2025-01-01', notes: 'Initial communication regarding new product launch.' },
        { type: 'Phone Call', date: '2024-01-01', notes: 'Follow-up on marketing partnership discussion.' },
      ],
      nextScheduledCommunication: { type: 'Email', date: '2025-01-01', notes: 'Reminder email for product updates.' },
    },
    {
      id: 2,
      name: 'Google (Alphabet Inc.)',
      lastFiveCommunications: [
        { type: 'LinkedIn Post', date: '2025-01-03', notes: 'Posted an update about new AI tools.' },
        { type: 'Email', date: '2024-01-07', notes: 'Follow-up on API integration discussion.' },
      ],
      nextScheduledCommunication: { type: 'Phone Call', date: '2025-01-03', notes: 'Scheduled call to finalize partnership details.' },
    },
    {
      id: 3,
      name: 'Microsoft Corporation',
      lastFiveCommunications: [
        { type: 'Phone Call', date: '2025-01-07', notes: 'Discussed product feedback and future collaboration.' },
        { type: 'LinkedIn Message', date: '2024-01-10', notes: 'Connection request with senior management.' },
      ],
      nextScheduledCommunication: { type: 'LinkedIn Message', date: '2025-01-07', notes: 'Message to discuss potential business opportunities.' },
    },
    {
      id: 4,
      name: 'Amazon.com, Inc.',
      lastFiveCommunications: [
        { type: 'LinkedIn Post', date: '2025-01-08', notes: 'Announced new retail strategies for 2025.' },
        { type: 'Email', date: '2024-01-12', notes: 'Follow-up on supply chain optimization initiative.' },
      ],
      nextScheduledCommunication: { type: 'Phone Call', date: '2025-01-08', notes: 'Scheduled follow-up call for strategic alliance discussion.' },
    },
    {
      id: 5,
      name: 'Tesla, Inc.',
      lastFiveCommunications: [
        { type: 'Email', date: '2025-01-14', notes: 'Update on electric vehicle technology improvements.' },
        { type: 'Phone Call', date: '2024-01-14', notes: 'Discussion on potential market expansion.' },
      ],
      nextScheduledCommunication: { type: 'Email', date: '2025-01-14', notes: 'Email regarding product launch event details.' },
    },
  ]);
  const [overrides, setOverrides] = useState({}); 

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin-module/companies/`)
      .then((response) => {
        console.log(response.data); 
        setCompanies(response.data); 
      })
      .catch((error) => console.error(error)); 
  }, []);

  const handleOverrideToggle = (id) => {
    setOverrides((prevOverrides) => ({
      ...prevOverrides,
      [id]: !prevOverrides[id], 
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
        const displayText = communications.length > 0 ? communications.map((comm) => `${comm.type} (${formatDate(comm.date)})`).join(', ') : 'No data available';
        return (
          <Tooltip title={communications.map((comm) => comm?.notes || '').join(', ')}>
            <span>
              {displayText}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: 'nextCommunication',
      headerName: 'Next Scheduled Communication',
      width: 300,
      renderCell: (params) => {
        const { id, value } = params.row || {}; 
        const isOverride = overrides[id]; 
        const date = value?.date ? new Date(value.date) : null; 

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

        return (
          <div>
            <Tooltip title={value?.notes || ''}>
              <span className={getHighlightClass()}>
                {value?.type ? `${value.type} (${formatDate(value.date)})` : 'No data available'}
              </span>
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
    nextCommunication: company.nextScheduledCommunication || null,
  }));

  return (
    <div>
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
