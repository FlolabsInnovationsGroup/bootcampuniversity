'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Video, Users } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'React Advanced Concepts',
    type: 'Course Session',
    date: '2024-03-20',
    time: '16:00',
    duration: '1h 30m',
    instructor: 'Sarah Johnson',
    attendees: 12,
    icon: Video,
  },
  {
    id: 2,
    title: 'Group Project Discussion',
    type: 'Team Meeting',
    date: '2024-03-21',
    time: '14:00',
    duration: '1h',
    instructor: 'Mike Chen',
    attendees: 5,
    icon: Users,
  },
];

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-500">Manage your upcoming sessions and events.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">
                Month
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                Week
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                Day
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            {/* Calendar grid would go here - using a placeholder for now */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square border rounded-md p-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg hover:border-blue-200 transition-colors"
              >
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <event.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.type}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Duration: {event.duration}
                      </span>
                      <span className="text-sm text-gray-500">
                        {event.attendees} attendees
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            View All Events
          </button>
        </Card>
      </div>
    </div>
  );
} 