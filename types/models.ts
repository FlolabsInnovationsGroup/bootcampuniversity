import { Material, MaterialProgress as PrismaMaterialProgress, Course, User, Module } from '@prisma/client';
import { Prisma } from '@prisma/client';

export interface MaterialProgress extends PrismaMaterialProgress {
  id: string;
  userId: string;
  materialId: string;
  status: string;
  progress: number;
  notes: string | null;
  bookmarks: Prisma.JsonValue | null;
  lastPosition: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialProgressWithMaterial extends MaterialProgress {
  material: Material;
}

export interface CourseWithDetails extends Course {
  creator: User;
  materials: Material[];
  curriculum?: {
    sections: {
      id: string;
      title: string;
      modules: Module[];
    }[];
  };
}

export interface EnrollmentWithProgress {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  progress: number;
  enrolledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date | null;
  course: CourseWithDetails;
}

export type MaterialType = 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'ASSIGNMENT';

export interface ImportedMaterial {
  courseId: string;
  type: MaterialType;
  title: string;
  url: string;
  content?: string;
  order: number;
}

export interface ActivityLogData {
  userId: string;
  action: string;
  target?: string;
  metadata?: any;
  entityType?: string;
} 