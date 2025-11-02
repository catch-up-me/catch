const { useState } = React;

function MessagingApp() {
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
          <Icons.Menu />
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          <Icons.Search />
        </div>

        <div className="flex justify-around bg-white border-b border-gray-200 shadow-sm">
          <button
            onClick={() => {
              setActiveTab(0);
              setCurrentView('messages');
            }}
            className="flex-1 text-center py-4 bg-transparent border-none cursor-pointer relative group"
          >
            <Icons.Clock color={activeTab === 0 ? '#749cbf' : '#4b5563'} />
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
            <Icons.Contacts color={activeTab === 1 ? '#749cbf' : '#4b5563'} />
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
            <Icons.Settings color={activeTab === 2 ? '#749cbf' : '#4b5563'} />
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
              <Icons.Verified />
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
            <Icons.ContactsLarge color="#d1d5db" />
            <p className="text-gray-500 text-lg">No contacts yet</p>
          </div>
        </div>
      )}

      {/* Settings View */}
      {currentView === 'settings' && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icons.SettingsLarge color="#d1d5db" />
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
