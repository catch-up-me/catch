Chat.js:

const { useState } = React;

// Chat Component – refactored with separated components
function Chat({ conversation, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
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
      <Header conversation={conversation} onClose={handleClose} />

      <main className="flex-1 bg-white overflow-y-auto" style={{ 
        backgroundImage: 'url("https://i.ibb.co/HfvQJj50/Screenshot-20250730-222749.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundColor: 'transparent'
      }}>
        <div className="max-w-3xl mx-auto px-5 py-5">
          {/* DATE BUBBLE */}
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
