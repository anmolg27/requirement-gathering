'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Folder as ProjectIcon,
  Description as DocumentIcon,
  VideoCall as MeetingIcon,
  Chat as ChatIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { projectApi, userApi, Project } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [projectsResponse, activitiesResponse] = await Promise.all([
          projectApi.getAll(),
          userApi.getActivities(10, 0),
        ]);

        if (projectsResponse.success) {
          setProjects(projectsResponse.data || []);
        }

        if (activitiesResponse.success) {
          setActivities(activitiesResponse.data || []);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'COMPLETED':
        return 'primary';
      case 'ARCHIVED':
        return 'default';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircleIcon color="success" />;
      case 'COMPLETED':
        return <StarIcon color="primary" />;
      case 'ARCHIVED':
        return <ScheduleIcon color="disabled" />;
      case 'CANCELLED':
        return <CheckCircleIcon color="error" />;
      default:
        return <ScheduleIcon color="disabled" />;
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <Card sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            border: `1px solid ${color}30`
          }}>
            {React.cloneElement(icon, { sx: { fontSize: 24, color: color } })}
          </Box>
          <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {value}
          </Typography>
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', p: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            width: 64, 
            height: 64, 
            mr: 3,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              Welcome back, {user?.firstName}!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Here's what's happening with your projects today
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            icon={<CalendarIcon />} 
            label={new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            sx={{ 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#6366f1'
            }}
          />
          <Chip 
            icon={<PersonIcon />} 
            label={`${projects.length} Projects`}
            sx={{ 
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981'
            }}
          />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Projects"
            value={projects.length}
            icon={<ProjectIcon />}
            color="#6366f1"
            subtitle="All time projects"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={projects.filter(p => p.status === 'ACTIVE').length}
            icon={<TrendingUpIcon />}
            color="#10b981"
            subtitle="Currently in progress"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Documents"
            value="0"
            icon={<DocumentIcon />}
            color="#3b82f6"
            subtitle="Total documents"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Meetings"
            value="0"
            icon={<MeetingIcon />}
            color="#ec4899"
            subtitle="Scheduled meetings"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Recent Projects */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #334155',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Recent Projects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your latest project updates and progress
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => router.push('/projects/new')}
                  sx={{ 
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  New Project
                </Button>
              </Box>

              {projects.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                  }}>
                    <ProjectIcon sx={{ fontSize: 40, color: '#6366f1' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    No projects yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300, mx: 'auto' }}>
                    Create your first project to get started with requirements gathering and management
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/projects/new')}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Create Your First Project
                  </Button>
                </Box>
              ) : (
                <Box sx={{ p: 2 }}>
                  {projects.slice(0, 5).map((project, index) => (
                    <Card
                      key={project.id}
                      sx={{
                        mb: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                        border: '1px solid #334155',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                          borderColor: '#6366f1',
                        }
                      }}
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              p: 1.5, 
                              borderRadius: 2, 
                              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                              border: '1px solid rgba(99, 102, 241, 0.2)',
                              mr: 2
                            }}>
                              <ProjectIcon sx={{ fontSize: 24, color: '#6366f1' }} />
                            </Box>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {project.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Client: {project.client}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(project.status)}
                            <Chip
                              label={project.status}
                              size="small"
                              color={getStatusColor(project.status) as any}
                              sx={{ fontWeight: 600 }}
                            />
                            <Tooltip title="More options">
                              <IconButton size="small">
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {project.description || 'No description available'}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            Created: {new Date(project.createdAt).toLocaleDateString()}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Progress
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={project.status === 'COMPLETED' ? 100 : project.status === 'ACTIVE' ? 65 : 25}
                              sx={{ 
                                width: 60, 
                                height: 6, 
                                borderRadius: 3,
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                                  borderRadius: 3,
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {projects.length > 5 && (
                    <Box sx={{ textAlign: 'center', pt: 2 }}>
                      <Button 
                        variant="outlined"
                        onClick={() => router.push('/projects')}
                        sx={{ 
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        View All Projects
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #334155'
              }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Recent Activities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latest updates and actions
                </Typography>
              </Box>

              {activities.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
                  <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    border: '1px solid rgba(236, 72, 153, 0.2)'
                  }}>
                    <ChatIcon sx={{ fontSize: 30, color: '#ec4899' }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    No recent activities
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 2 }}>
                  {activities.slice(0, 8).map((activity, index) => (
                    <ListItem 
                      key={index} 
                      sx={{ 
                        px: 2, 
                        py: 1.5,
                        borderRadius: 2,
                        mb: 1,
                        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.5) 0%, rgba(22, 33, 62, 0.5) 100%)',
                        border: '1px solid #334155',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                          borderColor: '#6366f1',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#6366f1',
                          mt: 1
                        }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.description}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {new Date(activity.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
