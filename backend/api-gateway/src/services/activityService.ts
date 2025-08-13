import { prisma } from '../index';
import { ActivityType } from '@prisma/client';

// Create activity log
export const createActivity = async (
  userId: string,
  type: ActivityType,
  description: string,
  metadata?: any
) => {
  try {
    await prisma.activity.create({
      data: {
        userId,
        type,
        description,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
    // Don't throw error to prevent main operation failure
  }
};

// Get user activities
export const getUserActivities = async (
  userId: string,
  limit: number = 50,
  offset: number = 0
) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        type: true,
        description: true,
        metadata: true,
        createdAt: true
      }
    });

    return activities.map(activity => ({
      ...activity,
      metadata: activity.metadata || null
    }));
  } catch (error) {
    console.error('Error getting user activities:', error);
    throw error;
  }
};

// Get project activities
export const getProjectActivities = async (
  projectId: string,
  limit: number = 50,
  offset: number = 0
) => {
  try {
    // Get all users in the project
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        owner: true,
        members: true
      }
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const userIds = [
      project.ownerId,
      ...project.members.map(member => member.id)
    ];

    const activities = await prisma.activity.findMany({
      where: {
        userId: { in: userIds }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    return activities.map(activity => ({
      ...activity,
      metadata: activity.metadata || null
    }));
  } catch (error) {
    console.error('Error getting project activities:', error);
    throw error;
  }
};

// Activity type helpers
export const ActivityTypes = {
  LOGIN: 'LOGIN' as ActivityType,
  LOGOUT: 'LOGOUT' as ActivityType,
  PROJECT_CREATED: 'PROJECT_CREATED' as ActivityType,
  PROJECT_UPDATED: 'PROJECT_UPDATED' as ActivityType,
  DOCUMENT_UPLOADED: 'DOCUMENT_UPLOADED' as ActivityType,
  MEETING_SCHEDULED: 'MEETING_SCHEDULED' as ActivityType,
  AI_QUERY: 'AI_QUERY' as ActivityType
};

// Common activity descriptions
export const ActivityDescriptions = {
  USER_REGISTERED: 'User registered successfully',
  USER_LOGGED_IN: 'User logged in successfully',
  USER_LOGGED_OUT: 'User logged out successfully',
  PROJECT_CREATED: (projectName: string) => `Project "${projectName}" created`,
  PROJECT_UPDATED: (projectName: string) => `Project "${projectName}" updated`,
  DOCUMENT_UPLOADED: (fileName: string) => `Document "${fileName}" uploaded`,
  MEETING_SCHEDULED: (meetingTopic: string) => `Meeting "${meetingTopic}" scheduled`,
  AI_QUERY: (queryType: string) => `AI ${queryType} query executed`
};
