import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const ComingSoon = ({ pageName }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        color: theme.palette.text.primary,
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.primary.main 
        }}
      >
        {pageName}
      </Typography>
      <Typography variant="h4" sx={{ opacity: 0.8, color: theme.palette.text.secondary }}>
        Coming Soon
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, maxWidth: 600, opacity: 0.6, color: theme.palette.text.secondary }}>
        We are hard at work building the best-in-class {pageName.toLowerCase()} experience for NexusGuard. 
        Stay tuned for updates!
      </Typography>
    </Box>
  );
};

export default ComingSoon;
