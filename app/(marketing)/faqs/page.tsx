'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    question: 'What makes Innovation Bootcamp University different?',
    answer: 'Our program combines hands-on learning, industry mentorship, and real-world projects to provide a comprehensive learning experience. We focus on both technical skills and professional development.',
  },
  {
    question: 'Do I need prior programming experience?',
    answer: 'No prior programming experience is required for our beginner tracks. We have programs designed for all skill levels, from complete beginners to advanced developers looking to specialize.',
  },
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary depending on the track and intensity level you choose. Our part-time programs typically run for 12-24 weeks, while full-time intensive programs can be completed in 8-16 weeks.',
  },
  {
    question: 'What kind of support do students receive?',
    answer: 'Students receive comprehensive support including 1-on-1 mentoring, career coaching, technical assistance, and access to our community of learners and industry professionals.',
  },
  {
    question: 'Are there job placement services?',
    answer: 'Yes, we offer career services including resume reviews, interview preparation, networking events, and job placement assistance. We have partnerships with leading tech companies for internships and job opportunities.',
  },
  {
    question: 'What is the application process like?',
    answer: 'The application process includes an online application, a brief interview to understand your goals, and for some advanced programs, a technical assessment. We want to ensure the program is the right fit for your needs.',
  },
  {
    question: 'Is financial aid available?',
    answer: 'Yes, we offer various financing options including scholarships, income share agreements, and flexible payment plans. We believe everyone should have access to quality tech education.',
  },
  {
    question: 'What technologies will I learn?',
    answer: 'Our curriculum covers in-demand technologies including JavaScript, Python, React, Node.js, and more. The specific technologies vary by program and are regularly updated based on industry trends.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
          <button
            type="button"
            aria-label={isOpen ? 'Close answer' : 'Show answer'}
            className={`ml-4 text-gray-500 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            ▼
          </button>
        </div>
        {isOpen && (
          <p className="mt-4 text-gray-600">
            {answer}
          </p>
        )}
      </div>
    </Card>
  );
}

export default function FAQsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our programs, application process,
            and student support services.
          </p>
        </div>

        {/* FAQs Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@innovationbootcamp.edu"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
} 