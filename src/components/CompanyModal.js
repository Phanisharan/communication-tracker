import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const CompanyModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emails' || name === 'phone_numbers') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          padding: '20px',
          background: 'white',
          width: { xs: '90%', sm: '500px' },
          margin: '5% auto',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: 24,
        }}
      >
        <h2>{initialData?.name ? 'Edit Company' : 'Add Company'}</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Company Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Location"
            name="location"
            fullWidth
            margin="normal"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <TextField
            label="LinkedIn Profile"
            name="linkedin_profile"
            fullWidth
            margin="normal"
            value={formData.linkedin_profile}
            onChange={handleChange}
          />
          <TextField
            label="Emails"
            name="emails"
            fullWidth
            margin="normal"
            value={formData.emails.join(', ')}
            onChange={handleChange}
          />
          <TextField
            label="Phone Numbers"
            name="phone_numbers"
            fullWidth
            margin="normal"
            value={formData.phone_numbers.join(', ')}
            onChange={handleChange}
          />
          <TextField
            label="Comments"
            name="comments"
            fullWidth
            margin="normal"
            value={formData.comments}
            onChange={handleChange}
          />
          <TextField
            label="Communication Periodicity"
            name="communication_periodicity"
            fullWidth
            margin="normal"
            type="number"
            value={formData.communication_periodicity}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            {initialData?.name ? 'Save Changes' : 'Add Company'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CompanyModal;
