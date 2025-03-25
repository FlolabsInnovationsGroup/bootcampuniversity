export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'instructor';
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Application {
  id: string;
  userId: string;
  programId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  submittedAt: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  duration: string;
}

export type NavItem = {
  name: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}; 