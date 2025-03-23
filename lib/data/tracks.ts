export interface Track {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    image: string;
    icon: string;
    color: 'blue' | 'indigo' | 'teal' | 'purple' | 'orange';
    featured?: boolean;
    skills: string[];
    careers: string[];
    technologies: Technology[];
  }
  
  export interface Technology {
    name: string;
    logo: string;
    description: string;
  }
  
  export const tracks: Track[] = [
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      slug: 'ai-ml',
      description: 'Build intelligent systems using modern machine learning frameworks and techniques.',
      longDescription: 'Dive into the cutting-edge world of artificial intelligence and machine learning. Learn to develop models that can analyze data, make predictions, and improve over time. From fundamental algorithms to advanced deep learning techniques, you\'ll build a comprehensive skill set that\'s in high demand across industries.',
      image: '/images/tracks/ai-ml.jpg',
      icon: '/images/tracks/ai-ml-icon.svg',
      color: 'blue',
      featured: true,
      skills: [
        'Machine Learning Fundamentals',
        'Neural Networks',
        'Deep Learning',
        'Natural Language Processing',
        'Computer Vision',
        'Reinforcement Learning',
        'MLOps & Deployment',
        'Data Preprocessing'
      ],
      careers: [
        'Machine Learning Engineer',
        'AI Research Scientist',
        'Data Scientist',
        'NLP Engineer',
        'Computer Vision Engineer'
      ],
      technologies: [
        {
          name: 'TensorFlow',
          logo: '/images/technologies/tensorflow.svg',
          description: 'An end-to-end open source platform for machine learning.'
        },
        {
          name: 'PyTorch',
          logo: '/images/technologies/pytorch.svg',
          description: 'An open source machine learning framework that accelerates the path from research to production.'
        },
        {
          name: 'Hugging Face',
          logo: '/images/technologies/huggingface.svg',
          description: 'The AI community building the future with state-of-the-art NLP models and datasets.'
        },
        {
          name: 'Scikit-learn',
          logo: '/images/technologies/scikit-learn.svg',
          description: 'Simple and efficient tools for predictive data analysis.'
        },
        {
          name: 'Pandas',
          logo: '/images/technologies/pandas.svg',
          description: 'A fast, powerful, flexible and easy to use open source data analysis and manipulation tool.'
        }
      ]
    },
    {
      id: 'robotics',
      title: 'Robotics & Automation',
      slug: 'robotics',
      description: 'Design, build, and program robots for real-world applications.',
      longDescription: 'Explore the exciting intersection of hardware and software in our Robotics & Automation track. Learn to design, build, and program robots that can sense, navigate, and interact with the world around them. You\'ll work with cutting-edge robotics platforms and gain hands-on experience with autonomous systems.',
      image: '/images/tracks/robotics.jpg',
      icon: '/images/tracks/robotics-icon.svg',
      color: 'indigo',
      featured: true,
      skills: [
        'Robotics Fundamentals',
        'Robot Operating System (ROS)',
        'Computer Vision for Robotics',
        'Sensor Integration',
        'Control Systems',
        'Motion Planning',
        'Autonomous Navigation',
        'Human-Robot Interaction'
      ],
      careers: [
        'Robotics Engineer',
        'Automation Engineer',
        'Robotics Software Developer',
        'Mechatronics Engineer',
        'Drone Specialist'
      ],
      technologies: [
        {
          name: 'ROS',
          logo: '/images/technologies/ros.svg',
          description: 'A flexible framework for writing robot software.'
        },
        {
          name: 'NVIDIA Isaac',
          logo: '/images/technologies/nvidia-isaac.svg',
          description: 'A platform for accelerated AI robotics.'
        },
        {
          name: 'Arduino',
          logo: '/images/technologies/arduino.svg',
          description: 'An open-source electronics platform based on easy-to-use hardware and software.'
        },
        {
          name: 'Raspberry Pi',
          logo: '/images/technologies/raspberry-pi.svg',
          description: 'A small and affordable computer that you can use to learn programming.'
        },
        {
          name: 'OpenCV',
          logo: '/images/technologies/opencv.svg',
          description: 'An open-source computer vision and machine learning software library.'
        }
      ]
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      slug: 'web-dev',
      description: 'Create modern, responsive web applications using the latest frameworks and technologies.',
      longDescription: 'Master the art of building dynamic, responsive web applications using modern frameworks and technologies. From front-end design to back-end architecture, you\'ll learn to create seamless user experiences and robust, scalable systems that power the modern internet.',
      image: '/images/tracks/web-dev.jpg',
      icon: '/images/tracks/web-dev-icon.svg',
      color: 'teal',
      skills: [
        'HTML/CSS',
        'JavaScript',
        'React',
        'Next.js',
        'Node.js',
        'Express',
        'Database Design',
        'RESTful APIs',
        'GraphQL',
        'Responsive Design'
      ],
      careers: [
        'Full-Stack Developer',
        'Front-End Developer',
        'Back-End Developer',
        'Web Application Architect',
        'DevOps Engineer'
      ],
      technologies: [
        {
          name: 'React',
          logo: '/images/technologies/react.svg',
          description: 'A JavaScript library for building user interfaces.'
        },
        {
          name: 'Next.js',
          logo: '/images/technologies/nextjs.svg',
          description: 'The React framework for production that enables static site generation and server-side rendering.'
        },
        {
          name: 'Node.js',
          logo: '/images/technologies/nodejs.svg',
          description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.'
        },
        {
          name: 'MongoDB',
          logo: '/images/technologies/mongodb.svg',
          description: 'A document database with the scalability and flexibility that you want.'
        },
        {
          name: 'AWS',
          logo: '/images/technologies/aws.svg',
          description: 'Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.'
        }
      ]
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      slug: 'mobile-dev',
      description: 'Build cross-platform mobile applications that deliver exceptional user experiences.',
      longDescription: 'Learn to create powerful, user-friendly mobile applications for iOS and Android platforms. Whether you\'re building with native tools or using cross-platform frameworks, you\'ll develop the skills to design, build, and deploy apps that users love.',
      image: '/images/tracks/mobile-dev.jpg',
      icon: '/images/tracks/mobile-dev-icon.svg',
      color: 'purple',
      skills: [
        'React Native',
        'Flutter',
        'Mobile UI/UX Design',
        'Native iOS Development',
        'Native Android Development',
        'Mobile Backend Development',
        'API Integration',
        'App Store Optimization'
      ],
      careers: [
        'Mobile App Developer',
        'iOS Developer',
        'Android Developer',
        'Cross-Platform Developer',
        'Mobile UX Designer'
      ],
      technologies: [
        {
          name: 'React Native',
          logo: '/images/technologies/react-native.svg',
          description: 'A framework for building native apps using React.'
        },
        {
            name: 'Flutter',
            logo: '/images/technologies/flutter.svg',
            description: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.'
          },
          {
            name: 'Swift',
            logo: '/images/technologies/swift.svg',
            description: 'A powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS.'
          },
          {
            name: 'Kotlin',
            logo: '/images/technologies/kotlin.svg',
            description: 'A modern programming language that makes developers happier, designed for Android development.'
          },
          {
            name: 'Firebase',
            logo: '/images/technologies/firebase.svg',
            description: 'Google\'s mobile platform that helps you quickly develop high-quality apps, grow your user base, and earn more money.'
          }
        ]
      },
      {
        id: 'data-science',
        title: 'Data Science & Analytics',
        slug: 'data-science',
        description: 'Transform raw data into actionable insights using statistical methods and visualization techniques.',
        longDescription: 'Become proficient in extracting meaningful insights from complex datasets. Learn to collect, analyze, and interpret data using statistical methods, machine learning, and visualization techniques to solve real-world problems and inform strategic decision-making.',
        image: '/images/tracks/data-science.jpg',
        icon: '/images/tracks/data-science-icon.svg',
        color: 'orange',
        skills: [
          'Data Analysis',
          'Statistical Methods',
          'Data Visualization',
          'Big Data Processing',
          'SQL & NoSQL Databases',
          'Predictive Modeling',
          'Business Intelligence',
          'Data Engineering'
        ],
        careers: [
          'Data Scientist',
          'Data Analyst',
          'Business Intelligence Analyst',
          'Data Engineer',
          'Quantitative Analyst'
        ],
        technologies: [
          {
            name: 'Python',
            logo: '/images/technologies/python.svg',
            description: 'A programming language that lets you work quickly and integrate systems more effectively.'
          },
          {
            name: 'R',
            logo: '/images/technologies/r-lang.svg',
            description: 'A language and environment for statistical computing and graphics.'
          },
          {
            name: 'Tableau',
            logo: '/images/technologies/tableau.svg',
            description: 'A visual analytics platform that helps people see and understand data.'
          },
          {
            name: 'SQL',
            logo: '/images/technologies/sql.svg',
            description: 'A standard language for storing, manipulating and retrieving data in databases.'
          },
          {
            name: 'Spark',
            logo: '/images/technologies/spark.svg',
            description: 'A unified analytics engine for large-scale data processing.'
          }
        ]
      }
    ];
    
    export const getTrackBySlug = (slug: string): Track | undefined => {
      return tracks.find(track => track.slug === slug);
    };
    
    export const getFeaturedTracks = (): Track[] => {
      return tracks.filter(track => track.featured);
    };
    