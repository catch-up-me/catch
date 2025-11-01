const { useState } = React;

function Chat({ conversation, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-500 ease-in-out ${isClosing ? 'translate-x-full' : 'translate-x-0'}`} style={{ transform: isClosing ? 'translateX(100%)' : 'translateX(0)' }}>
      <header className="relative flex items-center justify-between px-4 py-3 bg-white shadow-sm">
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
            <div className="flex items-center gap-1">
              <h1 className="text-gray-900 font-medium">{conversation.name}</h1>
              <svg className="w-4 h-4 flex-shrink-0" fill="#5ab1dc" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#5ab1dc">
                <path d="M 23.6641 52.3985 C 26.6172 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6172 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6172 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6172 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 24.0391 39.7891 C 23.3126 39.7891 22.8438 39.5547 22.4923 39.1563 L 14.6641 30.4609 C 14.3360 30.0860 14.1485 29.6172 14.1485 29.125 C 14.1485 28.0234 14.9923 27.2031 16.1876 27.2031 C 16.8204 27.2031 17.2891 27.4141 17.7110 27.8594 L 23.9219 34.7266 L 35.9923 17.7344 C 36.4610 17.0547 36.9297 16.7734 37.7501 16.7734 C 38.8985 16.7734 39.7188 17.6172 39.7188 18.7188 C 39.7188 19.1172 39.5547 19.5860 39.2969 19.9609 L 25.6328 39.0625 C 25.2813 39.5078 24.7423 39.7891 24.0391 39.7891 Z"></path>
              </svg>
            </div>
            <p className="text-gray-500 text-xs">last seen Oct 15 at 06:54 PM</p>
          </div>
        </div>

        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
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

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg z-50 py-2">
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-800 text-base">Search</span>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                  </svg>
                  <span className="text-gray-800 text-base">Mute</span>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 11h4M19 9v4"/>
                  </svg>
                  <span className="text-gray-800 text-base">Add to contacts</span>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a1 1 0 100-2 1 1 0 000 2z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4"/>
                  </svg>
                  <span className="text-gray-800 text-base">Block user</span>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span className="text-red-500 text-base">Delete Chat</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 bg-white overflow-y-auto" style={{ 
        backgroundImage: 'url("https://i.ibb.co/HfvQJj50/Screenshot-20250730-222749.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundColor: 'transparent'
      }}>
        <div className="max-w-3xl mx-auto px-5 py-5">
          <div className="text-center my-5">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#d9d9d9', color: '#666' }}>
              May 30
            </span>
          </div>

          <div className="flex justify-start mb-2" style={{ animation: 'slideIn 0.3s ease-out' }}>
            <div className="relative max-w-[75%] bg-white rounded-lg px-2 pt-1 pb-2" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <div className="absolute bg-white" style={{ 
                left: '-8px', 
                top: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 0 20px 0',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
              }}></div>
              <div className="absolute bg-white" style={{ 
                left: '-8px', 
                bottom: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 20px 0 0',
                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
              }}></div>
              <div className="text-black text-base mb-0.5">Mykee Blogger</div>
              <div className="text-xs text-right mt-1" style={{ color: '#667781', marginLeft: '40px' }}>Tue 10:40 AM</div>
            </div>
          </div>

          <div className="flex justify-start mb-2" style={{ animation: 'slideIn 0.3s ease-out' }}>
            <div className="relative max-w-fit bg-white rounded-lg" style={{ padding: '8px 6px 6px 6px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <div className="absolute bg-white" style={{ 
                left: '-8px', 
                top: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 0 20px 0',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
              }}></div>
              <div className="absolute bg-white" style={{ 
                left: '-8px', 
                bottom: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 20px 0 0',
                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
              }}></div>
              <img 
                src="https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg" 
                alt="Received image" 
                className="block rounded mb-1 cursor-pointer"
                style={{ width: '100%', maxWidth: '250px', height: '260px', objectFit: 'cover' }}
                onClick={() => setSelectedImage({ src: 'https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg', sender: 'Chizaram', time: '10:42 AM' })}
              />
              <div className="text-xs text-right" style={{ color: '#667781' }}>Tue 10:42 AM</div>
            </div>
          </div>

          <div className="flex justify-end mb-2" style={{ animation: 'slideIn 0.3s ease-out' }}>
            <div className="relative max-w-fit rounded-lg" style={{ backgroundColor: '#d9fdd3', padding: '8px 6px 6px 6px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <div className="absolute" style={{ 
                backgroundColor: '#d9fdd3',
                right: '-8px', 
                top: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 0 0 20px',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)'
              }}></div>
              <div className="absolute" style={{ 
                backgroundColor: '#d9fdd3',
                right: '-8px', 
                bottom: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '20px 0 0 0',
                clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
              }}></div>
              <img 
                src="https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg" 
                alt="Sent image" 
                className="block rounded mb-1 cursor-pointer"
                style={{ width: '100%', maxWidth: '250px', height: '260px', objectFit: 'cover' }}
                onClick={() => setSelectedImage({ src: 'https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg', sender: 'Mykee', time: '08:52 PM' })}
              />
              <div className="text-xs text-right flex items-center justify-end gap-1" style={{ color: '#667781' }}>
                Wed 08:52 PM
                <svg viewBox="0 0 16 15" width="16" height="15" fill="#53bdeb">
                  <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-2" style={{ animation: 'slideIn 0.3s ease-out' }}>
            <div className="relative max-w-[75%] rounded-lg px-2 pt-1 pb-2" style={{ backgroundColor: '#d9fdd3', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <div className="absolute" style={{ 
                backgroundColor: '#d9fdd3',
                right: '-8px', 
                top: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 0 0 20px',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)'
              }}></div>
              <div className="absolute" style={{ 
                backgroundColor: '#d9fdd3',
                right: '-8px', 
                bottom: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '20px 0 0 0',
                clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
              }}></div>
              <div className="text-black text-base mb-0.5">Who be this</div>
              <div className="text-xs text-right flex items-center justify-end gap-1 mt-1" style={{ color: '#667781', marginLeft: '40px' }}>
                Thu 10:56 AM
                <svg viewBox="0 0 16 15" width="16" height="15" fill="#53bdeb">
                  <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-start mb-2" style={{ animation: 'slideIn 0.3s ease-out' }}>
            <div className="relative max-w-[75%] bg-white rounded-lg px-2 pt-1 pb-2" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <div className="absolute bg-white" style={{ 
                left: '-8px', 
                top: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 0 20px 0',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
              }}></div>
              <div className="absolute bg-white" style={{ 
                left: '-8px', 
                bottom: '0', 
                width: '20px', 
                height: '20px',
                borderRadius: '0 20px 0 0',
                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
              }}></div>
              <div className="text-black text-base mb-0.5">Messiah</div>
              <div className="text-xs text-right mt-1" style={{ color: '#667781', marginLeft: '40px' }}>Fri 10:58 AM</div>
            </div>
          </div>
        </div>
      </main>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black z-[100] flex flex-col"
          onClick={() => setSelectedImage(null)}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-white font-medium">{selectedImage.sender}</h1>
                <p className="text-gray-400 text-xs">Today at {selectedImage.time}</p>
              </div>
            </div>

            <button 
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center px-0">
            <img 
              src={selectedImage.src} 
              alt="Full size" 
              className="w-full object-contain"
              style={{ height: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
