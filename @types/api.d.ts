import { User, Program, Resource, Opportunity, Post } from './models';

// Generic API Types
export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  message?: string;
  status: number;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

export type ApiError = {
  message: string;
  code: string;
  status: number;
  details?: Record<string, any>;
};

// Auth Types
export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

// Program Types
export type CreateProgramRequest = Omit<Program, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProgramRequest = Partial<CreateProgramRequest>;
export type ProgramResponse = ApiResponse<Program>;
export type ProgramsResponse = PaginatedResponse<Program>;

// Resource Types
export type CreateResourceRequest = Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateResourceRequest = Partial<CreateResourceRequest>;
export type ResourceResponse = ApiResponse<Resource>;
export type ResourcesResponse = PaginatedResponse<Resource>;

// Opportunity Types
export type CreateOpportunityRequest = Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateOpportunityRequest = Partial<CreateOpportunityRequest>;
export type OpportunityResponse = ApiResponse<Opportunity>;
export type OpportunitiesResponse = PaginatedResponse<Opportunity>;

// Blog Types
export type CreatePostRequest = Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'publishedAt'>;
export type UpdatePostRequest = Partial<CreatePostRequest>;
export type PostResponse = ApiResponse<Post>;
export type PostsResponse = PaginatedResponse<Post>; 