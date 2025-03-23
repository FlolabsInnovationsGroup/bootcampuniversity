export interface Module {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    resources: Resource[];
  }
  
  export interface Resource {
    title: string;
    type: 'video' | 'article' | 'exercise' | 'project';
    url: string;
    duration?: string;
    provider?: string;
  }
  
  export interface ExternalResource {
    id: string;
    title: string;
    provider: string;
    description: string;
    image: string;
    url: string;
    badgeText?: string;
  }
  
  // Sample curriculum for AI & ML track
  export const aiMlCurriculum = {
    tier1: [
      {
        id: 'ai-ml-fundamentals',
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to core ML concepts, algorithms, and workflows.',
        duration: '4 weeks',
        level: 'beginner',
        resources: [
          {
            title: 'Introduction to Machine Learning',
            type: 'video',
            url: 'https://www.github.com/education/intro-to-ml',
            duration: '2 hours',
            provider: 'GitHub Education'
          },
          {
            title: 'Supervised Learning Algorithms',
            type: 'article',
            url: 'https://www.github.com/education/supervised-learning',
            duration: '45 min',
            provider: 'GitHub Education'
          },
          {
            title: 'Build Your First ML Model',
            type: 'exercise',
            url: 'https://www.github.com/education/first-ml-model',
            duration: '3 hours',
            provider: 'GitHub Education'
          }
        ]
      },
      {
        id: 'python-for-ai',
        title: 'Python for AI Development',
        description: 'Essential Python libraries and techniques for AI development.',
        duration: '3 weeks',
        level: 'beginner',
        resources: [
          {
            title: 'Python Fundamentals for Data Science',
            type: 'video',
            url: 'https://www.github.com/education/python-for-data-science',
            duration: '4 hours',
            provider: 'GitHub Education'
          },
          {
            title: 'NumPy and Pandas for Data Manipulation',
            type: 'article',
            url: 'https://www.github.com/education/numpy-pandas',
            duration: '1 hour',
            provider: 'GitHub Education'
          },
          {
            title: 'Data Analysis Project',
            type: 'project',
            url: 'https://www.github.com/education/data-analysis-project',
            duration: '8 hours',
            provider: 'GitHub Education'
          }
        ]
      }
    ],
    tier2: [
      {
        id: 'deep-learning',
        title: 'Deep Learning Fundamentals',
        description: 'Neural networks, backpropagation, and building deep learning models.',
        duration: '6 weeks',
        level: 'intermediate',
        resources: [
          {
            title: 'Neural Networks Explained',
            type: 'video',
            url: 'https://www.github.com/education/neural-networks',
            duration: '3 hours',
            provider: 'GitHub Education'
          },
          {
            title: 'Building Neural Networks with TensorFlow',
            type: 'exercise',
            url: 'https://www.github.com/education/tensorflow-basics',
            duration: '5 hours',
            provider: 'GitHub Education'
          },
          {
            title: 'Image Classification Project',
            type: 'project',
            url: 'https://www.github.com/education/image-classification',
            duration: '10 hours',
            provider: 'GitHub Education'
          }
        ]
      }
    ],
    tier3: [
      {
        id: 'advanced-ai',
        title: 'Advanced AI Techniques',
        description: 'Cutting-edge AI methods including transformers and generative models.',
        duration: '8 weeks',
        level: 'advanced',
        resources: [
          {
            title: 'Introduction to Transformer Models',
            type: 'video',
            url: 'https://www.huggingface.co/course/transformers',
            duration: '4 hours',
            provider: 'Hugging Face'
          },
          {
            title: 'Building a GPT Model from Scratch',
            type: 'exercise',
            url: 'https://www.huggingface.co/course/gpt-from-scratch',
            duration: '12 hours',
            provider: 'Hugging Face'
          },
          {
            title: 'Advanced NLP Project',
            type: 'project',
            url: 'https://www.huggingface.co/course/advanced-nlp-project',
            duration: '20 hours',
            provider: 'Hugging Face'
          }
        ]
      }
    ]
  };
  
  // External learning platforms
  export const externalResources: ExternalResource[] = [
    {
      id: 'github-education',
      title: 'GitHub Skills',
      provider: 'GitHub',
      description: 'Interactive courses to learn GitHub and popular programming concepts through hands-on exercises.',
      image: '/images/external/github-education.jpg',
      url: 'https://skills.github.com/',
      badgeText: 'FREE'
    },
    {
      id: 'aws-education',
      title: 'AWS Educate',
      provider: 'Amazon Web Services',
      description: 'Access to AWS cloud computing resources and training for students and educators.',
      image: '/images/external/aws-education.jpg',
      url: 'https://aws.amazon.com/education/awseducate/',
      badgeText: 'FREE'
    },
    {
      id: 'huggingface-courses',
      title: 'Hugging Face NLP Course',
      provider: 'Hugging Face',
      description: 'A free course about natural language processing with transformers and deep learning.',
      image: '/images/external/huggingface-courses.jpg',
      url: 'https://huggingface.co/course/chapter1/1',
      badgeText: 'FREE'
    },
    {
      id: 'google-ml',
      title: 'Machine Learning Crash Course',
      provider: 'Google',
      description: 'Google\'s fast-paced, practical introduction to machine learning fundamentals.',
      image: '/images/external/google-ml.jpg',
      url: 'https://developers.google.com/machine-learning/crash-course',
      badgeText: 'FREE'
    },
    {
      id: 'nvidia-edu',
      title: 'NVIDIA Deep Learning Institute',
      provider: 'NVIDIA',
      description: 'Hands-on training in AI, accelerated computing, and accelerated data science.',
      image: '/images/external/nvidia-edu.jpg',
      url: 'https://www.nvidia.com/en-us/training/',
    }
  ];
  
