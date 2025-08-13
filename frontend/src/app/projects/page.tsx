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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateDialog}
        >
          New Project
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {projects.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first project to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openCreateDialog}
            >
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
                      {project.name}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openEditDialog(project)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProject(project.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description || 'No description'}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={project.status}
                      size="small"
                      color={getStatusColor(project.status) as any}
                      sx={{ mr: 1 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Client:</strong> {project.client}
                  </Typography>
                  {project.timeline && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Timeline:</strong> {project.timeline}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Owner:</strong> {project.owner.firstName} {project.owner.lastName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create/Edit Project Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <form onSubmit={handleSubmit(editingProject ? handleEditProject : handleCreateProject)}>
          <DialogContent>
            <TextField
              {...register('name')}
              label="Project Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
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
            />
            <TextField
              {...register('client')}
              label="Client"
              fullWidth
              margin="normal"
              error={!!errors.client}
              helperText={errors.client?.message}
            />
            <TextField
              {...register('timeline')}
              label="Timeline"
              fullWidth
              margin="normal"
              placeholder="e.g., 6 months"
              error={!!errors.timeline}
              helperText={errors.timeline?.message}
            />
            <TextField
              {...register('status')}
              label="Status"
              fullWidth
              margin="normal"
              select
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="ARCHIVED">Archived</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
