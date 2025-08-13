import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// Basic health check
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'API Gateway',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Detailed health check with database connectivity
router.get('/detailed', async (req, res) => {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    
    // Get basic stats
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    const sessionCount = await prisma.session.count({
      where: { isActive: true }
    });

    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'API Gateway',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'connected',
        stats: {
          users: userCount,
          projects: projectCount,
          activeSessions: sessionCount
        }
      },
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external
      },
      uptime: process.uptime()
    });

  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      service: 'API Gateway',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
});

// Readiness check for Kubernetes
router.get('/ready', async (req, res) => {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: 'ready',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Readiness check error:', error);
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Liveness check for Kubernetes
router.get('/live', (req, res) => {
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
