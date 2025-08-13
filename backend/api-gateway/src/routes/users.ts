import { Router } from 'express';
import { prisma } from '../index';
import { getUserActivities } from '../services/activityService';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Get current user profile
router.get('/profile', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isVerified: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
}));

// Update user profile
router.put('/profile', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const { firstName, lastName } = req.body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: firstName || undefined,
      lastName: lastName || undefined
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isVerified: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    }
  });

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
}));

// Get user activities
router.get('/activities', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = parseInt(req.query.offset as string) || 0;

  const activities = await getUserActivities(userId, limit, offset);

  res.json({
    success: true,
    data: activities
  });
}));

// Get user projects
router.get('/projects', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { id: userId } } }
      ]
    },
    include: {
      owner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      members: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      _count: {
        select: {
          documents: true,
          meetings: true,
          conversations: true
        }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  res.json({
    success: true,
    data: projects
  });
}));

// Change password
router.put('/change-password', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required'
    });
  }

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Verify current password
  const bcrypt = require('bcryptjs');
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Hash new password
  const saltRounds = 12;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword }
  });

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
}));

// Delete account
router.delete('/account', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required to delete account'
    });
  }

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Verify password
  const bcrypt = require('bcryptjs');
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Password is incorrect'
    });
  }

  // Deactivate user instead of deleting (soft delete)
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false }
  });

  // Invalidate all sessions
  await prisma.session.updateMany({
    where: { userId },
    data: { isActive: false }
  });

  res.json({
    success: true,
    message: 'Account deactivated successfully'
  });
}));

export default router;
