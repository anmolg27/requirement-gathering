import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../index';
import { createActivity, ActivityTypes, ActivityDescriptions } from '../services/activityService';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Validation schemas
const createProjectValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Project name must be between 3 and 100 characters'),
  body('client')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Client name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('timeline')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Timeline must be less than 100 characters')
];

const updateProjectValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Project name must be between 3 and 100 characters'),
  body('client')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Client name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('timeline')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Timeline must be less than 100 characters')
];

// Get all projects for current user
router.get('/', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;
  const status = req.query.status as string;

  const whereClause: any = {
    OR: [
      { ownerId: userId },
      { members: { some: { id: userId } } }
    ]
  };

  if (status) {
    whereClause.status = status;
  }

  const projects = await prisma.project.findMany({
    where: whereClause,
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
    orderBy: { updatedAt: 'desc' },
    take: limit,
    skip: offset
  });

  const total = await prisma.project.count({
    where: whereClause
  });

  res.json({
    success: true,
    data: projects,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    }
  });
}));

// Get single project
router.get('/:id', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
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
      documents: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      meetings: {
        orderBy: { startTime: 'desc' },
        take: 10
      },
      conversations: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      _count: {
        select: {
          documents: true,
          meetings: true,
          conversations: true
        }
      }
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.json({
    success: true,
    data: project
  });
}));

// Create new project
router.post('/', createProjectValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const userId = req.user!.userId;
  const { name, client, description, timeline, memberEmails } = req.body;

  // Create project
  const project = await prisma.project.create({
    data: {
      name,
      client,
      description,
      timeline,
      ownerId: userId,
      members: memberEmails ? {
        connect: memberEmails.map((email: string) => ({ email }))
      } : undefined
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
      }
    }
  });

  // Create activity log
  await createActivity(
    userId,
    ActivityTypes.PROJECT_CREATED,
    ActivityDescriptions.PROJECT_CREATED(name)
  );

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project
  });
}));

// Update project
router.put('/:id', updateProjectValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const userId = req.user!.userId;
  const projectId = req.params.id;
  const { name, client, description, timeline, memberEmails } = req.body;

  // Check if user has access to project
  const existingProject = await prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: userId },
        { members: { some: { id: userId } } }
      ]
    }
  });

  if (!existingProject) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  // Update project
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      name: name || undefined,
      client: client || undefined,
      description: description || undefined,
      timeline: timeline || undefined,
      members: memberEmails ? {
        set: memberEmails.map((email: string) => ({ email }))
      } : undefined
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
      }
    }
  });

  // Create activity log
  await createActivity(
    userId,
    ActivityTypes.PROJECT_UPDATED,
    ActivityDescriptions.PROJECT_UPDATED(name || project.name)
  );

  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project
  });
}));

// Delete project
router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const projectId = req.params.id;

  // Check if user is project owner
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: userId
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found or you do not have permission to delete it'
    });
  }

  // Delete project (cascade will handle related records)
  await prisma.project.delete({
    where: { id: projectId }
  });

  // Create activity log
  await createActivity(
    userId,
    ActivityTypes.PROJECT_UPDATED,
    `Project "${project.name}" deleted`
  );

  res.json({
    success: true,
    message: 'Project deleted successfully'
  });
}));

// Add member to project
router.post('/:id/members', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const projectId = req.params.id;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  // Check if user has access to project
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: userId },
        { members: { some: { id: userId } } }
      ]
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  // Find user by email
  const userToAdd = await prisma.user.findUnique({
    where: { email }
  });

  if (!userToAdd) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Add member to project
  await prisma.project.update({
    where: { id: projectId },
    data: {
      members: {
        connect: { id: userToAdd.id }
      }
    }
  });

  res.json({
    success: true,
    message: 'Member added to project successfully'
  });
}));

// Remove member from project
router.delete('/:id/members/:memberId', asyncHandler(async (req, res) => {
  const userId = req.user!.userId;
  const projectId = req.params.id;
  const memberId = req.params.memberId;

  // Check if user is project owner
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: userId
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found or you do not have permission to remove members'
    });
  }

  // Remove member from project
  await prisma.project.update({
    where: { id: projectId },
    data: {
      members: {
        disconnect: { id: memberId }
      }
    }
  });

  res.json({
    success: true,
    message: 'Member removed from project successfully'
  });
}));

export default router;
