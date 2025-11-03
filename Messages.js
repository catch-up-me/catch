const { useState, useEffect, useRef } = React;

function Messages() {
  const [message, setMessage] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const msgRef = useRef(null);

  const updateContent = (e) => {
    setMessage(e.currentTarget.textContent);
  };

  const toggleEmojiPicker = (e) => {
    e.stopPropagation();
    setEmojiOpen(!emojiOpen);
  };

  const handleMessageClick = () => {
    if (emojiOpen) {
      setEmojiOpen(false);
    }
  };

  useEffect(() => {
    if (msgRef.current) {
      if (message.trim() === '') {
        msgRef.current.classList.add('empty');
      } else {
        msgRef.current.classList.remove('empty');
      }
    }
  }, [message]);

  return (
    <>
      <style>{`
        :root { box-sizing: border-box; }
        *, *::before, *::after { box-sizing: inherit; }

        .chat-container {
          position: fixed;
          bottom: 14px;
          left: 0;
          width: 100%;
          max-width: 520px;
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 0 10px 0 0;
          z-index: 999;
          transition: bottom 0.3s ease;
        }

        .chat-container.emoji-open {
          bottom: 294px;
        }

        .content-div {
          position: relative;
          flex: 1 1 auto;
          background: #fff;
          border-radius: 18px;
          padding: 10px 15px;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          margin-left: 0;
          max-height: 150px;
        }

        .content-div::before {
          content: "";
          position: absolute;
          right: -6px;
          bottom: 0;
          width: 12px;
          height: 19px;
          background: #fff;
          border-bottom-left-radius: 15px 14px;
        }
        
        .content-div::after {
          content: "";
          position: absolute;
          right: -6px;
          bottom: 0;
          width: 6px;
          height: 19px;
          background: #ffffff;
          border-bottom-left-radius: 10px;
        }

        .emoji-btn,
        .attach-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .emoji-btn i,
        .attach-btn i {
          font-size: 20px;
          color: #777;
        }

        .message-content {
          flex: 1 1 auto;
          min-width: 0;
          color: #444;
          font-size: 16px;
          margin: 0;
          min-height: 22px;
          max-height: 120px;
          outline: none;
          border: none;
          caret-color: #333;
          overflow-y: auto;
          padding-bottom: 4px;
          line-height: 1.4;
          word-wrap: break-word;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }

        .message-content.empty::before {
          content: attr(data-placeholder);
          color: #aaa;
          pointer-events: none;
          display: block;
          white-space: normal;
          overflow-wrap: anywhere;
          line-height: 1.4;
        }

        .message-content:focus.empty::before {
          content: none;
        }

        .mic-btn {
          width: 60px;
          height: 60px;
          background: #1e90ff;
          border: none;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          position: relative;
          top: 4px;
          transition: background 0.3s ease;
          flex: 0 0 auto;
        }

        .mic-btn:hover { background: #3ba0ff; }
        .mic-btn svg { width: 28px; height: 28px; display: block; }

        @media (max-width: 480px) {
          .mic-btn { width: 54px; height: 54px; top: 3px; }
          .mic-btn svg { width: 26px; height: 26px; }
          .content-div { padding: 8px 12px; border-radius: 15px; }
        }

        .emoji-picker {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: #0d1418;
          transition: height 0.3s ease;
          z-index: 998;
          overflow: hidden;
        }
        
        .emoji-picker.active { height: 280px; }
        .emoji-content { background: #fff; height: 100%; padding: 20px 15px; overflow-y: auto; }
        .emoji-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 8px; }
        .emoji-item { font-size: 32px; text-align: center; cursor: pointer; padding: 8px; }
      `}</style>

      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div className={`emoji-picker ${emojiOpen ? 'active' : ''}`}>
        <div className="emoji-content">
          <div className="emoji-grid"></div>
        </div>
      </div>

      <div className={`chat-container ${emojiOpen ? 'emoji-open' : ''}`}>
        <div className="content-div">
          <button 
            className="emoji-btn" 
            aria-label="Open emoji picker"
            onClick={toggleEmojiPicker}
          >
            <i className="fa-regular fa-face-smile"></i>
          </button>

          <div 
            ref={msgRef}
            className="message-content empty" 
            contentEditable="true" 
            data-placeholder="Message"
            onInput={updateContent}
            onClick={handleMessageClick}
            suppressContentEditableWarning
          ></div>

          <button className="attach-btn" aria-label="Attach file">
            <i className="fa-solid fa-paperclip"></i>
          </button>
        </div>

        <button className="mic-btn" aria-label="Record voice">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7V11C16.75 13.6234 14.6234 15.75 12 15.75C9.37665 15.75 7.25 13.6234 7.25 11V7Z" fill="#ffffff"/>
            <path d="M5.75 10C5.75 9.58579 5.41421 9.25 5 9.25C4.58579 9.25 4.25 9.58579 4.25 10V11C4.25 15.0272 7.3217 18.3369 11.25 18.7142V21C11.25 21.4142 11.5858 21.75 12 21.75C12.4142 21.75 12.75 21.4142 12.75 21V18.7142C16.6783 18.3369 19.75 15.0272 19.75 11V10C19.75 9.58579 19.4142 9.25 19 9.25C18.5858 9.25 18.25 9.58579 18.25 10V11C18.25 14.4518 15.4518 17.25 12 17.25C8.54822 17.25 5.75 14.4518 5.75 11V10Z" fill="#ffffff"/>
          </svg>
        </button>
      </div>
    </>
  );
}
