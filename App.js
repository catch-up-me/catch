import { useState } from 'react';

export default function MessagingApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [openChat, setOpenChat] = useState(null);
  const [currentView, setCurrentView] = useState('messages'); // 'messages', 'contacts', 'settings'

  const stories = [
    {
      id: 's1',
      name: 'My story',
      avatar: 'M',
      avatarColor: 'bg-orange-500',
      hasStory: true,
      isText: true
    },
    {
      id: 's2',
      name: 'VaVia',
      avatarImage: 'https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg',
      avatarColor: 'bg-purple-500',
      hasStory: true,
      isText: false
    }
  ];

  const conversations = [
    {
      id: 1,
      name: 'Chizaram',
      message: "Yo! Chizaram's in",
      avatar: 'C',
      avatarColor: 'bg-green-500',
      day: 'Wed',
      unread: 1,
      isText: true
    }
  ];

  const handleConversationClick = (conversation) => {
    setOpenChat(conversation);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className={`transition-transform duration-500 ease-in-out ${openChat ? '-translate-x-full' : 'translate-x-0'}`}>
      <div className="w-full bg-white pt-5 px-6 pb-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <svg 
            className="w-7 h-7 text-gray-800 cursor-pointer" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
          </svg>
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          <svg 
            className="w-6 h-6 text-gray-800 cursor-pointer" 
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>

        <div className="flex justify-around bg-white border-b border-gray-200 shadow-sm">
          <button
            onClick={() => {
              setActiveTab(0);
              setCurrentView('messages');
            }}
            className="flex-1 text-center py-4 bg-transparent border-none cursor-pointer relative group"
          >
            <svg 
              className="w-6 h-6 mx-auto transition-colors"
              style={{ color: activeTab === 0 ? '#749cbf' : '#4b5563' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              onMouseEnter={(e) => e.currentTarget.style.color = '#749cbf'}
              onMouseLeave={(e) => e.currentTarget.style.color = activeTab === 0 ? '#749cbf' : '#4b5563'}
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {activeTab === 0 && (
              <span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 rounded" style={{ backgroundColor: '#749cbf' }}></span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab(1);
              setCurrentView('contacts');
            }}
            className="flex-1 text-center py-4 bg-transparent border-none cursor-pointer relative group"
          >
            <svg 
              className="w-7 h-7 mx-auto transition-colors"
              style={{ color: activeTab === 1 ? '#749cbf' : '#4b5563' }}
              viewBox="0 0 24 24"
              fill="none"
              onMouseEnter={(e) => e.currentTarget.style.color = '#749cbf'}
              onMouseLeave={(e) => e.currentTarget.style.color = activeTab === 1 ? '#749cbf' : '#4b5563'}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" fill="currentColor" style={{ fill: 'currentColor' }}/>
              <path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" fill="currentColor" style={{ fill: 'currentColor' }}/>
              <path fillRule="evenodd" clipRule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" fill="currentColor" style={{ fill: 'currentColor' }}/>
              <path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" fill="currentColor" style={{ fill: 'currentColor' }}/>
            </svg>
            {activeTab === 1 && (
              <span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 rounded" style={{ backgroundColor: '#749cbf' }}></span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab(2);
              setCurrentView('settings');
            }}
            className="flex-1 text-center py-4 bg-transparent border-none cursor-pointer relative group"
          >
            <svg 
              className="w-6 h-6 mx-auto transition-colors"
              style={{ color: activeTab === 2 ? '#749cbf' : '#4b5563' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              onMouseEnter={(e) => e.currentTarget.style.color = '#749cbf'}
              onMouseLeave={(e) => e.currentTarget.style.color = activeTab === 2 ? '#749cbf' : '#4b5563'}
            >
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
            {activeTab === 2 && (
              <span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 rounded" style={{ backgroundColor: '#749cbf' }}></span>
            )}
          </button>
        </div>
      </div>

      {/* Stories Section */}
      {currentView === 'messages' && (
      <div className="px-4 py-3">
        <div className="flex gap-4 overflow-x-auto">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="relative">
                <div 
                  style={{
                    padding: '2px',
                    borderRadius: '9999px',
                    background: story.hasStory 
                      ? 'linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)'
                      : 'transparent'
                  }}
                >
                  <div 
                    className={`w-16 h-16 rounded-full ${story.avatarColor} flex items-center justify-center text-white text-xl font-semibold overflow-hidden`}
                    style={{ border: story.hasStory ? '2px solid white' : 'none' }}
                  >
                    {story.isText ? (
                      story.avatar
                    ) : (
                      <img 
                        src={story.avatarImage} 
                        alt={story.name}
                        className="w-full h-full object-cover"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                      />
                    )}
                  </div>
                </div>
                {!story.hasStory && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white" style={{ backgroundColor: '#749cbf' }}>
                    +
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-600">{story.name}</span>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Conversations */}
      {currentView === 'messages' && conversations.map((conv, idx) => (
        <div
          key={conv.id}
          onClick={() => handleConversationClick(conv)}
          className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors relative"
        >
          <div className={`w-14 h-14 rounded-full ${conv.avatarColor} flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 overflow-hidden`}>
            {conv.isText ? (
              conv.avatar
            ) : (
              <img 
                src={conv.avatarImage} 
                alt={conv.name}
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {conv.name}
              </h3>
              <svg className="w-4 h-4 flex-shrink-0" fill="#5ab1dc" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#5ab1dc">
                <path d="M 23.6641 52.3985 C 26.6172 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6172 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6172 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6172 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 24.0391 39.7891 C 23.3126 39.7891 22.8438 39.5547 22.4923 39.1563 L 14.6641 30.4609 C 14.3360 30.0860 14.1485 29.6172 14.1485 29.125 C 14.1485 28.0234 14.9923 27.2031 16.1876 27.2031 C 16.8204 27.2031 17.2891 27.4141 17.7110 27.8594 L 23.9219 34.7266 L 35.9923 17.7344 C 36.4610 17.0547 36.9297 16.7734 37.7501 16.7734 C 38.8985 16.7734 39.7188 17.6172 39.7188 18.7188 C 39.7188 19.1172 39.5547 19.5860 39.2969 19.9609 L 25.6328 39.0625 C 25.2813 39.5078 24.7423 39.7891 24.0391 39.7891 Z"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-400 truncate">
              {conv.message}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-gray-400 text-xs">
              {conv.day}
            </span>
            {conv.unread > 0 && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: '#749cbf' }}>
                {conv.unread}
              </div>
            )}
          </div>

          {idx < conversations.length - 1 && (
            <div
              className="absolute bottom-0 h-px bg-gray-200"
              style={{
                left: '4.5rem',
                right: 0,
              }}
            />
          )}
        </div>
      ))}

      {/* Contacts View */}
      {currentView === 'contacts' && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" fill="currentColor"/>
              <path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" fill="currentColor"/>
              <path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" fill="currentColor"/>
            </svg>
            <p className="text-gray-500 text-lg">No contacts yet</p>
          </div>
        </div>
      )}

      {/* Settings View */}
      {currentView === 'settings' && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
            <p className="text-gray-500 text-lg">Settings</p>
          </div>
        </div>
      )}
      </div>

      {/* Floating Action Button */}
      {currentView === 'messages' && (
      <button 
        className={`fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-light transition-all duration-300 z-40 ${
          openChat ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ backgroundColor: '#749cbf' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#638aa8'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#749cbf'}
        onClick={() => {/* Add new conversation logic */}}
      >
        +
      </button>
      )}

      {/* Chat Component */}
      {openChat && (
        <Chat conversation={openChat} onClose={handleCloseChat} />
      )}
    </div>
  );
}
