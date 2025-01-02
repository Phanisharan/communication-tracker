import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const defaultData = {
  type: '',
  date: '',
  notes: '',
};

const CommunicationModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ ...defaultData });

  useEffect(() => {
    if (initialData && initialData.date) {
      const formattedDate = new Date(initialData.date).toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, date: formattedDate, ...initialData }));
    } else {
      setFormData({ ...defaultData, ...initialData });
    }
    console.log('Initial Data:', initialData);
  }, [initialData]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.date || !formData.notes) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(formData);
  };

  const handleCloseModal = () => {
    setFormData({ ...defaultData });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          padding: '20px',
          background: 'white',
          width: { xs: '90%', sm: '500px' },
          margin: '10% auto',
        }}
      >
        <h2>{initialData?.type ? 'Edit Communication' : 'Add Communication'}</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Type"
            name="type"
            fullWidth
            margin="normal"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date"
            name="date"
            fullWidth
            margin="normal"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <TextField
            label="Notes"
            name="notes"
            fullWidth
            margin="normal"
            value={formData.notes}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            {initialData?.type ? 'Save Changes' : 'Add Communication'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};


export default CommunicationModal;
