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

          <div className={`w-10 h-10 rounded-full ${conversation.avatarColor} flex items-center justify-center overflow-hidden`}>
            {conversation.isText ? (
              <span className="text-white text-xl font-medium">{conversation.avatar}</span>
            ) : (
              <img 
                src={conversation.avatarImage} 
                alt={conversation.name}
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
            )}
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
    { id: 'calls', label: 'CALLS' },
    { id: 'settings', label: 'SETTINGS' }
  ];

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
    },
    {
      id: 2,
      name: 'VaVia',
      message: 'Hey, how are you doing?',
      avatarImage: 'https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg',
      avatarColor: 'bg-purple-500',
      day: 'Tue',
      read: true,
      isText: false
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
      {/* Floating Action Button */}
      <button
        className={`fixed right-6 bottom-6 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-90 active:shadow-md z-40 ${openChat ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ backgroundColor: '#749cbf' }}
        aria-label={activeTab === 'calls' ? 'Start new call' : 'Add new'}
      >
        {activeTab === 'calls' ? (
          <svg 
            viewBox="0 0 20 20" 
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg" 
            fill="#ffffff"
          >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7319.000000)" fill="#ffffff">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path d="M142.8193,7165.2034 L140.4173,7165.1794 C139.9723,7165.1794 139.7613,7164.6534 140.0763,7164.3384 L143.7073,7160.7074 C144.0973,7160.3164 144.0973,7159.6834 143.7073,7159.2934 C143.3163,7158.9024 142.6833,7158.9024 142.2933,7159.2934 L138.6603,7162.9254 C138.3453,7163.2404 137.7943,7163.0044 137.7953,7162.5594 L137.7893,7160.1734 C137.7893,7159.6214 137.3203,7159.1524 136.7673,7159.1524 C136.2153,7159.1524 135.7763,7159.6074 135.7763,7160.1604 L135.7803,7165.1664 C135.7803,7166.2694 136.6783,7167.1674 137.7823,7167.1674 C138.5613,7167.1724 137.7333,7167.1704 142.7913,7167.1764 C143.3443,7167.1764 143.8013,7166.7374 143.8013,7166.1854 C143.8013,7165.6324 143.3713,7165.2034 142.8193,7165.2034 M138.1163,7174.5784 C137.4223,7174.2044 136.7183,7173.7774 135.9913,7173.4814 C134.5873,7172.9084 134.6823,7174.6014 133.6783,7175.1514 C132.2543,7175.9314 127.6203,7171.4154 127.8293,7170.0144 C127.9913,7168.9304 129.2743,7168.8754 128.9073,7167.5504 C128.7113,7166.8404 128.3603,7166.1414 128.0973,7165.4574 C127.7443,7164.5404 127.6003,7163.9524 126.5723,7164.0034 C125.8313,7164.0394 125.3383,7164.3564 124.8823,7164.9504 C123.6493,7166.5574 123.8353,7168.7254 124.6643,7170.4884 C126.9923,7175.4384 131.7423,7178.6794 135.1573,7178.9874 C136.4533,7179.1044 138.2663,7178.4024 138.7303,7176.9964 C138.6983,7177.0944 138.6663,7177.1884 138.6513,7177.2344 C138.6633,7177.1984 138.6873,7177.1274 138.7303,7176.9954 C138.7773,7176.8544 138.8003,7176.7824 138.8113,7176.7514 C138.7973,7176.7924 138.7653,7176.8904 138.7313,7176.9924 C139.1393,7175.7524 139.1883,7175.1554 138.1163,7174.5784 M138.6513,7177.2344 C138.6393,7177.2704 138.6413,7177.2654 138.6513,7177.2344 M138.8113,7176.7514 C138.8183,7176.7274 138.8193,7176.7254 138.8113,7176.7514" id="call-[#190]"></path>
                </g>
              </g>
            </g>
          </svg>
        ) : (
          <span className="text-3xl font-light">+</span>
        )}
      </button>

      <div className={`w-full max-w-md mx-auto bg-white relative transition-transform duration-300 ${openChat ? 'animate-push-left' : ''}`}>
        {/* Search Bar - Updated: White bg + ash white border */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200">
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
            {/* Stories Section - Larger avatars, thinner ring */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex gap-4 overflow-x-auto">
                {stories.map((story) => (
                  <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="relative">
                      {/* Thinner ring: p-0.5 → p-[1.5px] */}
                      <div 
                        className="p-[1.5px] rounded-full"
                        style={{
                          background: story.hasStory 
                            ? 'linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)'
                            : 'transparent'
                        }}
                      >
                        {/* Larger avatar: w-14 → w-16 */}
                        <div className={`w-16 h-16 rounded-full ${story.avatarColor} flex items-center justify-center text-white text-xl font-semibold ${story.hasStory ? 'border-2 border-white' : ''} overflow-hidden`}>
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
                        <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                          +
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{story.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversations - Bigger items */}
            {conversations.map((conv, idx) => (
              <div
                key={conv.id}
                onClick={() => handleConversationClick(conv)}
                className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors relative" // py-3 → py-4
              >
                {/* Larger avatar: w-12 → w-14 */}
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

                {/* Message Content - Larger name */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900"> {/* text-base → text-lg */}
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
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: '#749cbf' }}> {/* w-5 → w-6 */}
                      {conv.unread}
                    </div>
                  ) : conv.read ? (
                    // Checkmark color: #535358 → #749cbf
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5"> {/* w-4 → w-5 */}
                      <path stroke="#749cbf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17l5 5 12-12M16 20l2 2 12-12"></path>
                    </svg>
                  ) : null}
                </div>

                {/* Divider - Adjusted for larger avatar */}
                {idx < conversations.length - 1 && (
                  <div
                    className="absolute bottom-0 h-px bg-gray-200"
                    style={{
                      left: '4.5rem', // 4rem → 4.5rem
                      right: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : activeTab === 'calls' ? (
          <div>
            {/* Start New Call Header */}
            <div className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                  <line x1="18" y1="6" x2="18" y2="6" strokeWidth={1.5} strokeLinecap="round" />
                  <line x1="15" y1="6" x2="21" y2="6" strokeWidth={1.5} strokeLinecap="round" />
                  <line x1="18" y1="3" x2="18" y2="9" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
                <h2 className="text-lg font-normal text-blue-500">Start New Call</h2>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-3 bg-gray-50">
              <p className="text-gray-500 text-sm">
                You can add up to 200 participants to a call.
              </p>
            </div>
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
const style = document.createElement('style');
style.textContent = `
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

  /* Disable right-click and text selection */
  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  img {
    pointer-events: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;
document.head.appendChild(style);

export default MessagingHeader;
