import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AppBarComponent = () => {
  return (
    <AppBar position="static" style={{ background: 'white', borderRadius:'20px'}}>
      <Toolbar>
        <div style={{ backgroundColor: '#0000FF', padding: '10px', borderRadius: '5px', marginLeft:'20px' }}>
          <Typography variant="h6" style={{ color: 'white' }}>
            Your Logo
          </Typography>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <Button variant="contained" color="primary" style={{ backgroundColor: '#0000FF', borderRadius: '20px', marginRight:'20px' }}>
          Feedback
        </Button>
        <IconButton
          color="inherit"
          style={{
            backgroundColor: '#0000FF',
            marginRight: '20px'  
          }}
        >
          <NotificationsIcon style={{ color: 'white' }} />
        </IconButton>
        <Avatar alt="Profile" src="/placeholder-profile.jpg" style={{marginRight:'20px'}} />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;