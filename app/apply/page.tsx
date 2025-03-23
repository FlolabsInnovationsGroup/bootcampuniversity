'use client';

import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  Select,
  Textarea,
} from '@/components/shared';
import { CheckCircle, ChevronRight, ChevronLeft, Users2, Sparkles } from 'lucide-react';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to your server
    console.log(formState);
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-400/90" />
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity-20"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
          >
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="white" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-squares)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 border-2 border-white/20">
              <Users2 className="mr-1.5 h-3.5 w-3.5" />
              Application Form
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Begin Your Journey
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              Take the first step toward a rewarding tech career with Innovation Bootcamp University.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {formSubmitted ? (
          <Card variant="gradient" className="overflow-hidden">
            <CardContent className="flex flex-col items-center p-8 text-center">
              <div className="mb-6 rounded-full bg-primary-100 p-3 dark:bg-primary-900/20">
                <CheckCircle className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                Application Submitted!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Thank you for applying to Innovation Bootcamp University. We've received your application and will be in touch soon.
              </p>
              <div className="w-full max-w-md rounded-lg bg-white/50 dark:bg-gray-900/50 p-6 backdrop-blur-sm">
                <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">
                  Next Steps:
                </h3>
                <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2 text-left">
                  <li>Our admissions team will review your application (typically within 2-3 business days)</li>
                  <li>You'll receive an email invitation for a virtual interview</li>
                  <li>After the interview, we'll share our decision and next steps</li>
                </ol>
              </div>
              <p className="mt-8 text-gray-600 dark:text-gray-300">
                Questions? Contact us at{' '}
                <a 
                  href="mailto:admissions@innovationbootcamp.edu" 
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  admissions@innovationbootcamp.edu
                </a>
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="mb-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-800"></div>
                </div>
                <div className="relative flex justify-between">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        formStep >= step
                          ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                          : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900'
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${
                          formStep >= step
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-sm font-medium">
                  <span className={formStep >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}>
                    Personal Info
                  </span>
                  <span className={formStep >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}>
                    Background
                  </span>
                  <span className={formStep >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}>
                    Review
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <Card>
                  <CardHeader>
                    <Badge variant="default" className="w-fit">
                      <Users2 className="mr-1.5 h-3.5 w-3.5" />
                      Step 1 of 3
                    </Badge>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
                      Personal Information
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Tell us about yourself so we can personalize your learning experience.
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          First Name*
                        </label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formState.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Last Name*
                        </label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formState.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Email Address*
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="track" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Preferred Learning Track*
                      </label>
                      <Select
                        id="track"
                        name="track"
                        required
                        value={formState.track}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a track</option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="robotics">Robotics & Automation</option>
                        <option value="web-dev">Web Development</option>
                        <option value="mobile-dev">Mobile App Development</option>
                        <option value="data-science">Data Science & Analytics</option>
                      </Select>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <Button
                      type="button"
                      onClick={nextStep}
                      size="lg"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {formStep === 2 && (
                <Card>
                  <CardHeader>
                    <Badge variant="default" className="w-fit">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Step 2 of 3
                    </Badge>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
                      Background & Experience
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Help us understand your background and career goals.
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <label htmlFor="background" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Educational Background*
                      </label>
                      <Textarea
                        id="background"
                        name="background"
                        rows={3}
                        required
                        value={formState.background}
                        onChange={handleInputChange}
                        placeholder="Tell us about your educational background, including degrees, certifications, or self-learning."
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="experience" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Relevant Experience*
                      </label>
                      <Textarea
                        id="experience"
                        name="experience"
                        rows={4}
                        required
                        value={formState.experience}
                        onChange={handleInputChange}
                        placeholder="Describe any relevant work experience, projects, or skills you have in your chosen track."
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="goals" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Career Goals*
                      </label>
                      <Textarea
                        id="goals"
                        name="goals"
                        rows={3}
                        required
                        value={formState.goals}
                        onChange={handleInputChange}
                        placeholder="What are your career goals and how do you think Innovation Bootcamp University can help you achieve them?"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="referral" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        How did you hear about us?
                      </label>
                      <Input
                        type="text"
                        id="referral"
                        name="referral"
                        value={formState.referral}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      size="lg"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      size="lg"
                    >
                      Review Application
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {formStep === 3 && (
                <Card>
                  <CardHeader>
                    <Badge variant="default" className="w-fit">
                      <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                      Step 3 of 3
                    </Badge>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
                      Review Your Application
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Please review your information before submitting.
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                        Personal Information
                      </h3>
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 backdrop-blur-sm">
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <dt className="text-sm text-gray-500 dark:text-gray-400">First Name</dt>
                            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{formState.firstName}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Last Name</dt>
                            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{formState.lastName}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Email Address</dt>
                            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{formState.email}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Phone Number</dt>
                            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                              {formState.phone || 'Not provided'}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm text-gray-500 dark:text-gray-400">Preferred Learning Track</dt>
                            <dd className="mt-1">
                              <Badge variant="default" className="font-normal">
                                {formState.track === 'ai-ml' && 'AI & Machine Learning'}
                                {formState.track === 'robotics' && 'Robotics & Automation'}
                                {formState.track === 'web-dev' && 'Web Development'}
                                {formState.track === 'mobile-dev' && 'Mobile App Development'}
                                {formState.track === 'data-science' && 'Data Science & Analytics'}
                              </Badge>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                        Background & Experience
                      </h3>
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 space-y-4 backdrop-blur-sm">
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">Educational Background</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">
                            {formState.background}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">Relevant Experience</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">
                            {formState.experience}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">Career Goals</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">
                            {formState.goals}
                          </dd>
                        </div>
                        {formState.referral && (
                          <div>
                            <dt className="text-sm text-gray-500 dark:text-gray-400">How you heard about us</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formState.referral}</dd>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="marketingConsent"
                            name="marketingConsent"
                            type="checkbox"
                            checked={formState.marketingConsent}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="marketingConsent" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Marketing Communications
                          </label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            I agree to receive updates, news, and promotional materials from Innovation Bootcamp University.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      size="lg"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="min-w-[200px]"
                    >
                      Submit Application
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </form>
          </>
        )}

        {/* Application timeline */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Application Process
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's what to expect after submitting your application.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 md:left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-800"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: 1,
                    title: "Apply Online",
                    description: "Complete our online application form with your personal information, educational background, and career goals."
                  },
                  {
                    step: 2,
                    title: "Admissions Review",
                    description: "Our admissions team will review your application within 2-3 business days."
                  },
                  {
                    step: 3,
                    title: "Virtual Interview",
                    description: "Successful applicants will be invited to a virtual interview to discuss their background, goals, and fit with our program."
                  },
                  {
                    step: 4,
                    title: "Acceptance & Enrollment",
                    description: "Upon acceptance, you'll receive enrollment information including program start dates, payment options, and orientation details."
                  }
                ].map((item, index) => (
                  <div key={item.step} className="relative flex flex-col md:flex-row items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white font-bold z-10">
                      {item.step}
                    </div>
                    <div className={`ml-12 md:ml-0 mt-3 md:mt-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                    }`}>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    {index % 2 === 0 ? (
                      <div className="hidden md:block md:w-1/2 md:pl-8" />
                    ) : (
                      <div className="hidden md:block md:w-1/2 md:pr-8" />
                    )}
                  </div>
                ))}
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