export interface Advisor {
    id: string;
    name: string;
    title: string;
    organization: string;
    bio: string;
    image: string;
    links?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
    featured?: boolean;
  }
  
  export const advisors: Advisor[] = [
    {
      id: 'sam-greer',
      name: 'Sam Greer',
      title: 'Head of Experiential Learning',
      organization: 'Austin Community College',
      bio: 'Sam leads experiential learning initiatives at Austin Community College, where he reports directly to the provost. With extensive experience in educational innovation, Sam focuses on creating opportunities for students to gain practical skills through hands-on learning experiences.',
      image: '/images/team/sam-greer.jpg',
      links: {
        linkedin: 'https://www.linkedin.com/in/samgreer/'
      },
      featured: true
    },
    {
      id: 'admiral-inman',
      name: 'Admiral Inman',
      title: 'Former Director',
      organization: 'National Security Agency',
      bio: 'Admiral Inman brings decades of leadership experience from his distinguished career in government and intelligence. His strategic insights and extensive network help guide our program development and institutional partnerships.',
      image: '/images/team/admiral-inm an.jpg',
      links: {
        linkedin: 'https://www.linkedin.com/in/admiralinman/'
      },
      featured: true
    },
    {
      id: 'nick-athanasiou',
      name: 'Nick Athanasiou',
      title: 'Education Technology Consultant',
      organization: 'Educational Innovations Inc.',
      bio: 'Nick specializes in educational technology implementation and innovation. His expertise in blending theoretical education with practical application helps shape our curriculum and teaching methodologies.',
      image: '/images/team/nick-athanasiou.jpg',
      links: {
        linkedin: 'https://www.linkedin.com/in/nickathanasiou/'
      },
      featured: true
    }
  ];
  
  export const getFeaturedAdvisors = (): Advisor[] => {
    return advisors.filter(advisor => advisor.featured);
  };