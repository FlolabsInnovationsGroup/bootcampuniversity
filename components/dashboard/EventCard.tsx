import { Button } from '@/components/ui/button';
import { Event } from '@/lib/types/dashboard';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="rounded-full bg-primary-50 dark:bg-primary-900/50 p-2">
        <event.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {event.title}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {event.date}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          {event.time}
        </p>
        {event.mentor && (
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
            Mentor: {event.mentor}
          </p>
        )}
        {event.participants && (
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
            Team: {event.participants.join(', ')}
          </p>
        )}
      </div>
      <Button variant="ghost" size="sm">
        Join
      </Button>
    </motion.div>
  );
} 