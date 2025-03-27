'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

interface FormData {
  step: 0 | 1 | 2 | 3 | 4;  // Explicitly define possible step values
  path: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  experience: string;
  background: string;
  goals: string;
  heardFrom: string;
}

const initialFormData: FormData = {
  step: 0,
  path: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  program: '',
  experience: '',
  background: '',
  goals: '',
  heardFrom: '',
};

const programs = [
  {
    id: 'foundation',
    title: 'Tier 1: Foundation Builder',
    description: 'Start your journey with foundational education',
  },
  {
    id: 'accelerator',
    title: 'Tier 2: Skill Accelerator',
    description: 'Transition to earning while continuing education',
  },
  {
    id: 'professional',
    title: 'Tier 3: Professional Developer',
    description: 'Earn more with advanced skills and leadership roles',
  },
];

// Add form validation helper
const validateStep = (step: number, data: FormData) => {
  switch (step) {
    case 1:
      return data.firstName.trim() && 
             data.lastName.trim() && 
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && 
             /^[\d\s+()-]+$/.test(data.phone);
    case 2:
      return data.program && data.experience.trim().length >= 20;
    case 3:
      return data.background.trim().length >= 20 && 
             data.goals.trim().length >= 20 && 
             data.heardFrom.trim();
    default:
      return true;
  }
};

type FormFields = Exclude<keyof FormData, 'step'>;

const validateField = (field: FormFields, value: string) => {
  let error = '';

  switch (field) {
    case 'firstName':
    case 'lastName':
      if (!value.trim()) {
        error = `Please enter your ${field === 'firstName' ? 'first' : 'last'} name`;
      }
      break;
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
      break;
    case 'phone':
      if (!/^[\d\s+()-]+$/.test(value)) {
        error = 'Please enter a valid phone number';
      }
      break;
    case 'program':
      if (!value) {
        error = 'Please select a program';
      }
      break;
    case 'experience':
    case 'background':
    case 'goals':
      if (value.trim().length < 20) {
        error = 'Please provide more details (at least 20 characters)';
      }
      break;
    case 'heardFrom':
      if (!value.trim()) {
        error = 'Please tell us how you heard about us';
      }
      break;
  }

  return error;
};

