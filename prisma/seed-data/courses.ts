// Sample course data for seeding the database
export const courses = [
  {
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript. This course covers everything you need to build your first website.',
    category: 'programming',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1200&auto=format&fit=crop',
    duration: 1200, // 20 hours
    materials: [
      {
        title: 'Getting Started with HTML',
        description: 'Learn the basics of HTML structure and syntax',
        type: 'text',
        content: '# Introduction to HTML\n\nHTML (HyperText Markup Language) is the standard markup language for creating web pages. It defines the structure and content of your web pages.',
        duration: 30,
        order: 1,
      },
      {
        title: 'CSS Fundamentals',
        description: 'Style your HTML with CSS',
        type: 'text',
        content: '# CSS Basics\n\nCSS (Cascading Style Sheets) is used to style HTML elements. It controls the layout, colors, fonts, and more.',
        duration: 45,
        order: 2,
      },
      {
        title: 'JavaScript Basics',
        description: 'Add interactivity with JavaScript',
        type: 'text',
        content: '# JavaScript Introduction\n\nJavaScript is a programming language that enables interactive web pages. It runs on the client side of the web.',
        duration: 60,
        order: 3,
      },
    ],
  },
  {
    title: 'Data Science Fundamentals',
    description: 'An introduction to data science concepts, including data analysis, visualization, and machine learning basics.',
    category: 'data',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    duration: 900, // 15 hours
    materials: [
      {
        title: 'Introduction to Data Analysis',
        description: 'Learn about data collection and cleaning',
        type: 'text',
        content: '# Data Analysis Basics\n\nData analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information.',
        duration: 45,
        order: 1,
      },
      {
        title: 'Data Visualization Techniques',
        description: 'Represent data visually using charts and graphs',
        type: 'text',
        content: '# Data Visualization\n\nData visualization is the graphical representation of information and data using visual elements like charts, graphs, and maps.',
        duration: 60,
        order: 2,
      },
      {
        title: 'Introduction to Machine Learning',
        description: 'Basic concepts of machine learning and AI',
        type: 'text',
        content: '# Machine Learning Basics\n\nMachine learning is a method of data analysis that automates analytical model building and allows computers to learn from data.',
        duration: 75,
        order: 3,
      },
    ],
  },
  {
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design, including principles, tools, and best practices.',
    category: 'design',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop',
    duration: 840, // 14 hours
    materials: [
      {
        title: 'Design Thinking Process',
        description: 'Understanding the design thinking methodology',
        type: 'text',
        content: '# Design Thinking\n\nDesign thinking is a non-linear, iterative process that teams use to understand users, challenge assumptions, redefine problems, and create innovative solutions.',
        duration: 50,
        order: 1,
      },
      {
        title: 'User Research Methods',
        description: 'Techniques for gathering user insights',
        type: 'text',
        content: '# User Research\n\nUser research focuses on understanding user behaviors, needs, and motivations through observation, task analysis, and other feedback methodologies.',
        duration: 60,
        order: 2,
      },
      {
        title: 'Prototyping and Wireframing',
        description: 'Creating mockups and interactive prototypes',
        type: 'text',
        content: '# Prototyping\n\nPrototyping is the process of building a model of a product that designers can test with users before development.',
        duration: 70,
        order: 3,
      },
    ],
  },
];
