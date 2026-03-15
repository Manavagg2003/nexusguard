import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress, Box, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import theme from '../theme';

const AISummary = ({ alerts = [] }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!alerts || alerts.length === 0) {
      setError("No alerts to summarize.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const response = await fetch('/api/v1/nexusguard/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ alerts }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data.summary || data.message || "Summary generated successfully, but no text was returned.");
    } catch (err) {
      console.error("Error summarizing alerts:", err);
      // For demonstration if endpoint is not fully up yet, we could fallback, but let's show the error
      setError("Failed to generate AI summary. Please ensure the backend endpoint is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 3, 
        bgcolor: 'background.paper', 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              AI Triage Summary
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleSummarize}
            disabled={loading || alerts.length === 0}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {loading ? 'Summarizing...' : 'Summarize Alerts'}
          </Button>
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ minHeight: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
              <CircularProgress size={24} />
              <Typography variant="body2">Our AI is analyzing {alerts.length} alert{alerts.length !== 1 ? 's' : ''} to generate a comprehensive triage summary. This may take a moment...</Typography>
            </Box>
          )}

          {!loading && !summary && !error && (
            <Typography variant="body2" color="text.secondary">
              Click the button above to generate an AI-powered summary of the current alerts.
            </Typography>
          )}

          {!loading && error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          {!loading && summary && (
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.default', 
              borderRadius: 1,
              borderLeft: '4px solid',
              borderColor: 'primary.main'
            }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {summary}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AISummary;
