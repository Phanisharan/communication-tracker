import React, { useState, useEffect } from 'react';
import { Badge, List, ListItem, ListItemText, Button, Typography, Divider } from '@mui/material';
import axios from 'axios';
import NotificationModal from './NotificationModal'; // New Modal for Notifications
import { API_BASE_URL } from '../config';

const Notifications = () => {
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [dueTodayCommunications, setDueTodayCommunications] = useState([]);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin-module/communications/overdue/`)
      .then((response) => {
        setOverdueCommunications(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${API_BASE_URL}/admin-module/communications/due-today/`)
      .then((response) => {
        setDueTodayCommunications(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOpenNotificationModal = (notification) => {
    if (notification && notification.company) {
      setSelectedNotification(notification);
      setNotificationModalOpen(true);
    }
  };

  const handleCloseNotificationModal = () => {
    setNotificationModalOpen(false);
    setSelectedNotification(null);
  };

  const handleNotificationSubmit = (data) => {
    axios
      .post(`${API_BASE_URL}/admin-module/communications/`, {
        ...data,
        company: selectedNotification.company.id,
      })
      .then((response) => {
        console.log('Notification logged successfully:', response.data);
        setNotificationModalOpen(false);
      })
      .catch((error) => console.error(error));
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenNotificationModal(comm)}
            >
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenNotificationModal(comm)}
            >
              Log Communication
            </Button>
          </ListItem>
        ))}
      </List>

      <NotificationModal
        open={isNotificationModalOpen}
        onClose={handleCloseNotificationModal}
        onSubmit={handleNotificationSubmit}
        initialData={selectedNotification || {}}
      />
    </div>
  );
};

export default Notifications;
