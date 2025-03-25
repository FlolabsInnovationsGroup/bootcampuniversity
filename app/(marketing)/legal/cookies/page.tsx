const cookieTypes = [
  {
    type: 'Essential Cookies',
    description: 'Required for basic site functionality and security. Cannot be disabled.',
    examples: [
      'Session cookies for authentication',
      'CSRF tokens for security',
      'Load balancing cookies',
    ],
  },
  {
    type: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
    examples: [
      'Language preferences',
      'Theme preferences',
      'Last visited pages',
    ],
  },
  {
    type: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website.',
    examples: [
      'Pages visited',
      'Time spent on site',
      'Error encounters',
    ],
  },
  {
    type: 'Marketing Cookies',
    description: 'Used to track visitors across websites for marketing purposes.',
    examples: [
      'Ad targeting',
      'Social media sharing',
      'Campaign effectiveness',
    ],
  },
]

export default function CookiesPage() {
  return (
    <div className="prose prose-slate dark:prose-invert">
      <h1>Cookie Policy</h1>
      <p className="lead">
        Last updated: March 24, 2024
      </p>

      <section>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit 
          our website. They help us provide you with a better experience by remembering 
          your preferences, analyzing site usage, and assisting with navigation.
        </p>
      </section>

      <section>
        <h2>How We Use Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our 
          website and store certain information. This helps us deliver a better and 
          more personalized service.
        </p>
      </section>

      <section>
        <h2>Types of Cookies We Use</h2>
        <div className="space-y-8">
          {cookieTypes.map((cookie) => (
            <div key={cookie.type} className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-3">{cookie.type}</h3>
              <p className="mb-4">{cookie.description}</p>
              <div className="pl-4 border-l-2">
                <p className="font-medium mb-2">Examples:</p>
                <ul>
                  {cookie.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Managing Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings. You can:
        </p>
        <ul>
          <li>View cookies stored on your device</li>
          <li>Allow or block cookies</li>
          <li>Delete existing cookies</li>
          <li>Set preferences for certain websites</li>
        </ul>
        <p>
          Please note that disabling certain cookies may limit your ability to use some 
          features of our website.
        </p>
      </section>

      <section>
        <h2>Third-Party Cookies</h2>
        <p>
          Some cookies are placed by third-party services that appear on our pages. 
          We do not control these third-party cookies. You can learn more about these 
          cookies and how to manage them by visiting the respective privacy policies 
          of these third parties.
        </p>
      </section>

      <section>
        <h2>Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. We will notify you of 
          any changes by posting the new policy on this page and updating the "Last 
          updated" date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions about our Cookie Policy, please contact us at{' '}
          <a href="mailto:privacy@innovationbootcamp.edu" className="text-primary hover:underline">
            privacy@innovationbootcamp.edu
          </a>
          .
        </p>
      </section>
    </div>
  )
} 