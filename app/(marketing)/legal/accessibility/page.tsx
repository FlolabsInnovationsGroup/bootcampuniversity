export default function AccessibilityPage() {
  return (
    <article className="prose prose-slate dark:prose-invert mx-auto max-w-4xl p-6 lg:p-8">
      <h1>Accessibility Statement</h1>
      <p className="lead">
        Innovation Bootcamp University is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
      </p>

      <section>
        <h2>Our Commitment</h2>
        <p>
          We strive to ensure that our website and all digital content are accessible to everyone, regardless of ability or technology. Our goal is to meet WCAG 2.1 Level AA standards for web accessibility.
        </p>
      </section>

      <section>
        <h2>Accessibility Features</h2>
        <ul>
          <li>Semantic HTML to ensure proper structure and navigation</li>
          <li>ARIA landmarks and labels where appropriate</li>
          <li>Sufficient color contrast ratios</li>
          <li>Keyboard navigation support</li>
          <li>Alt text for images</li>
          <li>Resizable text without loss of functionality</li>
          <li>Clear focus indicators</li>
          <li>Skip to main content link</li>
        </ul>
      </section>

      <section>
        <h2>Assistive Technologies</h2>
        <p>
          Our website is designed to be compatible with various assistive technologies, including:
        </p>
        <ul>
          <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
          <li>Speech recognition software</li>
          <li>Screen magnification tools</li>
          <li>Alternative input devices</li>
        </ul>
      </section>

      <section>
        <h2>Known Issues</h2>
        <p>
          While we strive for perfect accessibility, there may be some areas of our website that are not fully accessible. We are actively working to identify and resolve any accessibility issues.
        </p>
      </section>

      <section>
        <h2>Feedback and Support</h2>
        <p>
          We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at:
        </p>
        <ul>
          <li>Email: accessibility@innovationbootcamp.edu</li>
          <li>Phone: (555) 123-4567</li>
        </ul>
      </section>

      <section>
        <h2>Continuous Improvement</h2>
        <p>
          We are committed to continually improving the accessibility of our website and services. We regularly review our accessibility features and work to implement best practices as they evolve.
        </p>
      </section>

      <footer className="text-sm text-slate-600 dark:text-slate-400 mt-8 pt-4 border-t">
        <p>Last updated: March 24, 2024</p>
      </footer>
    </article>
  );
} 