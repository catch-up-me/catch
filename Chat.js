const { useState } = React;

// Icons (Placeholder – replace with your actual SVG icons)
const Icons = {
  Reply: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>,
  DoubleCheck: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#4fc3f7"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 10-10-1.4-1.4z"/></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
  MenuVertical: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>,
  Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>,
  Share: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-2 .77l-7.13-4.13c.14-.4.26-.82.26-1.27 0-.45-.12-.87-.26-1.27l7.13-4.13c.56.47 1.24.77 2 .77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .45.12.87.26 1.27L7.87 12.9c-.56-.47-1.24-.77-2-.77-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 2-.77l7.13 4.13c-.14.4-.26.82-.26 1.27 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/></svg>,
  Delete: ({ color = "currentColor" }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={color}><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  BackArrow: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#4b5563"><path d="M20 11H7.83l5.31-5.31-1.42-1.42L4 12l7.72 7.72 1.42-1.42L7.83 13H20v-2z"/></svg>,
  Verified: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
  SearchMenu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
  Mute: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.03c2.89.86 5 3.54 5 6.74zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.46 2.6-1.23 3.63-2.21l3.1 3.1L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>,
  AddContact: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
  Block: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.54 1.69-4.9L16.9 18.31C15.54 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.46 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.54-1.69 4.9z"/></svg>,
};

// Sent Message Component (FIXED: Bounce-back swipe)
function SentMessage({ id, content, time, isImage, imageSrc, swipedMessageId, onSwipe, onResetSwipe, onImageClick }) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setIsDragging(true);
    onResetSwipe();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = Math.abs(touch.clientY - touchStartY);

    if (diffY > Math.abs(diffX) && diffY > 10) {
      setIsDragging(false);
      return;
    }

    if (diffX > 15 && diffX <= 80) {
      setCurrentOffset(diffX);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (currentOffset > 50) {
      onSwipe(id);
      setCurrentOffset(80);
    } else {
      setCurrentOffset(0); // Bounces back
    }

    setIsDragging(false);
  };

  const isThisMessageSwiped = swipedMessageId === id;
  const displayOffset = isDragging
    ? currentOffset
    : (isThisMessageSwiped ? 80 : 0);

  return (
    <div 
      className="flex justify-end mb-2 relative"
      style={{ animation: 'slideIn 0.3s ease-out' }}
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
          transition: isDragging 
            ? 'none' 
            : 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring bounce
          maxWidth: isImage ? 'fit-content' : '75%',
          padding: isImage ? '8px 6px 6px 6px' : '6px 8px 4px 8px',
          zIndex: 1
        }}
      >
        <div className="absolute" style={{ 
          backgroundColor: '#d9fdd3',
          right: '-8px', top: '0', width: '20px', height: '20px',
          borderRadius: '0 0 0 20px',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
        <div className="absolute" style={{ 
          backgroundColor: '#d9fdd3',
          right: '-8px', bottom: '0', width: '20px', height: '20px',
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

// Received Message Component (FIXED: Bounce-back swipe)
function ReceivedMessage({ id, content, time, isImage, imageSrc, swipedMessageId, onSwipe, onResetSwipe, onImageClick }) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setIsDragging(true);
    onResetSwipe();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = Math.abs(touch.clientY - touchStartY);

    if (diffY > Math.abs(diffX) && diffY > 10) {
      setIsDragging(false);
      return;
    }

    if (diffX > 15 && diffX <= 80) {
      setCurrentOffset(diffX);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (currentOffset > 50) {
      onSwipe(id);
      setCurrentOffset(80);
    } else {
      setCurrentOffset(0);
    }

    setIsDragging(false);
  };

  const isThisMessageSwiped = swipedMessageId === id;
  const displayOffset = isDragging
    ? currentOffset
    : (isThisMessageSwiped ? 80 : 0);

  return (
    <div 
      className="flex justify-start mb-2 relative"
      style={{ animation: 'slideIn 0.3s ease-out' }}
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
          transition: isDragging 
            ? 'none' 
            : 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
          maxWidth: isImage ? 'fit-content' : '75%',
          padding: isImage ? '8px 6px 6px 6px' : '6px 8px 4px 8px',
          zIndex: 1
        }}
      >
        <div className="absolute bg-white" style={{ 
          left: '-8px', top: '0', width: '20px', height: '20px',
          borderRadius: '0 0 20px 0',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
        }}></div>
        <div className="absolute bg-white" style={{ 
          left: '-8px', bottom: '0', width: '20px', height: '20px',
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

// ImageViewer and Chat components remain unchanged (for brevity)
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
      if (isLeftSwipe) nextImage();
      else if (isRightSwipe) prevImage();
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
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
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
              <div className="fixed inset-0 z-[110]" onClick={() => setShowMenu(false)}></div>
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

// Chat Component
function Chat({ conversation, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipedMessageId, setSwipedMessageId] = useState(null);

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

  const handleMessageSwipe = (messageId) => {
    setSwipedMessageId(messageId);
  };

  const resetSwipe = () => {
    setSwipedMessageId(null);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 500);
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
          <div className="text-center my-4">
            <span 
              className="inline-block px-4 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: '#d9d9d9', 
                color: '#666',
                paddingTop: '8px',
                paddingBottom: '8px',
                lineHeight: '1.4'
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
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
          />

          <ReceivedMessage
            id="msg2"
            isImage={true}
            imageSrc="https://i.ibb.co/C5b875C6/Screenshot-20250904-050841.jpg"
            time="Tue 10:42 AM"
            swipedMessageId={swipedMessageId}
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
            onSwipe={handleMessageSwipe}
            onResetSwipe={resetSwipe}
          />

          <ReceivedMessage
            id="msg3"
            content="Messiah"
            time="Fri 10:58 AM"
            swipedMessageId={swipedMessageId}
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

// Demo usage
function App() {
  const conversation = {
    name: "Mykee Blogger",
    avatar: "MB",
    avatarColor: "bg-blue-500",
    isText: true
  };

  return <Chat conversation={conversation} onClose={() => console.log("Closed")} />;
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
