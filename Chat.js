const { useState } = React;

// Sent Message Component with Swipe
function SentMessage({ id, content, time, isImage, imageSrc, swipedMessageId, swipeOffset, onSwipe, onResetSwipe, onImageClick }) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
    onResetSwipe();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const offset = touchX - touchStartX;
    if (offset > 0 && offset <= 80) {
      setCurrentOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setCurrentOffset(0);
      onResetSwipe();
    }, 200);
  };

  const isThisMessageSwiped = swipedMessageId === id;
  const displayOffset = isDragging ? currentOffset : (isThisMessageSwiped ? 80 : 0);

  return (
    <div 
      className="flex justify-end mb-2 relative"
      style={{ animation: 'slideIn 0.3s ease-out', touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full transition-opacity duration-200"
        style={{ 
          opacity: displayOffset > 30 ? 1 : 0,
          zIndex: 0,
          marginLeft: '16px'
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#749cbf' }}>
          <Icons.Reply />
        </div>
      </div>

      <div 
        className="relative rounded-lg"
        style={{ 
          backgroundColor: '#d9fdd3',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          transform: `translateX(${displayOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          maxWidth: isImage ? 'fit-content' : '75%',
          padding: isImage ? '8px 6px 6px 6px' : '6px 8px 4px 8px', // Reduced vertical padding
          zIndex: 1
        }}
      >
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

        {isImage ? (
          <>
            <img 
              src={imageSrc} 
              alt="Sent image" 
              className="block rounded mb-1 cursor-pointer"
              style={{ width: '100%', maxWidth: '250px', height: '260px', objectFit: 'cover', pointerEvents: 'auto' }}
              onClick={onImageClick}
            />
            <div className="text-xs text-right flex items-center justify-end gap-1" style={{ color: '#667781' }}>
              {time}
              <Icons.DoubleCheck />
            </div>
          </>
        ) : (
          <>
            <div className="text-black text-base mb-0" style={{ lineHeight: '1.3' }}>{content}</div>
            <div className="text-xs text-right flex items-center justify-end gap-0.5" style={{ color: '#667781', marginLeft: '32px', marginTop: '-2px' }}>
              {time}
              <Icons.DoubleCheck />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Received Message Component with Swipe
function ReceivedMessage({ id, content, time, isImage, imageSrc, swipedMessageId, swipeOffset, onSwipe, onResetSwipe, onImageClick }) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
    onResetSwipe();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const offset = touchX - touchStartX;
    if (offset > 0 && offset <= 80) {
      setCurrentOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setCurrentOffset(0);
      onResetSwipe();
    }, 200);
  };

  const isThisMessageSwiped = swipedMessageId === id;
  const displayOffset = isDragging ? currentOffset : (isThisMessageSwiped ? 80 : 0);

  return (
    <div 
      className="flex justify-start mb-2 relative"
      style={{ animation: 'slideIn 0.3s ease-out', touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ 
          opacity: displayOffset > 30 ? 1 : 0,
          zIndex: 0
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#749cbf' }}>
          <Icons.Reply />
        </div>
      </div>

      <div 
        className="relative bg-white rounded-lg"
        style={{ 
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          transform: `translateX(${displayOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          maxWidth: isImage ? 'fit-content' : '75%',
          padding: isImage ? '8px 6px 6px 6px' : '6px 8px 4px 8px', // Reduced vertical padding
          zIndex: 1
        }}
      >
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

        {isImage ? (
          <>
            <img 
              src={imageSrc} 
              alt="Received image" 
              className="block rounded mb-1 cursor-pointer"
              style={{ width: '100%', maxWidth: '250px', height: '260px', objectFit: 'cover', pointerEvents: 'auto' }}
              onClick={onImageClick}
            />
            <div className="text-xs text-right" style={{ color: '#667781' }}>{time}</div>
          </>
        ) : (
          <>
            <div className="text-black text-base mb-0" style={{ lineHeight: '1.3' }}>{content}</div>
            <div className="text-xs text-right" style={{ color: '#667781', marginLeft: '48px', marginTop: '-2px' }}>{time}</div>
          </>
        )}
      </div>
    </div>
  );
}

// Image Viewer Component (Unchanged)
function ImageViewer({ images, currentIndex, onClose, onIndexChange }) {
  const [index, setIndex] = useState(currentIndex);
  const [showMenu, setShowMenu] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVerticalSwipe, setIsVerticalSwipe] = useState(false);

  const minSwipeDistance = 50;
  const minVerticalSwipeDistance = 150;

  const nextImage = () => {
    if (index < images.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  const prevImage = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchEndY(0);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setIsDragging(true);
    setIsVerticalSwipe(false);
  };

  const onTouchMove = (e) => {
    const currentTouchX = e.targetTouches[0].clientX;
    const currentTouchY = e.targetTouches[0].clientY;
    setTouchEnd(currentTouchX);
    setTouchEndY(currentTouchY);
    
    const diffX = Math.abs(touchStart - currentTouchX);
    const diffY = Math.abs(touchStartY - currentTouchY);
    
    if (!isVerticalSwipe && diffY > diffX && diffY > 30) {
      setIsVerticalSwipe(true);
    }
    
    if (isVerticalSwipe) {
      e.preventDefault();
      const verticalDiff = currentTouchY - touchStartY;
      if (verticalDiff > 0) {
        setTranslateY(verticalDiff);
      }
    } else {
      const horizontalDiff = touchStart - currentTouchX;
      setTranslateX(-horizontalDiff);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    
    if (isVerticalSwipe) {
      const verticalDistance = touchEndY - touchStartY;
      
      if (verticalDistance > minVerticalSwipeDistance) {
        onClose();
      } else {
        setTranslateY(0);
      }
      
      setIsVerticalSwipe(false);
    } else {
      setTranslateX(0);
      
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        nextImage();
      } else if (isRightSwipe) {
        prevImage();
      }
    }
  };

  const currentImage = images[index];

  return (
    <div 
      className="fixed inset-0 bg-black z-[100] flex flex-col transition-transform"
      style={{ 
        userSelect: 'none', 
        WebkitTapHighlightColor: 'transparent',
        transform: `translateY(${translateY}px)`,
        transitionDuration: isDragging ? '0ms' : '300ms',
        opacity: translateY > 0 ? Math.max(0.3, 1 - (translateY / 400)) : 1
      }}
    >
      <div 
        className="flex items-center justify-between px-4 py-3 transition-opacity duration-200"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          opacity: controlsVisible ? 1 : 0
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Icons.Close />
          </button>
          <div>
            <h1 className="text-white font-medium text-lg">{currentImage.sender}</h1>
            <p className="text-gray-400 text-sm">{currentImage.time}</p>
          </div>
        </div>

        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icons.MenuVertical />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-[110]" 
                onClick={() => setShowMenu(false)}
              ></div>
              <div 
                className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden z-[120]"
                style={{ backgroundColor: '#1a1a1a', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
              >
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left text-white text-sm">
                  <Icons.Download />
                  <span>Download</span>
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left text-white text-sm">
                  <Icons.Share />
                  <span>Share</span>
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left text-red-500 text-sm">
                  <Icons.Delete color="#ef4444" />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div 
        className="flex-1 flex items-center justify-center overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => setControlsVisible(!controlsVisible)}
        style={{ touchAction: 'none' }}
      >
        <div 
          className="flex transition-transform w-full h-full"
          style={{ 
            transform: isDragging ? `translateX(calc(-${index * 100}% + ${translateX}px))` : `translateX(-${index * 100}%)`,
            transitionDuration: isDragging ? '0ms' : '300ms'
          }}
        >
          {images.map((img, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
              style={{ minWidth: '100%' }}
            >
              <img 
                src={img.src} 
                alt={img.caption}
                className="object-contain"
                style={{ 
                  pointerEvents: 'none',
                  width: '100%',
                  height: 'auto',
                  maxHeight: '100vh'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div 
        className="px-6 py-4 flex items-center justify-between transition-opacity duration-200"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          opacity: controlsVisible ? 1 : 0
        }}
      >
        <div className="text-gray-300 text-sm flex-1 mr-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {currentImage.caption}
        </div>
        <div className="text-gray-500 text-sm flex-shrink-0">
          {index + 1} of {images.length}
        </div>
      </div>
    </div>
  );
}

// Chat Component – with updated date bubble padding
function Chat({ conversation, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipedMessageId, setSwipedMessageId] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const images = [
    {
      src: 'https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg',
      sender: 'Chizaram',
      time: 'Tue 10:42 AM',
      caption: 'Photo from Chizaram'
    },
    {
      src: 'https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg',
      sender: 'Mykee',
      time: 'Wed 08:52 PM',
      caption: 'Photo from Mykee'
    }
  ];

  const handleMessageSwipe = (messageId, touchStartX, touchEndX) => {
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > 50) {
      setSwipedMessageId(messageId);
      setSwipeOffset(Math.min(swipeDistance, 80));
    } else {
      setSwipedMessageId(null);
      setSwipeOffset(0);
    }
  };

  const resetSwipe = () => {
    setSwipedMessageId(null);
    setSwipeOffset(0);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-500 ease-in-out ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}>
      <header className="relative flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Icons.BackArrow />
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
              <Icons.Verified />
            </div>
            <p className="text-gray-500 text-xs">last seen Oct 15 at 06:54 PM</p>
          </div>
        </div>

        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icons.MenuVertical color="#4b5563" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)}></div>
              <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg z-50 py-2">
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <Icons.SearchMenu />
                  <span className="text-gray-800 text-base">Search</span>
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <Icons.Mute />
                  <span className="text-gray-800 text-base">Mute</span>
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <Icons.AddContact />
                  <span className="text-gray-800 text-base">Add to contacts</span>
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <Icons.Block />
                  <span className="text-gray-800 text-base">Block user</span>
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                  <Icons.Delete color="#ef4444" />
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
          {/* DATE BUBBLE – increased vertical padding */}
          <div className="text-center my-3">
            <span 
              className="inline-block px-3 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: '#d9d9d9', 
                color: '#666',
                paddingTop: '6px',
                paddingBottom: '6px'
              }}
            >
              May 30
            </span>
          </div>

          <ReceivedMessage
            id="msg1"
            content="Mykee Blogger"
            time="Tue 10:40 AM"
            swipedMessageId={swipedMessageId}
            swipeOffset={swipeOffset}
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
          />

          <ReceivedMessage
            id="msg2"
            isImage={true}
            imageSrc="https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg"
            time="Tue 10:42 AM"
            swipedMessageId={swipedMessageId}
            swipeOffset={swipeOffset}
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
            onImageClick={() => {
              setCurrentImageIndex(0);
              setSelectedImage(images[0]);
            }}
          />

          <SentMessage
            id="msg-sent-1"
            isImage={true}
            imageSrc="https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg"
            time="Wed 08:52 PM"
            swipedMessageId={swipedMessageId}
            swipeOffset={swipeOffset}
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
            onImageClick={() => {
              setCurrentImageIndex(1);
              setSelectedImage(images[1]);
            }}
          />

          <SentMessage
            id="msg-sent-2"
            content="Who be this"
            time="Thu 10:56 AM"
            swipedMessageId={swipedMessageId}
            swipeOffset={swipeOffset}
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
          />

          <ReceivedMessage
            id="msg3"
            content="Messiah"
            time="Fri 10:58 AM"
            swipedMessageId={swipedMessageId}
            swipeOffset={swipeOffset}
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
          />
        </div>
      </main>

      {selectedImage && <ImageViewer 
        images={images}
        currentIndex={currentImageIndex}
        onClose={() => setSelectedImage(null)}
        onIndexChange={setCurrentImageIndex}
      />}
    </div>
  );
}
