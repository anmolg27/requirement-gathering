'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requireAuth = false, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading) {
      // If route requires auth and user is not authenticated
      if (requireAuth && !isAuthenticated) {
        const redirectUrl = new URL(redirectTo, window.location.origin);
        redirectUrl.searchParams.set('redirect', pathname);
        router.push(redirectUrl.toString());
        return;
      }

      // If user is authenticated and trying to access auth pages
      if (isAuthenticated && ['/login', '/register'].includes(pathname)) {
        const intendedPath = searchParams.get('redirect') || '/dashboard';
        router.push(intendedPath);
        return;
      }
    }
  }, [isAuthenticated, loading, requireAuth, redirectTo, router, pathname, searchParams]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If route requires auth and user is not authenticated, don't render
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If user is authenticated and trying to access auth pages, don't render
  if (isAuthenticated && ['/login', '/register'].includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};
