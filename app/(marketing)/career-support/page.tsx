import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users, LineChart } from 'lucide-react'
import Link from 'next/link'

const careerServices = [
  {
    icon: GraduationCap,
    title: 'Career Coaching',
    description: 'One-on-one guidance from experienced tech industry professionals to help you navigate your career path.',
  },
  {
    icon: Briefcase,
    title: 'Job Search Strategy',
    description: 'Personalized job search planning, interview preparation, and salary negotiation support.',
  },
  {
    icon: Users,
    title: 'Industry Network',
    description: 'Access to our network of hiring partners and alumni working at leading tech companies.',
  },
  {
    icon: LineChart,
    title: 'Career Tracking',
    description: 'Ongoing support and progress tracking to ensure you reach your career goals.',
  },
]

const resources = [
  {
    title: 'Resume Building',
    items: [
      'Professional resume review and optimization',
      'Portfolio development guidance',
      'LinkedIn profile enhancement',
      'Personal branding workshops',
    ],
  },
  {
    title: 'Interview Preparation',
    items: [
      'Technical interview practice',
      'Behavioral interview coaching',
      'Mock interviews with industry professionals',
      'Interview feedback and improvement plans',
    ],
  },
  {
    title: 'Job Search Support',
    items: [
      'Access to exclusive job boards',
      'Referrals to partner companies',
      'Application strategy sessions',
      'Salary negotiation coaching',
    ],
  },
  {
    title: 'Long-term Success',
    items: [
      'Career development planning',
      'Professional skill workshops',
      'Industry mentorship matching',
      'Networking event access',
    ],
  },
]

const successMetrics = [
  {
    metric: '95%',
    label: 'Employment Rate',
    description: 'Of our graduates secure technical roles within 6 months',
  },
  {
    metric: '45+',
    label: 'Hiring Partners',
    description: 'Active companies hiring from our talent pool',
  },
  {
    metric: '$85K',
    label: 'Average Starting Salary',
    description: 'For our graduates in their first tech role',
  },
  {
    metric: '92%',
    label: 'Career Satisfaction',
    description: 'Of graduates report high job satisfaction',
  },
]

export default function CareerSupportPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">Career Support</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're committed to your success beyond graduation. Our comprehensive career 
          support services are designed to help you launch and grow your tech career.
        </p>
      </section>

      {/* Success Metrics */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {successMetrics.map((item) => (
            <div key={item.label} className="text-center p-6 rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">{item.metric}</div>
              <div className="font-semibold mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career Services */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Career Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careerServices.map((service) => (
            <div key={service.title} className="text-center p-6 rounded-lg border">
              <service.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career Resources */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Career Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <div key={resource.title} className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
              <ul className="space-y-3">
                {resource.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-6">Hiring Partners</h2>
        <p className="text-center text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          We partner with leading tech companies to provide our graduates with 
          exclusive job opportunities and direct access to hiring managers.
        </p>
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Become a Hiring Partner <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Alumni Success */}
      <section className="text-center bg-muted/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Alumni Success Stories</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Read about how our graduates have successfully transitioned into rewarding 
          tech careers and the impact of our career support services.
        </p>
        <Link
          href="/success-stories"
          className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent"
        >
          Read Success Stories <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  )
} 