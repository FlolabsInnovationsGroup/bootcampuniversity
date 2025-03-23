import React from 'react';
import { Clock, BookOpen, Code } from 'lucide-react';

interface Resource {
  title: string;
  type: 'video' | 'article' | 'exercise' | 'project';
  url: string;
  duration?: string;
}

interface CourseModuleProps {
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  resources: Resource[];
  expanded?: boolean;
}

export const CourseModule = ({
  title,
  description,
  duration,
  level,
  resources,
  expanded = false,
}: CourseModuleProps) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  const levelColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-blue-100 text-blue-800',
    advanced: 'bg-purple-100 text-purple-800',
  };

  const resourceIcons = {
    video: BookOpen,
    article: BookOpen,
    exercise: Code,
    project: Code,
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
      <div
        className="p-6 bg-white cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <svg
            className={`h-5 w-5 text-gray-500 transform ${
              isExpanded ? 'rotate-180' : ''
            } transition-transform duration-200`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-2">
          <p className="text-gray-600">{description}</p>
          <div className="mt-3 flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              {duration}
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                levelColors[level]
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Learning Resources
          </h4>
          <ul className="space-y-4">
            {resources.map((resource, index) => {
              const Icon = resourceIcons[resource.type];
              return (
                <li key={index} className="flex items-start">
                  <div className="mr-3 flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {resource.title}
                    </a>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span className="capitalize">{resource.type}</span>
                      {resource.duration && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{resource.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};