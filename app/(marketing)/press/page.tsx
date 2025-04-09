import { ArrowRight, Download, Mail } from 'lucide-react'
import Link from 'next/link'

const pressReleases = [
  {
    date: 'March 15, 2024',
    title: 'Innovation Bootcamp University Launches New AI & Machine Learning Program',
    excerpt: 'Responding to industry demand, Innovation Bootcamp University introduces a comprehensive program focused on artificial intelligence and machine learning.',
  },
  {
    date: 'February 1, 2024',
    title: 'Partnership Announcement with Leading Tech Companies',
    excerpt: 'Innovation Bootcamp University partners with top tech companies to provide enhanced career opportunities for graduates.',
  },
  {
    date: 'January 10, 2024',
    title: '2023 Student Success Report',
    excerpt: '95% of Innovation Bootcamp University graduates secured technical roles within 6 months of program completion.',
  },
]

const mediaResources = [
  {
    title: 'Brand Guidelines',
    description: 'Logos, color palette, and usage guidelines.',
    downloadUrl: '/downloads/brand-guidelines.pdf',
  },
  {
    title: 'Press Kit',
    description: 'Company information, facts, and high-resolution images.',
    downloadUrl: '/downloads/press-kit.zip',
  },
  {
    title: 'Media Assets',
    description: 'Photos of our campus, students, and events.',
    downloadUrl: '/downloads/media-assets.zip',
  },
]

const coverageHighlights = [
  {
    source: 'TechCrunch',
    title: 'Innovation Bootcamp University Revolutionizes Tech Education',
    date: 'March 2024',
    url: 'https://techcrunch.com',
  },
  {
    source: 'Forbes',
    title: "The Future of Tech Education: Innovation Bootcamp University's Approach",
    date: 'February 2024',
    url: 'https://forbes.com',
  },
  {
    source: 'EdTech Magazine',
    title: 'How Innovation Bootcamp University is Bridging the Tech Skills Gap',
    date: 'January 2024',
    url: 'https://edtechmagazine.com',
  },
]

export default function PressPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get the latest news and updates about Innovation Bootcamp University. For press inquiries, 
          please contact our media relations team.
        </p>
        <div className="mt-8">
          <Link
            href="mailto:press@innovationbootcamp.edu"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Press Team
          </Link>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
        <div className="space-y-8">
          {pressReleases.map((release) => (
            <div key={release.title} className="p-6 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-2">{release.date}</div>
              <h3 className="text-xl font-semibold mb-3">{release.title}</h3>
              <p className="text-muted-foreground mb-4">{release.excerpt}</p>
              <Link
                href={`/press/${release.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center text-primary hover:underline"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Media Coverage Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Media Coverage</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coverageHighlights.map((coverage) => (
            <a
              key={coverage.title}
              href={coverage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg border hover:border-primary transition-colors"
            >
              <div className="text-sm font-medium text-primary mb-2">
                {coverage.source}
              </div>
              <h3 className="text-lg font-semibold mb-2">{coverage.title}</h3>
              <div className="text-sm text-muted-foreground">{coverage.date}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Media Resources Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Media Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaResources.map((resource) => (
            <div key={resource.title} className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <a
                href={resource.downloadUrl}
                className="inline-flex items-center text-primary hover:underline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 