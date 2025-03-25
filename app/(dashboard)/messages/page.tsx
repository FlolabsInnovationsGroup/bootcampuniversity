'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Search, Send, MoreVertical, User } from 'lucide-react';

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Instructor',
    lastMessage: 'Great progress on your latest assignment!',
    time: '2h ago',
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Teaching Assistant',
    lastMessage: 'Do you have any questions about the project?',
    time: '4h ago',
    unread: false,
    online: false,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Student',
    lastMessage: 'Thanks for helping with the study group!',
    time: '1d ago',
    unread: false,
    online: true,
  },
];

// Mock messages for the selected conversation
const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    content: 'Hi! How are you progressing with the React assignments?',
    time: '10:30 AM',
    isSender: false,
  },
  {
    id: 2,
    sender: 'You',
    content: 'Hello! I\'ve completed most of them, but I have a question about hooks.',
    time: '10:32 AM',
    isSender: true,
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    content: 'Sure, what would you like to know about hooks?',
    time: '10:33 AM',
    isSender: false,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="h-[calc(100vh-theme(spacing.32))]">
      <div className="grid grid-cols-12 h-full gap-6">
        {/* Conversations List */}
        <div className="col-span-4 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Card className="h-[calc(100%-theme(spacing.16))] overflow-y-auto">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{conversation.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <Card className="col-span-8 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-medium text-gray-900">{selectedConversation.name}</h2>
                <p className="text-sm text-gray-500">{selectedConversation.role}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isSender
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  if (newMessage.trim()) {
                    // Handle sending message
                    setNewMessage('');
                  }
                }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 