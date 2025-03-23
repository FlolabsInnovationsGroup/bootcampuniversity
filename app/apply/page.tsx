'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/shared/Badge';

export default function ApplyPage() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    track: '',
    background: '',
    experience: '',
    goals: '',
    referral: '',
    marketingConsent: false,
  });

  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState({
      ...formState,
      [name]: checked,
    });
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to your server
    console.log(formState);
    setFormSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity-20" width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="white" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-squares)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Apply Now
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
              Begin your journey with Innovation Bootcamp University and take the first step toward a rewarding tech career.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {formSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for applying to Innovation Bootcamp University. We've received your application and will be in touch soon.
            </p>
            <p className="text-gray-600 mb-6">
              Next Steps:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-8 text-left max-w-md mx-auto">
              <li>Our admissions team will review your application (typically within 2-3 business days)</li>
              <li>You'll receive an email invitation for a virtual interview</li>
              <li>After the interview, we'll share our decision and next steps</li>
            </ol>
            <p className="text-gray-600">
              If you have any questions, please contact us at <a href="mailto:admissions@innovationbootcamp.edu" className="text-blue-600 hover:text-blue-800">admissions@innovationbootcamp.edu</a>
            </p>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(formStep / 3) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <div className={`${formStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>Personal Information</div>
                  <div className={`${formStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>Background & Experience</div>
                  <div className={`${formStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>Review & Submit</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={formState.firstName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={formState.lastName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="track" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Learning Track*
                    </label>
                    <select
                      id="track"
                      name="track"
                      required
                      value={formState.track}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select a track</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="robotics">Robotics & Automation</option>
                      <option value="web-dev">Web Development</option>
                      <option value="mobile-dev">Mobile App Development</option>
                      <option value="data-science">Data Science & Analytics</option>
                    </select>
                  </div>

                  <div className="mt-8 text-right">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Background & Experience</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
                        Educational Background*
                      </label>
                      <textarea
                        id="background"
                        name="background"
                        rows={3}
                        required
                        value={formState.background}
                        onChange={handleInputChange}
                        placeholder="Tell us about your educational background, including degrees, certifications, or self-learning."
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Relevant Experience*
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows={4}
                        required
                        value={formState.experience}
                        onChange={handleInputChange}
                        placeholder="Describe any relevant work experience, projects, or skills you have in your chosen track."
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                        Career Goals*
                      </label>
                      <textarea
                        id="goals"
                        name="goals"
                        rows={3}
                        required
                        value={formState.goals}
                        onChange={handleInputChange}
                        placeholder="What are your career goals and how do you think Innovation Bootcamp University can help you achieve them?"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">
                        How did you hear about us?
                      </label>
                      <input
                        type="text"
                        name="referral"
                        id="referral"
                        value={formState.referral}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Review Application
                    </button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Application</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                      <div className="bg-gray-50 rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">First Name</p>
                          <p className="font-medium">{formState.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Name</p>
                          <p className="font-medium">{formState.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium">{formState.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{formState.phone || 'Not provided'}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Preferred Learning Track</p>
                          <div className="mt-1">
                            <Badge variant="default" className="font-normal">
                              {formState.track === 'ai-ml' && 'AI & Machine Learning'}
                              {formState.track === 'ai-ml' && 'AI & Machine Learning'}
                              {formState.track === 'robotics' && 'Robotics & Automation'}
                              {formState.track === 'web-dev' && 'Web Development'}
                              {formState.track === 'mobile-dev' && 'Mobile App Development'}
                              {formState.track === 'data-science' && 'Data Science & Analytics'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Background & Experience</h3>
                      <div className="bg-gray-50 rounded-md p-4 space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Educational Background</p>
                          <p className="mt-1 whitespace-pre-line">{formState.background}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Relevant Experience</p>
                          <p className="mt-1 whitespace-pre-line">{formState.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Career Goals</p>
                          <p className="mt-1 whitespace-pre-line">{formState.goals}</p>
                        </div>
                        {formState.referral && (
                          <div>
                            <p className="text-sm text-gray-500">How you heard about us</p>
                            <p className="mt-1">{formState.referral}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketingConsent"
                          name="marketingConsent"
                          type="checkbox"
                          checked={formState.marketingConsent}
                          onChange={handleCheckboxChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketingConsent" className="font-medium text-gray-700">
                          Marketing Communications
                        </label>
                        <p className="text-gray-500">
                          I agree to receive updates, news, and promotional materials from Innovation Bootcamp University.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}

        {/* Application timeline */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Application Process</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Line running through the timeline */}
              <div className="absolute h-full w-0.5 bg-gray-200 left-5 md:left-1/2 transform -translate-x-1/2"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    1
                  </div>
                  <div className="ml-12 md:ml-0 mt-3 md:mt-0 md:w-1/2 md:pr-8 md:text-right">
                    <h3 className="text-lg font-medium text-gray-900">Apply Online</h3>
                    <p className="mt-1 text-gray-600">
                      Complete our online application form with your personal information, educational background, and career goals.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pl-8">
                    {/* Empty div for layout on desktop */}
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    2
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pr-8">
                    {/* Empty div for layout on desktop */}
                  </div>
                  <div className="ml-12 md:ml-0 mt-3 md:mt-0 md:w-1/2 md:pl-8">
                    <h3 className="text-lg font-medium text-gray-900">Admissions Review</h3>
                    <p className="mt-1 text-gray-600">
                      Our admissions team will review your application within 2-3 business days.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    3
                  </div>
                  <div className="ml-12 md:ml-0 mt-3 md:mt-0 md:w-1/2 md:pr-8 md:text-right">
                    <h3 className="text-lg font-medium text-gray-900">Virtual Interview</h3>
                    <p className="mt-1 text-gray-600">
                      Successful applicants will be invited to a virtual interview to discuss their background, goals, and fit with our program.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pl-8">
                    {/* Empty div for layout on desktop */}
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    4
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pr-8">
                    {/* Empty div for layout on desktop */}
                  </div>
                  <div className="ml-12 md:ml-0 mt-3 md:mt-0 md:w-1/2 md:pl-8">
                    <h3 className="text-lg font-medium text-gray-900">Acceptance & Enrollment</h3>
                    <p className="mt-1 text-gray-600">
                      Upon acceptance, you'll receive enrollment information including program start dates, payment options, and orientation details.
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-12 md:ml-0 mt-3 md:mt-0 md:w-1/2 md:pr-8 md:text-right">
                    <h3 className="text-lg font-medium text-gray-900">Begin Your Journey</h3>
                    <p className="mt-1 text-gray-600">
                      Start your learning journey with orientation and access to our online learning platform and community.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pl-8">
                    {/* Empty div for layout on desktop */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">What are the eligibility requirements?</h3>
              <p className="mt-2 text-gray-600">
                Our programs are open to individuals of all backgrounds. While previous experience in your chosen track is beneficial, it's not required. We assess each application based on motivation, aptitude, and alignment with our program goals.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">How much does the program cost?</h3>
              <p className="mt-2 text-gray-600">
                Tier 1 (Bootcamp) costs between $1,000-$2,000, significantly less than traditional bootcamps. Tier 2 (Apprenticeship) and Tier 3 (Masters Program) are paid positions where you'll earn money while continuing your education.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">How long does the program take to complete?</h3>
              <p className="mt-2 text-gray-600">
                Tier 1 typically takes 3-6 months, depending on your learning pace. Tier 2 usually lasts 6-12 months as you gain professional experience. Tier 3 is ongoing, functioning more like a traditional employment position with advancement opportunities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is advancement between tiers guaranteed?</h3>
              <p className="mt-2 text-gray-600">
                Advancement depends on successful completion of each tier's requirements and available positions. While we strive to advance as many qualified students as possible, progression to higher tiers is merit-based and dependent on your performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}