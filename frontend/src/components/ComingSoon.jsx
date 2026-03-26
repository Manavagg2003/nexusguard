import React from 'react';
import { Box, Typography } from '@mui/material';

const ComingSoon = ({ pageName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        color: 'white',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#ff8544' }}>
        {pageName}
      </Typography>
      <Typography variant="h4" sx={{ opacity: 0.8 }}>
        Coming Soon
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, maxWidth: 600, opacity: 0.6 }}>
        We are hard at work building the best-in-class {pageName.toLowerCase()} experience for NexusGuard. 
        Stay tuned for updates!
      </Typography>
    </Box>
  );
};

export default ComingSoon;
