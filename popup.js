const { useState } = React;

// Image Viewer Component
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