export default function Apply() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = () => {
    const currentErrors: Record<string, string> = {};
    
    // Validate current step
    if (formData.step === 1) {
      const fields: FormFields[] = ['firstName', 'lastName', 'email', 'phone'];
      fields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) currentErrors[field] = error;
      });
    } else if (formData.step === 2) {
      const fields: FormFields[] = ['program', 'experience'];
      fields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) currentErrors[field] = error;
      });
    } else if (formData.step === 3) {
      const fields: FormFields[] = ['background', 'goals', 'heardFrom'];
      fields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) currentErrors[field] = error;
      });
    }

    // Set errors and return if validation fails
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    // Clear errors and proceed to next step
    setErrors({});
    setFormData((prev) => {
      const nextStepValue = (prev.step + 1) as 0 | 1 | 2 | 3 | 4;
      return { ...prev, step: nextStepValue };
    });
  };

  const prevStep = () => {
    setFormData((prev) => ({ 
      ...prev, 
      step: (prev.step - 1) as FormData['step']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors: Record<string, string> = {};
    
    // Validate final step
    const fields: FormFields[] = ['background', 'goals', 'heardFrom'];
    fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) currentErrors[field] = error;
    });

    // Set errors and return if validation fails
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    // If program is not selected but path is, set foundation as the default program
    if (!formData.program && formData.path) {
      setFormData(prev => ({
        ...prev,
        program: 'foundation'
      }));
    }

    // Clear errors and proceed with submission
    setErrors({});
    setIsSubmitting(true);
    
    try {
      // Prepare the data to send to the API
      const dataToSend = {
        ...formData,
        // Ensure program has a value for the API
        program: formData.program || 'foundation'
      };
      
      // Send the form data to our API endpoint
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }
      
      // If successful, go to the success step
      setFormData((prev) => {
        const nextStepValue = (prev.step + 1) as 0 | 1 | 2 | 3 | 4;
        return { ...prev, step: nextStepValue };
      });
    } catch (err) {
      // Show an error message
      console.error('Application submission error:', err);
      setErrors({ 
        submit: err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderErrorMessage = (field: string) => {
    if (!errors[field]) return null;
    return (
      <p 
        className="text-sm text-red-500 mt-1" 
        data-testid={`${field}-error`}
      >
        {errors[field]}
      </p>
    );
  };

  const renderStep = () => {
    switch (formData.step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Choose Your Path
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Pre-register for our cooperative education program. Start with foundational learning, then progress to earning income as you develop advanced skills.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    path: 'bootcamp',
                    program: 'foundation',
                    step: 1,
                  }));
                }}
                className="group relative px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-200"
              >
                🚀 Bootcamp Path
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    path: 'internship',
                    program: 'accelerator',
                    step: 1,
                  }));
                }}
                className="group relative px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-200"
              >
                💼 Internship Only
              </motion.button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    required
                  />
                  {errors.firstName && (
                    <p 
                      className="text-sm text-red-500 mt-1" 
                      data-testid="firstName-error"
                    >
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    required
                  />
                  {errors.lastName && (
                    <p 
                      className="text-sm text-red-500 mt-1" 
                      data-testid="lastName-error"
                    >
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  required
                />
                {errors.email && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="email-error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  required
                />
                {errors.phone && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="phone-error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200"
                onClick={nextStep}
              >
                Next Step
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white">
                  Select Program
                </label>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {programs.map((program) => (
                    <button
                      key={program.id}
                      type="button"
                      onClick={() => updateFormData('program', program.id)}
                      className={`group relative overflow-hidden rounded-xl border p-6 text-left transition-all bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/10 hover:shadow-lg ${
                        formData.program === program.id
                          ? 'ring-2 ring-primary-500'
                          : ''
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-colors duration-500" />
                      <div className="relative">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {program.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {program.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.program && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="program-error"
                  >
                    {errors.program}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="experience">
                  Tell us about your coding experience
                </label>
                <textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => updateFormData('experience', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 min-h-[120px] resize-y"
                  required
                />
                {errors.experience && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="experience-error"
                  >
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium border border-slate-200/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                Previous Step
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200"
                onClick={nextStep}
              >
                Next Step
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="background">
                  Educational/Professional Background
                </label>
                <textarea
                  id="background"
                  value={formData.background}
                  onChange={(e) => updateFormData('background', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 h-32 resize-none"
                  placeholder="Tell us about your educational and professional background..."
                  required
                />
                {errors.background && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="background-error"
                  >
                    {errors.background}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="goals">
                  Career Goals
                </label>
                <textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 h-32 resize-none"
                  placeholder="What are your career goals?"
                  required
                />
                {errors.goals && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="goals-error"
                  >
                    {errors.goals}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white" htmlFor="heardFrom">
                  How did you hear about us?
                </label>
                <input
                  id="heardFrom"
                  type="text"
                  value={formData.heardFrom}
                  onChange={(e) => updateFormData('heardFrom', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  required
                />
                {errors.heardFrom && (
                  <p 
                    className="text-sm text-red-500 mt-1" 
                    data-testid="heardFrom-error"
                  >
                    {errors.heardFrom}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium border border-slate-200/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                Previous Step
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
            {errors.submit && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Application Received!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Thank you for your interest in our program. We've received your pre-registration application for our upcoming launch. We'll notify you when enrollment officially opens and you'll be among the first to know!
            </p>
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Application Submitted!
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Thank you for your interest. We'll be in touch soon!
            </p>
          </motion.div>
        );
    }
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            style={{ y }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 border border-primary-200/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Begin Your Journey
          </motion.div>

          <motion.h2
            style={{ y }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Start Your{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Take the first step towards your new career in tech. Fill out the application below to get started.
          </motion.p>
        </div>

        {/* Progress steps */}
        {formData.step < 4 && (
          <motion.div 
            style={{ y }}
            className="mt-12"
          >
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-slate-200/10 dark:bg-slate-700/10" />
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${((formData.step - 1) / 2) * 100}%` }}
                  className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                />
                <div className="relative z-10 flex justify-between">
                  {[1, 2, 3].map((step) => (
                    <motion.div
                      key={step}
                      initial={{ scale: 0.8 }}
                      animate={{ 
                        scale: step <= formData.step ? 1 : 0.8,
                        backgroundColor: step <= formData.step ? 'var(--primary-500)' : 'var(--slate-200)',
                      }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-lg transition-colors duration-200 ${
                        step <= formData.step
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div 
          style={{ y }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
} 