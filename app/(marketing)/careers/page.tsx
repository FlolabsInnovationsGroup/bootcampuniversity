import { ArrowRight, BookOpen, Code, Heart, Users } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Work with passionate educators and tech innovators in a supportive environment.',
  },
  {
    icon: BookOpen,
    title: 'Learning & Development',
    description: 'Access to continuous learning opportunities and professional development resources.',
  },
  {
    icon: Heart,
    title: 'Comprehensive Benefits',
    description: 'Competitive salary, health insurance, 401(k), and generous PTO.',
  },
  {
    icon: Code,
    title: 'Innovation Focus',
    description: 'Be at the forefront of educational technology and shape the future of learning.',
  },
]

const openings = [
  {
    title: 'Senior Curriculum Developer',
    department: 'Education',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    description: 'Design and develop cutting-edge curriculum for our web development and AI programs.',
  },
  {
    title: 'Student Success Coach',
    department: 'Student Services',
    location: 'San Francisco',
    type: 'Full-time',
    description: 'Guide and support students throughout their learning journey.',
  },
  {
    title: 'Technical Instructor - AI/ML',
    department: 'Education',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead live sessions and mentor students in our AI/ML program.',
  },
  {
    title: 'Partnership Manager',
    department: 'Business Development',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    description: 'Build and maintain relationships with industry partners and employers.',
  },
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Help us transform tech education and empower the next generation of innovators. 
          We're looking for passionate individuals who share our vision.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center p-6 rounded-lg border">
              <benefit.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Openings */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
        <div className="space-y-6">
          {openings.map((job) => (
            <div key={job.title} className="p-6 rounded-lg border">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                  <p className="text-muted-foreground">
                    {job.department} · {job.location} · {job.type}
                  </p>
                </div>
                <Link
                  href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-4 py-2 mt-4 md:mt-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <p className="text-muted-foreground">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* No Positions Section */}
      <section className="text-center bg-muted/50 rounded-lg p-8 mb-20">
        <h2 className="text-2xl font-bold mb-4">Don't See the Right Position?</h2>
        <p className="text-muted-foreground mb-6">
          We're always looking for talented individuals to join our team. 
          Send us your resume and we'll keep you in mind for future opportunities.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent"
        >
          Get in Touch
        </Link>
      </section>

      {/* Values Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Our Values</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We believe in fostering a diverse, inclusive, and collaborative environment 
          where everyone can thrive and make a meaningful impact.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent"
        >
          Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  )
} 