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
import { Lock as LockIcon } from '@mui/icons-material';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError('');
      await login(data.email, data.password);
      toast.success('Login successful!');
      
      // Redirect to intended page or dashboard
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      toast.error(err.message || 'Login failed');
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
            maxWidth: 400,
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
              <LockIcon sx={{ fontSize: 32 }} />
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
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your Requirements Gathering Platform account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
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
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  underline="hover"
                  sx={{ 
                    color: '#6366f1',
                    '&:hover': { color: '#818cf8' }
                  }}
                >
                  Sign up
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <Link 
                  href="/forgot-password" 
                  underline="hover"
                  sx={{ 
                    color: '#6366f1',
                    '&:hover': { color: '#818cf8' }
                  }}
                >
                  Forgot your password?
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
