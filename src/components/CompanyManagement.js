import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Button, List, ListItem, ListItemText, IconButton, Card, CardContent, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CompanyModal from './CompanyModal'; 
import { API_BASE_URL } from '../config';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedin_profile: '',
    emails: [''],
    phone_numbers: [''],
    comments: '',
    communication_periodicity: 14,
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin-module/companies/`)
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleOpenModal = (company = null) => {
    if (company) {
      setSelectedCompany(company);
      setFormData({
        name: company.name,
        location: company.location,
        linkedin_profile: company.linkedin_profile,
        emails: company.emails,
        phone_numbers: company.phone_numbers,
        comments: company.comments,
        communication_periodicity: company.communication_periodicity,
      });
      setIsEdit(true);
    } else {
      setFormData({
        name: '',
        location: '',
        linkedin_profile: '',
        emails: [''],
        phone_numbers: [''],
        comments: '',
        communication_periodicity: 14,
      });
      setIsEdit(false);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCompany(null);
  };

  const handleSubmit = (data) => {
    if (!data.name || !data.location) {
      alert('Company Name and Location are required.');
      return;
    }

    const url = isEdit
      ? `${API_BASE_URL}/admin-module/companies/${selectedCompany.id}/`
      : `${API_BASE_URL}/admin-module/companies/`;
    const method = isEdit ? 'put' : 'post';

    console.log('Submitted data:', data);

    axios[method](url, data)
      .then((response) => {
        console.log('API Response:', response.data);
        if (isEdit) {
          setCompanies(companies.map((company) => (company.id === response.data.id ? response.data : company)));
        } else {
          setCompanies([...companies, response.data]);
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error('API Error:', error);
        alert('Failed to save company. Please try again.');
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/admin-module/companies/${id}/`)
      .then(() => setCompanies(companies.filter((company) => company.id !== id)))
      .catch((error) => console.error('Error deleting company:', error));
  };

  return (
    <div>
      <h2>Company Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add New Company
      </Button>
      <List>
        {companies.map((company) => (
          <Card key={company.id} style={{ marginBottom: '16px', padding: '10px',boxShadow: '10px -10px 10px rgba(253, 111, 146, 0.23)', backgroundColor: 'rgba(243, 10, 92, 0.35)', borderRadius: '10px'}}>
            <CardContent>
              <Typography variant="h6">{company.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Location: {company.location}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                LinkedIn: <a href={company.linkedin_profile} target="_blank" rel="noopener noreferrer">{company.linkedin_profile}</a>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {company.emails.join(', ')}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {company.phone_numbers.join(', ')}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Comments: {company.comments || 'No comments available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                communication_periodicity: {` ${company.communication_periodicity} days `}
              </Typography>
              <div style={{ marginTop: '8px' }}>
                <IconButton onClick={() => handleOpenModal(company)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(company.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </List>

      <CompanyModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={formData}
      />
    </div>
  );
};

export default CompanyManagement;
