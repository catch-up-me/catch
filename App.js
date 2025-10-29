// App.js  –  No export, fully fixed FAB position

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

  const openChat = (name) => setSelectedChat(name);
  const closeChat = () => setSelectedChat(null);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* ---------- Main List (slides left) – with pb-24 to reserve FAB space ---------- */}
      <div
        className={`transition-transform duration-300 ease-in-out ${
          selectedChat ? '-translate-x-full' : 'translate-x-0'
        } pb-24`} // ← Critical: prevents FAB overlap
        style={{ width: '100%', height: '100%' }}
      >
        {/* Header */}
        <header className="bg-white px-4 py-6 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#749cbf" stroke="#749cbf" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>

          <h1 className="text-xl font-medium text-gray-800">Message</h1>

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
        <div className="px-4 py-1">
          <div className="flex gap-4 overflow-x-auto">
            {/* My Story */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full p-0.5"
                  style={{
                    background: 'linear-gradient(45deg, rgb(240,148,51) 0%, rgb(230,104,60) 25%, rgb(220,39,67) 50%, rgb(204,35,102) 75%, rgb(188,24,136) 100%)'
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">C</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-800">My story</span>
            </div>

            {/* VaVia Story */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full p-0.5"
                  style={{
                    background: 'linear-gradient(45deg, rgb(240,148,51) 0%, rgb(230,104,60) 25%, rgb(220,39,67) 50%, rgb(204,35,102) 75%, rgb(188,24,136) 100%)'
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

        {/* Conversation List */}
        <main className="bg-white">
          <div>
            {/* Chizaram */}
            <div
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
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
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
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
                  <svg
                    className="w-5 h-5 flex-shrink-0 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a7acaf"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12l5 5L18 5"></path>
                    <path d="M7 12l5 5L24 5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ---------- FAB – Always fixed, never moves ---------- */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl font-light shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        style={{ backgroundColor: '#749cbf' }}
        onClick={(e) => {
          const btn = e.currentTarget;
          btn.classList.remove('animate-bounce-once');
          void btn.offsetWidth;
          btn.classList.add('animate-bounce-once');
        }}
      >
        +
      </button>

      {/* ---------- Chat Screen (slides in from right) ---------- */}
      {selectedChat && (
        <div
          className="fixed inset-0 z-40 bg-white"
          style={{
            transform: selectedChat ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <Chat username={selectedChat} onClose={closeChat} />
        </div>
      )}
    </div>
  );
}

/* ---- FAB Bounce Animation (global) ---- */
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
  @keyframes bounce-once {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-12px); }
  }
  .animate-bounce-once {
    animation: bounce-once 0.4s ease-in-out;
  }
`;
document.head.appendChild(bounceStyle);
