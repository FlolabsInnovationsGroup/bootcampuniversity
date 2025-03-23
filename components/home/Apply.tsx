'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

interface FormData {
  step: number;
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
  step: 1,
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
    title: 'Foundation Builder',
    description: 'Start your journey in web development',
  },
  {
    id: 'accelerator',
    title: 'Skill Accelerator',
    description: 'Advance your full-stack development skills',
  },
  {
    id: 'professional',
    title: 'Professional Developer',
    description: 'Master enterprise-level development',
  },
];

export default function Apply() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    nextStep();
  };

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
              >
                Next Step
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground">Select Program</label>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {programs.map((program) => (
                    <motion.button
                      key={program.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => updateFormData('program', program.id)}
                      className={`group relative overflow-hidden rounded-xl border p-6 text-left transition-all ${
                        formData.program === program.id
                          ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/50 shadow-lg shadow-primary-500/20'
                          : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/10 hover:shadow-lg'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-colors duration-500" />
                      <div className="relative">
                        <h4 className="font-semibold text-foreground mb-2">{program.title}</h4>
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                        {formData.program === program.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-2 top-2"
                          >
                            <CheckCircle className="h-5 w-5 text-primary-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Coding Experience</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={formData.experience}
                  onChange={(e) => updateFormData('experience', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 h-32 resize-none"
                  placeholder="Describe your coding experience, if any..."
                  required
                />
              </div>
            </div>
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium border border-slate-200/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                Previous Step
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.program || !formData.experience}
              >
                Next Step
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground">Educational/Professional Background</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={formData.background}
                  onChange={(e) => updateFormData('background', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 h-32 resize-none"
                  placeholder="Tell us about your educational and professional background..."
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Career Goals</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 h-32 resize-none"
                  placeholder="What are your career goals?"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">How did you hear about us?</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={formData.heardFrom}
                  onChange={(e) => updateFormData('heardFrom', e.target.value)}
                  className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-3 mt-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium border border-slate-200/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                Previous Step
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.background || !formData.goals || !formData.heardFrom || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shadow-lg"
            >
              <CheckCircle className="h-8 w-8" />
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-4"
            >
              Application Submitted!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Thank you for applying to Innovation Bootcamp. We'll review your application and get back to you within 2-3 business days.
            </motion.p>
          </motion.div>
        );

      default:
        return null;
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Start Your{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            className="text-lg text-muted-foreground leading-relaxed"
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