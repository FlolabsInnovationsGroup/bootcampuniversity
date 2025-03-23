export interface Partner {
    id: string;
    name: string;
    logo: string;
    type: 'university' | 'technology' | 'industry';
    description: string;
    website?: string;
    featured?: boolean;
    location?: string;
  }
  
  export const partners: Partner[] = [
    {
      id: 'tamucc',
      name: 'Texas A&M University-Corpus Christi',
      logo: '/images/partners/tamucc-logo.svg',
      type: 'university',
      description: 'A premier educational institution focused on innovation and hands-on learning. Our partnership provides students with real-world project opportunities and academic credit.',
      website: 'https://www.tamucc.edu/',
      featured: true,
      location: 'Corpus Christi, TX'
    },
    {
      id: 'acc',
      name: 'Austin Community College',
      logo: '/images/partners/acc-logo.svg',
      type: 'university',
      description: 'A leading community college with a strong focus on experiential learning and workforce development. Our collaboration bridges academic theory with practical skills development.',
      website: 'https://www.austincc.edu/',
      featured: true,
      location: 'Austin, TX'
    },
    {
      id: 'github',
      name: 'GitHub Education',
      logo: '/images/partners/github-logo.svg',
      type: 'technology',
      description: 'The world\'s leading software development platform. GitHub Education provides our students with industry-standard tools and learning resources for version control and collaboration.',
      website: 'https://education.github.com/',
      featured: true
    },
    {
      id: 'aws',
      name: 'AWS for Education',
      logo: '/images/partners/aws-logo.svg',
      type: 'technology',
      description: 'Amazon Web Services offers robust cloud computing education resources. Students gain hands-on experience with the same technologies powering millions of applications.',
      website: 'https://aws.amazon.com/education/',
      featured: true
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      logo: '/images/partners/huggingface-logo.svg',
      type: 'technology',
      description: 'The leading platform for state-of-the-art machine learning. Students access cutting-edge NLP models and educational resources through our partnership.',
      website: 'https://huggingface.co/',
      featured: true
    },
    {
      id: 'nvidia',
      name: 'NVIDIA Education',
      logo: '/images/partners/nvidia-logo.svg',
      type: 'technology',
      description: 'NVIDIA provides resources for AI and deep learning education, offering students access to world-class GPU technologies and training materials.',
      website: 'https://www.nvidia.com/en-us/training/',
      featured: true
    }
  ];
  
  export const getPartnersByType = (type: Partner['type']): Partner[] => {
    return partners.filter(partner => partner.type === type);
  };
  
  export const getFeaturedPartners = (): Partner[] => {
    return partners.filter(partner => partner.featured);
  };
  