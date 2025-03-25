import { Conversation } from '@/lib/types/dashboard';
import { motion } from 'framer-motion';

interface ConversationItemProps {
  conversation: Conversation;
  index: number;
  isSelected: boolean;
  onSelect: (conversation: Conversation) => void;
}

export function ConversationItem({
  conversation,
  index,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelect(conversation)}
      className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors ${
        isSelected
          ? 'bg-primary-50 dark:bg-primary-900/50'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        {conversation.unread && (
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary-500 dark:bg-primary-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {conversation.name}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {conversation.timestamp}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {conversation.role}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
          {conversation.lastMessage}
        </p>
      </div>
    </motion.button>
  );
} 