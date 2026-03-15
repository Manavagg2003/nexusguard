import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
                textAlign: 'center',
                p: 3
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 700, mb: 2 }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                NexusGuard — Page not found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 500 }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/workflows')}
                sx={{ textTransform: 'none', px: 4, py: 1.5, fontSize: '1rem', borderRadius: 2 }}
            >
                Return to Dashboard
            </Button>
        </Box>
    );
};

export default NotFound;
