import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  IconButton, 
  Tooltip,
  TextField,
  InputAdornment,
  Fade,
  CircularProgress,
  Button
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterAlt as FilterIcon,
  NotificationsActive as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { Context } from '../context/ContextApi.jsx';
import { getTheme } from '../theme.jsx';
import AISummary from '../components/AISummary.jsx';

const Alerts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeMode, brandColor } = useContext(Context);
  const theme = getTheme(themeMode, brandColor);
  
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Parse query parameter
  const queryParams = new URLSearchParams(location.search);
  const workflowFilter = queryParams.get('workflow');
  const executionFilter = queryParams.get('execution_id');

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Production - backend proxy forwarding in nginx
      var globalUrl = window.location.origin;
      if (window.location.port === "3000") {
        globalUrl = "http://localhost:5001";
      }

      const response = await fetch(`${globalUrl}/api/v1/users/notifications`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const responseJson = await response.json();
      
      if (responseJson.success && responseJson.notifications) {
        setNotifications(responseJson.notifications);
        applyFilters(responseJson.notifications, workflowFilter, executionFilter, searchTerm);
      } else {
        // Mock data for demonstration if no notifications exist or API fails
        const mockNotifications = [
          {
            id: '1',
            title: 'Critical Workflow Error',
            message: 'App "Splunk" failed to respond within timeout.',
            type: 'error',
            workflow_id: 'workflow-1',
            execution_id: 'exec-123',
            workflow_name: 'Threat Hunting Automation',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Workflow Execution Notification',
            message: 'Successfully enriched 45 alerts from Jira.',
            type: 'info',
            workflow_id: 'workflow-1',
            execution_id: 'exec-124',
            workflow_name: 'Threat Hunting Automation',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: '3',
            title: 'Malicious IP Detected',
            message: 'High severity alert from CrowdStrike: 192.168.1.105',
            type: 'warning',
            workflow_id: 'workflow-2',
            execution_id: 'exec-999',
            workflow_name: 'Endpoint Quarantine',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
          }
        ];
        setNotifications(mockNotifications);
        applyFilters(mockNotifications, workflowFilter, executionFilter, searchTerm);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (data, workflowId, executionId, search) => {
    let filtered = [...data];
    
    if (workflowId) {
      filtered = filtered.filter(n => n.workflow_id === workflowId || n.workflow === workflowId);
    }

    if (executionId) {
      filtered = filtered.filter(n => n.execution_id === executionId);
    }
    
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(n => 
        (n.title && n.title.toLowerCase().includes(lowerSearch)) || 
        (n.message && n.message.toLowerCase().includes(lowerSearch)) ||
        (n.workflow_name && n.workflow_name.toLowerCase().includes(lowerSearch))
      );
    }
    
    setFilteredNotifications(filtered);
  };

  useEffect(() => {
    fetchNotifications();
  }, [workflowFilter, executionFilter]);

  useEffect(() => {
    applyFilters(notifications, workflowFilter, executionFilter, searchTerm);
  }, [searchTerm, notifications]);

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'error': return '#f44336';
      case 'warning': return '#ffa726';
      case 'success': return '#66bb6a';
      default: return '#29b6f6';
    }
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const clearFilter = () => {
    navigate('/alerts');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: theme.palette.backgroundColor || '#0a0a1a', 
      color: 'white',
      p: 4,
      background: `linear-gradient(135deg, ${theme.palette.backgroundColor || '#0a0a1a'} 0%, #1e1e3f 100%)`,
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => navigate(-1)} 
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
                System Alerts & Notifications
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                Monitor execution results and system-wide security notifications.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              startIcon={<RefreshIcon />}
              onClick={fetchNotifications}
              sx={{ color: 'white', textTransform: 'none' }}
            >
              Refresh
            </Button>
            <Button 
                variant="contained"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/new-dashboard')}
                sx={{ textTransform: 'none', bgcolor: theme.palette.primary.main }}
            >
                Back to Dashboard
            </Button>
          </Box>
        </Box>

        {/* AI Summary Section */}
        <Fade in={!loading}>
            <Box sx={{ mb: 4 }}>
                <AISummary alerts={filteredNotifications} />
            </Box>
        </Fade>

        {/* Filters & Search */}
        <Paper sx={{ 
          p: 3, 
          mb: 4, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'rgba(255,255,255,0.02)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <TextField
              placeholder="Search alerts by title, message or workflow..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ maxWidth: 500 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.4)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  '& fieldset': { borderColor: 'transparent' },
                }
              }}
            />
            {workflowFilter && (
              <Chip 
                label={`Workflow: ${workflowFilter}`} 
                onDelete={clearFilter}
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white',
                  '& .MuiChip-deleteIcon': { color: 'white' }
                }} 
              />
            )}
            {executionFilter && (
              <Chip 
                label={`Execution: ${executionFilter}`} 
                onDelete={clearFilter}
                sx={{ 
                  bgcolor: '#9c27b0', 
                  color: 'white',
                  '& .MuiChip-deleteIcon': { color: 'white' }
                }} 
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
            <NotificationsIcon fontSize="small" />
            <Typography variant="body2">
              Showing {filteredNotifications.length} alerts
            </Typography>
          </Box>
        </Paper>

        {/* Alerts Table */}
        <TableContainer component={Paper} sx={{ 
          bgcolor: 'rgba(255,255,255,0.01)', 
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          {loading ? (
            <Box sx={{ p: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
              <CircularProgress color="primary" />
              <Typography sx={{ opacity: 0.6 }}>Processing alerts...</Typography>
            </Box>
          ) : filteredNotifications.length === 0 ? (
            <Box sx={{ p: 8, textAlign: 'center' }}>
              <HistoryIcon sx={{ fontSize: 64, mb: 2, opacity: 0.2 }} />
              <Typography variant="h6" sx={{ opacity: 0.5 }}>No alerts found</Typography>
              <Typography variant="body2" sx={{ opacity: 0.3 }}>Try adjusting your search or filters.</Typography>
              {workflowFilter && (
                  <Button onClick={clearFilter} sx={{ mt: 2, textTransform: 'none' }}>View all alerts</Button>
              )}
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Level</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Notification</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Workflow</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNotifications.map((notification, index) => (
                  <Fade in key={notification.id} timeout={300 + index * 50}>
                    <TableRow sx={{ 
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
                      transition: 'background-color 0.2s',
                    }}>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Box sx={{ 
                          width: 8, height: 8, borderRadius: '50%', 
                          bgcolor: getTypeColor(notification.type),
                          boxShadow: `0 0 10px ${getTypeColor(notification.type)}`
                        }} />
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
                          {notification.title || 'Notification'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 500 }}>
                          {notification.message}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {notification.workflow_name || notification.workflow_id ? (
                          <Chip 
                            label={notification.workflow_name || notification.workflow_id} 
                            size="small"
                            sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ opacity: 0.3 }}>N/A</Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
                        {formatTimestamp(notification.timestamp)}
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Alerts;
