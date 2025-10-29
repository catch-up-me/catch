// App.js
import React from 'react';

const Search = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const Menu = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

function App() {
  const [selectedChat, setSelectedChat] = React.useState(null);

  const openChat = (username) => {
    setSelectedChat(username);
  };

  const closeChat = () => {
    setSelectedChat(null);
  };

  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Main App Content - Slides Left When Chat Opens */}
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            selectedChat ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <header className="bg-white px-4 py-6 flex items-center justify-between border-b border-gray-100">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#749cbf" stroke="#749cbf" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            <h1 className="text-xl font-medium text-gray-800">Messages</h1>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </header>

          {/* Stories Section */}
          <div className="px-4 py-3 overflow-x-auto">
            <div className="flex gap-4">
              {/* My Story */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full p-0.5"
                    style={{
                      background: 'linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)'
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">C</span>
                      </div>
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs shadow-md">
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-800">My story</span>
              </div>

              {/* VaVia */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full p-0.5"
                    style={{
                      background: 'linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)'
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">V</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-800">VaVia</span>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <main className="bg-gray-50 flex-1 overflow-y-auto">
            <div>
              {/* Chizaram */}
              <div
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => openChat('Chizaram')}
              >
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-semibold">C</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-900">Chizaram</h3>
                    <span className="text-sm text-gray-500">Wed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate flex-1">Yo! Chizaram's in</p>
                    <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0 ml-2">
                      <span className="text-white text-xs font-semibold">1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* John */}
              <div
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => openChat('John')}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)'
                  }}
                >
                  <span className="text-white text-xl font-semibold">J</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-900">John</h3>
                    <span className="text-sm text-gray-500">Tue</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate flex-1">See you tomorrow!</p>
                    <svg className="w-5 h-5 flex-shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* FAB - Fixed to viewport, always visible */}
        <button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#749cbf] flex items-center justify-center text-white text-3xl font-light shadow-lg hover:shadow-xl transition-shadow z-50"
          onClick={(e) => {
            const btn = e.currentTarget;
            btn.classList.remove('animate-bounce-once');
            void btn.offsetWidth;
            btn.classList.add('animate-bounce-once');
          }}
        >
          +
        </button>

        {/* Chat Screen - Slides In from Right */}
        {selectedChat && (
          <div
            className="fixed inset-0 z-40 bg-white"
            style={{
              transform: selectedChat ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <Chat username={selectedChat} onClose={closeChat} />
          </div>
        )}
      </div>

      {/* Bounce Animation */}
      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
}

// Placeholder Chat Component (replace with your actual one)
function Chat({ username, onClose }) {
  return (
    <div className="h-full flex flex-col">
      <header className="px-4 py-4 border-b flex items-center gap-3">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-white font-semibold">{username[0]}</span>
        </div>
        <h2 className="font-semibold text-lg">{username}</h2>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-center text-gray-500 text-sm">Start of conversation</p>
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          placeholder="Message"
          className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default App;
