const { useState, useRef } = React;

// Image Viewer Component with Zoom
function ImageViewer({ images, currentIndex, onClose, onIndexChange }) {
  const [index, setIndex] = useState(currentIndex);
  const [showMenu, setShowMenu] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  
  // Zoom states
  const [scale, setScale] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  
  // Refs for touch handling
  const lastTap = useRef(0);
  const initialPinchDistance = useRef(0);
  const initialScale = useRef(1);
  const lastPosX = useRef(0);
  const lastPosY = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isPanning = useRef(false);
  const isPinching = useRef(false);
  const isSwipingVertical = useRef(false);
  const isSwipingHorizontal = useRef(false);
  const verticalSwipeOffset = useRef(0);
  const horizontalSwipeOffset = useRef(0);

  const minScale = 1;
  const maxScale = 4;

  const getDistance = (touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const resetZoom = () => {
    setScale(1);
    setPosX(0);
    setPosY(0);
  };

  const nextImage = () => {
    if (index < images.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      onIndexChange(newIndex);
      resetZoom();
    }
  };

  const prevImage = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      onIndexChange(newIndex);
      resetZoom();
    }
  };

  const handleTouchStart = (e) => {
    const touches = e.touches;

    if (touches.length === 2) {
      // Start pinch zoom
      isPinching.current = true;
      initialPinchDistance.current = getDistance(touches[0], touches[1]);
      initialScale.current = scale;
      lastPosX.current = posX;
      lastPosY.current = posY;
    } else if (touches.length === 1) {
      touchStartX.current = touches[0].clientX;
      touchStartY.current = touches[0].clientY;
      lastPosX.current = posX;
      lastPosY.current = posY;

      if (scale > 1) {
        isPanning.current = true;
      }
    }
  };

  const handleTouchMove = (e) => {
    const touches = e.touches;

    if (touches.length === 2 && isPinching.current) {
      // Pinch zoom
      e.preventDefault();
      const currentDistance = getDistance(touches[0], touches[1]);
      const scaleChange = currentDistance / initialPinchDistance.current;
      let newScale = initialScale.current * scaleChange;

      newScale = Math.max(minScale, Math.min(maxScale, newScale));
      setScale(newScale);

    } else if (touches.length === 1) {
      const currentX = touches[0].clientX;
      const currentY = touches[0].clientY;
      const deltaX = currentX - touchStartX.current;
      const deltaY = currentY - touchStartY.current;

      if (scale > 1 && isPanning.current) {
        // Pan when zoomed
        e.preventDefault();
        setPosX(lastPosX.current + deltaX);
        setPosY(lastPosY.current + deltaY);
      } else if (scale === 1) {
        // Determine swipe direction
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (!isSwipingVertical.current && !isSwipingHorizontal.current) {
          if (absY > 30 && absY > absX) {
            isSwipingVertical.current = true;
          } else if (absX > 30 && absX > absY) {
            isSwipingHorizontal.current = true;
          }
        }

        if (isSwipingVertical.current && deltaY > 0) {
          e.preventDefault();
          verticalSwipeOffset.current = deltaY;
        } else if (isSwipingHorizontal.current) {
          horizontalSwipeOffset.current = deltaX;
        }
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isPinching.current) {
      isPinching.current = false;
      if (scale < 1.1) {
        resetZoom();
      }
    } else if (isPanning.current) {
      isPanning.current = false;
      
      // Check for double tap even when panning (for zoomed state)
      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;
      
      if (tapGap < 300 && tapGap > 0) {
        // Double tap detected while zoomed - reset
        resetZoom();
        lastTap.current = 0; // Reset to prevent triple tap issues
      } else {
        lastTap.current = currentTime;
      }
    } else if (isSwipingVertical.current) {
      if (verticalSwipeOffset.current > 150) {
        onClose();
      }
      isSwipingVertical.current = false;
      verticalSwipeOffset.current = 0;
    } else if (isSwipingHorizontal.current) {
      const threshold = 50;
      if (horizontalSwipeOffset.current < -threshold) {
        nextImage();
      } else if (horizontalSwipeOffset.current > threshold) {
        prevImage();
      }
      isSwipingHorizontal.current = false;
      horizontalSwipeOffset.current = 0;
    } else {
      // Handle single tap / double tap
      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;

      if (tapGap < 300 && tapGap > 0) {
        // Double tap detected
        if (scale === 1) {
          const touch = e.changedTouches[0];
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const touchX = touch.clientX - rect.left;
          const touchY = touch.clientY - rect.top;

          setScale(2.5);
          setPosX((centerX - touchX) * 1.5);
          setPosY((centerY - touchY) * 1.5);
        } else {
          resetZoom();
        }
        lastTap.current = 0; // Reset to prevent triple tap issues
      } else {
        // Single tap - toggle controls
        setControlsVisible(!controlsVisible);
        lastTap.current = currentTime;
      }
    }
  };

  const currentImage = images[index];

  return (
    <div 
      className="fixed inset-0 bg-black z-[100] flex flex-col"
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div 
        className="flex items-center justify-between px-4 py-3 transition-opacity duration-200 relative z-[150]"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          opacity: controlsVisible ? 1 : 0,
          pointerEvents: controlsVisible ? 'auto' : 'none'
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

        <div className="relative z-[160]">
          <button 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icons.MenuVertical />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-[170]" 
                onClick={() => setShowMenu(false)}
              ></div>
              <div 
                className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden z-[180]"
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
        className="flex-1 flex items-center justify-center overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          touchAction: 'none',
          transform: isSwipingVertical.current ? `translateY(${verticalSwipeOffset.current}px)` : 'none',
          opacity: verticalSwipeOffset.current > 0 ? Math.max(0.3, 1 - (verticalSwipeOffset.current / 400)) : 1
        }}
      >
        <div 
          className="absolute inset-0 flex"
          style={{
            transform: scale === 1 ? `translateX(calc(-${index * 100}% + ${isSwipingHorizontal.current ? horizontalSwipeOffset.current : 0}px))` : 'none',
            transition: isSwipingHorizontal.current || isPinching.current || isPanning.current ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
              style={{ 
                minWidth: '100%',
                visibility: scale > 1 ? (idx === index ? 'visible' : 'hidden') : 'visible'
              }}
            >
              <img 
                src={img.src} 
                alt={img.caption}
                draggable="false"
                style={{ 
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `scale(${scale}) translate(${posX / scale}px, ${posY / scale}px)`,
                  transition: isPinching.current || isPanning.current ? 'none' : 'transform 0.2s ease-out',
                  transformOrigin: 'center center'
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
          opacity: controlsVisible ? 1 : 0,
          pointerEvents: controlsVisible ? 'auto' : 'none'
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
