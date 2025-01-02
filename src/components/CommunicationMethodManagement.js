import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_BASE_URL } from '../config';

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sequence: 1,
    is_mandatory: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Fetch communication methods from the API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin-module/methods/`)
      .then((response) => setMethods(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleOpenEdit = (method) => {
    setSelectedMethod(method);
    setFormData(method);
    setIsEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit
      ? `${API_BASE_URL}/admin-module/methods/${selectedMethod.id}/`
      : `${API_BASE_URL}/admin-module/methods/`;
    const method = isEdit ? 'put' : 'post';

    axios[method](url, formData)
      .then((response) => {
        const updatedMethods = isEdit
          ? methods.map((method) =>
              method.id === response.data.id ? response.data : method
            )
          : [...methods, response.data];
        setMethods(updatedMethods);
        setFormData({ name: '', description: '', sequence: 1, is_mandatory: false });
        setIsEdit(false);
      })
      .catch((error) => console.error('Error saving method:', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/admin-module/methods/${id}/`)
      .then(() => setMethods(methods.filter((method) => method.id !== id)))
      .catch((error) => console.error('Error deleting method:', error));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Communication Method Management
      </Typography>

      {/* Form for adding/editing methods */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <TextField
          label="Sequence"
          fullWidth
          margin="normal"
          type="number"
          value={formData.sequence}
          onChange={(e) =>
            setFormData({ ...formData, sequence: parseInt(e.target.value, 10) })
          }
          required
        />
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Checkbox
            checked={formData.is_mandatory}
            onChange={(e) =>
              setFormData({ ...formData, is_mandatory: e.target.checked })
            }
          />
          <Typography>Mandatory</Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
        >
          {isEdit ? 'Save Changes' : 'Add Method'}
        </Button>
        {isEdit && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setFormData({ name: '', description: '', sequence: 1, is_mandatory: false });
              setIsEdit(false);
            }}
          >
            Cancel
          </Button>
        )}
      </form>

      {/* List of methods */}
      <List>
        {methods.map((method) => (
          <ListItem key={method.id} divider>
            <ListItemText
              primary={method.name}
              secondary={`${method.description} (Sequence: ${method.sequence})`}
            />
            <IconButton onClick={() => handleOpenEdit(method)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(method.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommunicationMethodManagement;
