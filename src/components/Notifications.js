import React, { useState, useEffect } from 'react';
import { Badge, List, ListItem, ListItemText, Button, Typography, Divider } from '@mui/material';
import axios from 'axios';
import CommunicationModal from './CommunicationModal';
import { API_BASE_URL } from '../config';

const Notifications = () => {
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [dueTodayCommunications, setDueTodayCommunications] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin-module/communications/overdue/`)
      .then(response => {
        setOverdueCommunications(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
    
    axios.get(`${API_BASE_URL}/admin-module/communications/due-today/`)
      .then(response => {
        setDueTodayCommunications(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);
  

  const handleOpenModal = (notification) => {
    if (notification && notification.company) {
      setSelectedNotification(notification);
      setModalOpen(true);
    }
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNotification(null);
  };

  const handleCommunicationSubmit = (data) => {
    axios.post(`${API_BASE_URL}/admin-module/communications/`, {
      ...data,
      company: selectedNotification.company.id,
    })
    .then(response => {
      console.log('Communication logged successfully:', response.data);
      setModalOpen(false);
    })
    .catch(error => console.error(error));
  };
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Badge badgeContent={overdueCommunications.length + dueTodayCommunications.length} color="secondary">
        <Typography variant="h6" gutterBottom>
          Communications
        </Typography>
      </Badge>
      <Divider />
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Overdue Communications
      </Typography>
      <List>
        {overdueCommunications.map((comm) => (
          <ListItem key={comm.id} style={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText primary={`${comm.company.name} - ${new Date(comm.date).toLocaleDateString()}`} />
            <Button variant="contained" color="primary" onClick={() => handleOpenModal(comm)}>
              Log Communication
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Today's Communications
      </Typography>
      <List>
        {dueTodayCommunications.map((comm) => (
          <ListItem key={comm.id} style={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText primary={`${comm.company?.name || 'Unknown'} - ${comm.date}`} />
            <Button variant="contained" color="primary" onClick={() => handleOpenModal(comm)}>
              Log Communication
            </Button>
          </ListItem>
        ))}
      </List>

      <CommunicationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCommunicationSubmit}
        initialData={selectedNotification || {}}
      />
    </div>
  );
};

export default Notifications;
