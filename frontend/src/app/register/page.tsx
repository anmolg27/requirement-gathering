'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/RouteGuard';
import toast from 'react-hot-toast';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError('');
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success('Registration successful! Please check your email for verification.');
      
      // Redirect to intended page or dashboard
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RouteGuard>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          p: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 450,
            background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
            border: '1px solid #334155',
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              }}
            >
              <PersonAddIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join the Requirements Gathering Platform
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                {...register('firstName')}
                label="First Name"
                fullWidth
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={loading}
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
                {...register('lastName')}
                label="Last Name"
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={loading}
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
            </Box>

            <TextField
              {...register('email')}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
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
              {...register('password')}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
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
              {...register('confirmPassword')}
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              disabled={loading}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 4, 
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                }
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  underline="hover"
                  sx={{ 
                    color: '#6366f1',
                    '&:hover': { color: '#818cf8' }
                  }}
                >
                  Sign in
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link 
                  href="/" 
                  underline="hover"
                  sx={{ 
                    color: '#6366f1',
                    '&:hover': { color: '#818cf8' }
                  }}
                >
                  Back to Home
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </RouteGuard>
  );
}
