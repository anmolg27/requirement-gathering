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
} from '@mui/material';
import {
  Folder as ProjectIcon,
  Description as DocumentIcon,
  VideoCall as MeetingIcon,
  Chat as ChatIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your projects today.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ProjectIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {projects.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Projects
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {projects.filter(p => p.status === 'ACTIVE').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Projects
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DocumentIcon color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Documents
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MeetingIcon color="secondary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Meetings
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Projects */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Recent Projects
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => router.push('/projects/new')}
                >
                  New Project
                </Button>
              </Box>

              {projects.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ProjectIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No projects yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Create your first project to get started
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/projects/new')}
                  >
                    Create Project
                  </Button>
                </Box>
              ) : (
                <List>
                  {projects.slice(0, 5).map((project) => (
                    <ListItem
                      key={project.id}
                      button
                      onClick={() => router.push(`/projects/${project.id}`)}
                      sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 1 }}
                    >
                      <ListItemIcon>
                        <ProjectIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={project.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {project.description || 'No description'}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Chip
                                label={project.status}
                                size="small"
                                color={getStatusColor(project.status) as any}
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Client: {project.client}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {projects.length > 5 && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button onClick={() => router.push('/projects')}>
                    View All Projects
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Activities
              </Typography>

              {activities.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ChatIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    No recent activities
                  </Typography>
                </Box>
              ) : (
                <List>
                  {activities.slice(0, 5).map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={activity.description}
                        secondary={new Date(activity.createdAt).toLocaleDateString()}
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
