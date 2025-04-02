export type UserRole = 'admin' | 'instructor' | 'student' | 'mentor';

export type Permission = 
  | 'view_dashboard'
  | 'manage_courses'
  | 'manage_content'
  | 'manage_users'
  | 'view_analytics'
  | 'manage_settings'
  | 'view_progress'
  | 'manage_enrollments'
  | 'view_courses'
  | 'submit_assignments'
  | 'participate_discussions'
  | 'view_certificates';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RolePermissions {
  [key: string]: Permission[];
}

export const rolePermissions: RolePermissions = {
  admin: [
    'view_dashboard',
    'manage_courses',
    'manage_content',
    'manage_users',
    'view_analytics',
    'manage_settings',
    'view_progress',
    'manage_enrollments'
  ],
  instructor: [
    'view_dashboard',
    'manage_courses',
    'manage_content',
    'view_analytics',
    'view_progress',
    'manage_enrollments'
  ],
  mentor: [
    'view_dashboard',
    'view_courses',
    'view_progress',
    'participate_discussions'
  ],
  student: [
    'view_dashboard',
    'view_courses',
    'submit_assignments',
    'participate_discussions',
    'view_certificates'
  ]
}; 