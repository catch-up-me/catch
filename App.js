<script type="text/babel">
const { useState } = React;

// Lucide Search Icon Component
const Search = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

// Chat Component
function Chat({ conversation, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
      {/* Header – very small bottom shadow, no border */}
      <header className="relative flex items-center justify-between px-4 py-3 bg-white shadow-xs">
        {/* Tiny transparent spacer to allow shadow to show */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-transparent -z-10 pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <div className={`w-10 h-10 rounded-full ${conversation.avatarColor} flex items-center justify-center`}>
            <span className="text-white text-xl font-medium">{conversation.avatar}</span>
          </div>

          <div>
            <h1 className="text-gray-900 font-medium">{conversation.name}</h1>
            <p className="text-gray-500 text-xs">last seen Oct 15 at 06:54 PM</p>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </header>

      {/* Empty body – messages will go here later */}
      <main className="flex-1 bg-white"></main>
    </div>
  );
}

function MessagingHeader() {
  const [activeTab, setActiveTab] = useState('messages');
  const [openChat, setOpenChat] = useState(null);

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

  const handleConversationClick = (conversation) => {
    setOpenChat(conversation);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
  };

  return (
    <>
      <div className={`w-full max-w-md mx-auto bg-white relative transition-transform duration-300 ${openChat ? 'animate-push-left' : ''}`}>
        {/* Floating Action Button */}
        <button
          className={`fixed right-6 bottom-6 w-14 h-14 rounded-full text-white text-3xl font-light flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-90 active:shadow-md z-40 ${openChat ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ backgroundColor: '#749cbf' }}
          aria-label="Add new"
        >
          +
        </button>

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
                  ? 'text-[#749cbf]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#749cbf' }} />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === 'messages' ? (
          <div className="relative">
            {conversations.map((conv, idx) => (
              <div
                key={conv.id}
                onClick={() => handleConversationClick(conv)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors relative"
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
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: '#749cbf' }}>
                      {conv.unread}
                    </div>
                  ) : conv.read ? (
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4">
                      <path stroke="#535358" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17l5 5 12-12M16 20l2 2 12-12"></path>
                    </svg>
                  ) : null}
                </div>

                {/* Custom Divider: Starts after avatar, ends at right edge */}
                {idx < conversations.length - 1 && (
                  <div
                    className="absolute bottom-0 h-px bg-gray-200"
                    style={{
                      left: '4rem',
                      right: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : activeTab === 'stories' ? (
          <div className="flex items-center justify-center py-20 px-4">
            <p className="text-gray-400 text-center">
              When your friends post stories, they'll appear here
            </p>
          </div>
        ) : null}
      </div>

      {/* Chat Component */}
      {openChat && (
        <Chat conversation={openChat} onClose={handleCloseChat} />
      )}
    </>
  );
}

// Add custom styles for animations
const chatStyle = document.createElement('style');
chatStyle.textContent = `
  @keyframes slide-in-right {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out forwards;
  }
  @keyframes slide-out-right {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
  .animate-slide-out-right {
    animation: slide-out-right 0.3s ease-in forwards;
  }
  @keyframes push-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-100%); }
  }
  .animate-push-left {
    animation: push-left 0.3s ease-out forwards;
  }

  /* Very small, subtle shadow */
  .shadow-xs {
    box-shadow: -14px 1px 14px 5px rgba(0, 0, 0, 0.05);
  }
`;
document.head.appendChild(chatStyle);

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MessagingHeader />);
  </script>
