import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

const PartnerShowcase = () => {
  const educationalPartners = [
    {
      name: 'GitHub Education',
      description: 'Access to GitHub\'s developer tools and learning resources.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-slate-700 dark:text-slate-200">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: 'primary'
    },
    {
      name: 'AWS Education',
      description: 'Learn cloud computing with Amazon Web Services training.',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-700 dark:text-slate-200">
          <path fill="currentColor" d="M18.75 11.35L19.3 8h.71l.76 3.36h-.71l-.14-.81h-.77l-.17.8h-.23m1.26-1.07l-.31-1.62h-.02l-.33 1.62h.66m-3.3 1.07V8h.23l1.2 2.43V8h.23v3.36h-.21l-1.23-2.52v2.52h-.22m-2.4 0V8h.24v3.36h-.24m-1.46 0l-.67-2.9V11.35h-.24V8h.33l.67 2.88L13.6 8h.32v3.36h-.23V8.44l-.68 2.91h-.16m-2.7 0V8h1.03v.26h-.8v1.27h.73v.26h-.73v1.31h.8v.26h-1.03m-2.18 0V8.25h-.5V8h1.24v.25h-.5v3.1h-.24" />
          <path fill="currentColor" d="M13.24 15.56c-1.59 1.2-3.9 1.83-5.88 1.83-2.79 0-5.3-1.04-7.2-2.77-.15-.13-.02-.32.16-.21 2.02 1.18 4.51 1.9 7.08 1.9 1.73 0 3.65-.36 5.4-1.12.27-.11.49.18.24.37" />
          <path fill="currentColor" d="M13.93 14.76c-.2-.26-1.33-.12-1.84-.06-.15.02-.17-.12-.04-.22.9-.63 2.37-.45 2.54-.24.17.22-.05 1.71-.9 2.43-.13.11-.25.05-.2-.09.19-.47.62-1.52.44-1.82" />
        </svg>
      ),
      color: 'secondary'
    },
    {
      name: 'Google Courses',
      description: 'Professional certificates and courses from Google.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
          <path fill="#4285F4" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
        </svg>
      ),
      color: 'accent'
    },
    {
      name: 'Hugging Face',
      description: 'Access to state-of-the-art AI and machine learning models.',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-700 dark:text-slate-200">
          <path fill="currentColor" d="M8.35 5.575C9.23 5.575 9.927 6.272 9.927 7.152C9.927 8.032 9.23 8.728 8.35 8.728C7.47 8.728 6.773 8.032 6.773 7.152C6.773 6.272 7.47 5.575 8.35 5.575ZM15.624 5.575C16.504 5.575 17.2 6.272 17.2 7.152C17.2 8.032 16.504 8.728 15.624 8.728C14.744 8.728 14.047 8.032 14.047 7.152C14.047 6.272 14.744 5.575 15.624 5.575ZM3.2 10.412C3.2 9.428 4.002 8.64 4.971 8.64C5.957 8.64 6.743 9.428 6.743 10.412V15.764C6.743 16.748 5.957 17.536 4.971 17.536C4.002 17.536 3.2 16.748 3.2 15.764V10.412ZM9.254 10.412C9.254 9.428 10.056 8.64 11.025 8.64C12.011 8.64 12.797 9.428 12.797 10.412V15.764C12.797 16.748 12.011 17.536 11.025 17.536C10.056 17.536 9.254 16.748 9.254 15.764V10.412ZM15.308 10.412C15.308 9.428 16.11 8.64 17.079 8.64C18.065 8.64 18.851 9.428 18.851 10.412V15.764C18.851 16.748 18.065 17.536 17.079 17.536C16.11 17.536 15.308 16.748 15.308 15.764V10.412Z" />
        </svg>
      ),
      color: 'primary'
    },
    {
      name: 'NVIDIA Courses',
      description: 'Learn AI, deep learning, and accelerated computing.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-slate-700 dark:text-slate-200">
          <path fill="currentColor" d="M8.948 8.798v-1.33h-2.45v1.33h2.45zm14.952-2.186l-2.549-4.511c-.216-.383-.713-.621-1.187-.621h-16.556c-.474 0-.969.24-1.187.621l-2.341 4.428c-.096.192-.001.344.215.344h23.389c.216 0 .312-.152.216-.261zm-10.252 2.186v-1.33h-2.45v1.33h2.45zm-9.602 0v-1.33h-3.899v.024c-.001.161.01.301.032.43.062.352.202.62.422.802.218.182.483.273.794.273.311 0 .576-.091.793-.273.088-.073.158-.159.218-.253v.326h1.64v.001zm15.112-1.33v1.33h1.641v-.326c.06.094.131.18.218.253.217.183.482.273.793.273.31 0 .577-.091.795-.273.219-.182.358-.45.421-.802.021-.129.032-.269.033-.43v-.024h-3.901zm-10.326 2.953c-.856 0-1.446.265-1.91.81-.2.227-.315.386-.315.722v.016c0 .094.008.19.024.284.062.352.201.62.422.801.217.182.482.273.793.273.311 0 .576-.091.793-.273.088-.073.159-.158.219-.253v.326h1.64v-4.08h-1.666v1.374zm10.371 0c-.856 0-1.446.265-1.91.81-.199.227-.316.386-.316.722v.016c0 .094.01.19.025.284.061.352.202.62.421.801.217.182.485.273.794.273.31 0 .577-.091.795-.273.087-.073.157-.158.217-.253v.326h1.641v-4.08h-1.667v1.374zm-5.235-2.953v1.33h2.45v-1.33h-2.45zm-13.661 4.438h3.212v-1.151h-.971v-4.095h-2.241v4.095h-.971v1.151h.971zm4.705-1.151h2.241v-4.095h-2.241v4.095zm3.923 0h2.241v-4.095h-2.241v4.095zm3.923 0h2.241v-4.095h-2.241v4.095zm3.924 0h2.241v-4.095h-2.241v4.095zm3.923 0h2.241v-4.095h-2.241v4.095z" />
        </svg>
      ),
      color: 'secondary'
    }
  ];

  return (
    <section className="relative py-20 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-50 dark:bg-primary-900/10 blur-3xl opacity-70" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-50 dark:bg-secondary-900/10 blur-3xl opacity-70" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-urbanist-text font-extrabold tracking-tight mb-6">
            <span className="text-slate-900 dark:text-white">Learning </span>
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">Ecosystem</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            We integrate with world-class learning platforms to provide a comprehensive education experience.
            Complete certification through these platforms as part of your bootcamp journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationalPartners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-800/50 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-700"
            >
              <div className="p-8">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto bg-${partner.color}-50 dark:bg-${partner.color}-900/20`} style={{backgroundColor: `var(--${partner.color}-50)`, color: `var(--${partner.color}-500)`}}>
                  {partner.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-3">{partner.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-center">{partner.description}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/30 px-8 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Included in curriculum</span>
                  <Check className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Best of Both Worlds</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Our unique approach combines theoretical learning through established platforms with 
                  practical, hands-on experience through our co-op model.
                </p>
                <ul className="space-y-3">
                  {[
                    "Self-paced learning through industry-recognized platforms",
                    "Earn certifications that employers recognize",
                    "Apply what you learn to real-world projects immediately"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3 w-3 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-center">
                  <div className="inline-block p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Get Started Today</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Join our next cohort and begin your journey toward a rewarding tech career.
                  </p>
                  <Link
                    href="/apply"
                    className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg text-white bg-primary-600 hover:bg-primary-500 transition-colors font-medium"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcase;