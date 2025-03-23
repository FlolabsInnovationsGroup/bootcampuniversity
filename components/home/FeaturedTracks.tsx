import React from 'react';
import Link from 'next/link';
import { Code, Brain, Bot, ArrowRight, Users, Clock } from 'lucide-react';

const tracks = [
  {
    icon: Code,
    name: 'Web Development',
    description: 'Master full-stack development with modern frameworks and cloud technologies.',
    students: 234,
    duration: '24 weeks',
    color: 'primary',
    technologies: ['React', 'Node.js', 'AWS', 'TypeScript']
  },
  {
    icon: Brain,
    name: 'AI & Machine Learning',
    description: 'Build intelligent systems and models using cutting-edge AI technologies.',
    students: 189,
    duration: '28 weeks',
    color: 'secondary',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI']
  },
  {
    icon: Bot,
    name: 'Robotics Engineering',
    description: 'Develop autonomous systems and smart robotics solutions.',
    students: 156,
    duration: '32 weeks',
    color: 'accent',
    technologies: ['ROS', 'C++', 'Computer Vision', 'Arduino']
  }
];

const FeaturedTracks = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/25 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-urbanist-text font-extrabold tracking-tight mb-6">
            <span className="text-slate-900 dark:text-white">Specialized </span>
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Learning Tracks
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Choose your path and master in-demand skills with our specialized learning tracks,
            designed to meet industry needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-accent-500/5 transition-colors duration-500" />
                
                <div className="relative">
                  {/* Header */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${track.color}-100 dark:bg-${track.color}-900/30 mb-6`}>
                    <Icon className={`w-6 h-6 text-${track.color}-500 dark:text-${track.color}-400`} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {track.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {track.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {track.students} students
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {track.duration}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {track.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium bg-${track.color}-100 dark:bg-${track.color}-900/30 text-${track.color}-600 dark:text-${track.color}-400`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/tracks/${track.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-${track.color}-100 dark:bg-${track.color}-900/30 text-${track.color}-600 dark:text-${track.color}-400 hover:bg-${track.color}-200 dark:hover:bg-${track.color}-900/50 transition-colors duration-200`}
                  >
                    Explore track
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTracks;