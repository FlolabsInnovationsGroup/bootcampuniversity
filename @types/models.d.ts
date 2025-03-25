// User Models
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

// Program Models
export interface Program {
  id: string;
  title: string;
  description: string;
  slug: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

// Resource Models
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'ARTICLE' | 'VIDEO' | 'DOCUMENT' | 'LINK';
  url: string;
  programId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Opportunity Models
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'INTERNSHIP' | 'JOB' | 'FELLOWSHIP';
  status: 'OPEN' | 'CLOSED';
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Blog Models
export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author: User;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Common Types
export type Metadata = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
};

export type SocialLinks = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}; 