import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Paper, Typography, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const UserManagement = ({ setShowNavbar }) => {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();  

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'User',
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/user-module/users/`)
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormData({ ...user, password: '' });
    setIsEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit ? `${API_BASE_URL}/user-module/users/${selectedUser.id}/` : `${API_BASE_URL}/user-module/users/`;
    const method = isEdit ? 'put' : 'post';

    axios[method](url, formData)
      .then((response) => {
        const updatedUsers = isEdit
          ? users.map((user) => (user.id === response.data.id ? response.data : user))
          : [...users, response.data];
        setUsers(updatedUsers);
        setFormData({ username: '', email: '', password: '', role: 'User' });
        setIsEdit(false);
        setShowNavbar(true); // Show navbar after user is added
        navigate('/dashboard'); // Redirect to dashboard
      })
      .catch((error) => console.error('Error saving user:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/user-module/users/${id}/`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Username" fullWidth margin="normal" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" fullWidth margin="normal" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" fullWidth margin="normal" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!isEdit} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Role" fullWidth margin="normal" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} select>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>{isEdit ? 'Save Changes' : 'Add User'}</Button>
          </Grid>
        </Grid>
      </form>
      <List style={{ marginTop: '20px' }}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={`${user.username} - ${user.email} (${user.role})`} />
            <IconButton onClick={() => handleOpenEdit(user)}>
              <EditIcon />
            </IconButton>
            <Button onClick={() => handleDelete(user.id)} variant="outlined" color="secondary">Delete</Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserManagement;
