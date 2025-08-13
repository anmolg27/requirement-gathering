'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Avatar,
  LinearProgress,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Folder as ProjectIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projectApi, Project } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  client: z.string().min(1, 'Client name is required'),
  timeline: z.string().optional(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ARCHIVED', 'CANCELLED']),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getAll();
      if (response.success) {
        setProjects(response.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      const response = await projectApi.create(data);
      if (response.success) {
        toast.success('Project created successfully!');
        setDialogOpen(false);
        reset();
        fetchProjects();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create project');
    }
  };

  const handleEditProject = async (data: ProjectFormData) => {
    if (!editingProject) return;
    
    try {
      const response = await projectApi.update(editingProject.id, data);
      if (response.success) {
        toast.success('Project updated successfully!');
        setDialogOpen(false);
        setEditingProject(null);
        reset();
        fetchProjects();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update project');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await projectApi.delete(projectId);
      if (response.success) {
        toast.success('Project deleted successfully!');
        fetchProjects();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project');
    }
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    reset();
    setDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    reset({
      name: project.name,
      description: project.description || '',
      client: project.client,
      timeline: project.timeline || '',
      status: project.status,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingProject(null);
    reset();
  };

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              Projects
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Manage your requirements gathering projects
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreateDialog}
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              }
            }}
          >
            New Project
          </Button>
        </Box>

        {/* Stats Summary */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<ProjectIcon />} 
            label={`${projects.length} Total Projects`}
            sx={{ 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#6366f1'
            }}
          />
          <Chip 
            icon={<CheckCircleIcon />} 
            label={`${projects.filter(p => p.status === 'ACTIVE').length} Active`}
            sx={{ 
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981'
            }}
          />
          <Chip 
            icon={<StarIcon />} 
            label={`${projects.filter(p => p.status === 'COMPLETED').length} Completed`}
            sx={{ 
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#3b82f6'
            }}
          />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {projects.length === 0 ? (
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
          border: '1px solid #334155'
        }}>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
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
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              No projects yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
              Create your first project to start gathering requirements and managing client deliverables
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openCreateDialog}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                }
              }}
            >
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <Card sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                border: '1px solid #334155',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                  borderColor: '#6366f1',
                }
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        mr: 2
                      }}>
                        <ProjectIcon sx={{ fontSize: 24, color: '#6366f1' }} />
                      </Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flex: 1 }}>
                        {project.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {getStatusIcon(project.status)}
                      <Tooltip title="More options">
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                    {project.description || 'No description available'}
                  </Typography>

                  {/* Status and Progress */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Chip
                        label={project.status}
                        size="small"
                        color={getStatusColor(project.status) as any}
                        sx={{ fontWeight: 600 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Progress
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.status === 'COMPLETED' ? 100 : project.status === 'ACTIVE' ? 65 : 25}
                      sx={{ 
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

                  {/* Project Details */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Client:</strong> {project.client}
                      </Typography>
                    </Box>
                    {project.timeline && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Timeline:</strong> {project.timeline}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        width: 20, 
                        height: 20, 
                        mr: 1,
                        fontSize: '0.75rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
                      }}>
                        {project.owner.firstName?.charAt(0)}{project.owner.lastName?.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Owner:</strong> {project.owner.firstName} {project.owner.lastName}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ borderColor: '#334155', mb: 2 }} />

                  {/* Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => router.push(`/projects/${project.id}`)}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: '#6366f1',
                        color: '#6366f1',
                        '&:hover': {
                          background: 'rgba(99, 102, 241, 0.1)',
                          borderColor: '#818cf8',
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Edit project">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(project);
                          }}
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: '#6366f1' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete project">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: '#ef4444' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create/Edit Project Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={closeDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid #334155',
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid #334155',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(editingProject ? handleEditProject : handleCreateProject)}>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              {...register('name')}
              label="Project Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputBase-input': { color: 'text.primary' },
              }}
            />
            <TextField
              {...register('description')}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputBase-input': { color: 'text.primary' },
              }}
            />
            <TextField
              {...register('client')}
              label="Client"
              fullWidth
              margin="normal"
              error={!!errors.client}
              helperText={errors.client?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputBase-input': { color: 'text.primary' },
              }}
            />
            <TextField
              {...register('timeline')}
              label="Timeline"
              fullWidth
              margin="normal"
              placeholder="e.g., 6 months"
              error={!!errors.timeline}
              helperText={errors.timeline?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputBase-input': { color: 'text.primary' },
              }}
            />
            <TextField
              {...register('status')}
              label="Status"
              fullWidth
              margin="normal"
              select
              error={!!errors.status}
              helperText={errors.status?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputBase-input': { color: 'text.primary' },
              }}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="ARCHIVED">Archived</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: '1px solid #334155' }}>
            <Button 
              onClick={closeDialog}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { background: 'rgba(99, 102, 241, 0.1)' }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ 
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                }
              }}
            >
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
