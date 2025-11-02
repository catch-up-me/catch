const { useState } = React;

// Hook for swipe-to-reply functionality
function useSwipeToReply() {
  const [touchStartX, setTouchStartX] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e, onResetSwipe) => {
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

  const handleTouchEnd = (onResetSwipe) => {
    setIsDragging(false);
    setTimeout(() => {
      setCurrentOffset(0);
      onResetSwipe();
    }, 200);
  };

  return {
    touchStartX,
    currentOffset,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}

// Sent Message Component with Swipe
function SentMessage({ id, content, time, isImage, imageSrc, swipedMessageId, swipeOffset, onSwipe, onResetSwipe, onImageClick }) {
  const {
    currentOffset,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSwipeToReply();

  const isThisMessageSwiped = swipedMessageId === id;
  const displayOffset = isDragging ? currentOffset : (isThisMessageSwiped ? 80 : 0);

  return (
    <div 
      className="flex justify-end mb-2 relative"
      style={{ animation: 'slideIn 0.3s ease-out', touchAction: 'pan-y' }}
      onTouchStart={(e) => handleTouchStart(e, onResetSwipe)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => handleTouchEnd(onResetSwipe)}
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
          padding: isImage ? '8px 6px 6px 6px' : '6px 8px 4px 8px',
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
  const {
    currentOffset,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSwipeToReply();

  const isThisMessageSwiped = swipedMessageId === id;
  const displayOffset = isDragging ? currentOffset : (isThisMessageSwiped ? 80 : 0);

  return (
    <div 
      className="flex justify-start mb-2 relative"
      style={{ animation: 'slideIn 0.3s ease-out', touchAction: 'pan-y' }}
      onTouchStart={(e) => handleTouchStart(e, onResetSwipe)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => handleTouchEnd(onResetSwipe)}
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
          padding: isImage ? '8px 6px 6px 6px' : '6px 8px 4px 8px',
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
