import { Search } from 'lucide-react';
import { useState } from 'react';

export default function MessagingHeader() {
  const [activeTab, setActiveTab] = useState('messages');

  const tabs = [
    { id: 'messages', label: 'MESSAGES' },
    { id: 'stories', label: 'STORIES' },
    { id: 'settings', label: 'SETTINGS' }
  ];

  const conversations = [
    {
      id: 1,
      name: 'Chizaram',
      message: "Yo! Chizaram's in",
      avatar: 'C',
      avatarColor: 'bg-green-500',
      day: 'Wed',
      unread: 1
    },
    {
      id: 2,
      name: 'VaVia',
      message: 'Hey, how are you doing?',
      avatar: 'V',
      avatarColor: 'bg-purple-500',
      day: 'Tue',
      read: true
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-600 placeholder-gray-400 flex-1"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Conversation List */}
      <div className="divide-y divide-gray-200">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full ${conv.avatarColor} flex items-center justify-center text-white text-xl font-semibold flex-shrink-0`}>
              {conv.avatar}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900">
                {conv.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {conv.message}
              </p>
            </div>

            {/* Right Side - Day and Badge */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-gray-400 text-xs">
                {conv.day}
              </span>
              {conv.unread > 0 ? (
                <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-medium">
                  {conv.unread}
                </div>
              ) : conv.read ? (
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4">
                  <path stroke="#535358" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17l5 5 12-12M16 20l2 2 12-12"></path>
                </svg>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
