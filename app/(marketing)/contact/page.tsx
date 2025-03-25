import { Mail, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'hello@innovationbootcamp.edu',
    description: 'For general inquiries and support',
  },
  {
    icon: Phone,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    description: 'Monday to Friday, 9am to 6pm EST',
  },
  {
    icon: MapPin,
    title: 'Location',
    details: 'San Francisco, CA',
    description: 'Main Campus & Innovation Hub',
  },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about our programs or want to explore partnership opportunities? 
          We'd love to hear from you.
        </p>
      </section>

      {/* Contact Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {contactInfo.map((item) => (
          <div key={item.title} className="text-center p-6 rounded-lg border">
            <item.icon className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="font-medium mb-2">{item.details}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a subject</option>
              <option value="programs">Programs Inquiry</option>
              <option value="partnership">Partnership Opportunities</option>
              <option value="careers">Careers</option>
              <option value="support">Technical Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
} 