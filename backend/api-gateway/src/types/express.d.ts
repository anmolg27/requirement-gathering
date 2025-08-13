import { Request } from 'express';
import { User, Project } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      project?: Project;
    }
  }
}
