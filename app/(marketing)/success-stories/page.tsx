import { ArrowRight, Building, Code, Briefcase } from 'lucide-react'
import Link from 'next/link'

const featuredStories = [
  {
    name: 'Sarah Chen',
    image: '/alumni/sarah-chen.jpg',
    role: 'Software Engineer',
    company: 'Google',
    program: 'Web Development',
    year: '2023',
    quote: "The career support team helped me transform my background in marketing into a successful tech career. Their guidance in interview preparation and networking was invaluable.",
    outcome: 'Secured a role at Google with a 120% salary increase',
  },
  {
    name: 'Michael Rodriguez',
    image: '/alumni/michael-rodriguez.jpg',
    role: 'ML Engineer',
    company: 'OpenAI',
    program: 'AI & Machine Learning',
    year: '2023',
    quote: "The hands-on projects and industry mentorship gave me the practical experience I needed to break into AI. The career team's connections helped me land my dream job.",
    outcome: 'Transitioned from data analyst to ML engineer',
  },
  {
    name: 'Emily Johnson',
    image: '/alumni/emily-johnson.jpg',
    role: 'Robotics Engineer',
    company: 'Boston Dynamics',
    program: 'Robotics',
    year: '2023',
    quote: "The robotics program provided the perfect blend of theory and practical application. The career support helped me showcase my projects to potential employers.",
    outcome: 'Leading robotics projects at Boston Dynamics',
  },
]

const impactMetrics = [
  {
    metric: '2,500+',
    label: 'Graduates',
    description: 'Successfully transitioned to tech careers',
  },
  {
    metric: '85%',
    label: 'Career Changes',
    description: 'From non-technical backgrounds',
  },
  {
    metric: '150%',
    label: 'Average Salary Increase',
    description: 'Post-program completion',
  },
  {
    metric: '96%',
    label: 'Would Recommend',
    description: 'To friends and colleagues',
  },
]

const companies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Apple',
  'OpenAI',
  'Tesla',
  'Stripe',
  'Boston Dynamics',
  'SpaceX',
  'Adobe',
  'Intel',
]

export default function SuccessStoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">Success Stories</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet our alumni who have successfully transitioned into rewarding tech careers. 
          Their stories showcase the transformative power of our programs and career support.
        </p>
      </section>

      {/* Impact Metrics */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactMetrics.map((item) => (
            <div key={item.label} className="text-center p-6 rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">{item.metric}</div>
              <div className="font-semibold mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stories */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Alumni Stories</h2>
        <div className="space-y-12">
          {featuredStories.map((story, index) => (
            <div
              key={story.name}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Code className="h-4 w-4" />
                  <span>{story.program}</span>
                  <span>•</span>
                  <span>Class of {story.year}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{story.name}</h3>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Briefcase className="h-4 w-4" />
                  <span>{story.role}</span>
                  <span>•</span>
                  <Building className="h-4 w-4" />
                  <span>{story.company}</span>
                </div>
                <blockquote className="text-lg text-muted-foreground mb-4">
                  "{story.quote}"
                </blockquote>
                <p className="font-medium text-primary">{story.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Companies Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-6">Where Our Graduates Work</h2>
        <p className="text-center text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Our alumni have gone on to work at some of the world's most innovative companies.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {companies.map((company) => (
            <div
              key={company}
              className="h-20 flex items-center justify-center p-4 rounded-lg border"
            >
              <span className="text-lg font-semibold text-muted-foreground">
                {company}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-muted/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Start Your Success Story</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our community of successful graduates and launch your career in tech. 
          Explore our programs and comprehensive career support services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/programs"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/career-support"
            className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent"
          >
            Career Support <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
} 