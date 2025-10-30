// Chat.js – global Chat component
function Chat({ username, onClose }) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-in-right">
      {/* Header – very small bottom shadow, no border */}
      <header className="relative flex items-center justify-between px-4 py-3 bg-white shadow-xs">
        {/* Tiny transparent spacer to allow shadow to show */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-transparent -z-10 pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
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

          <div className="w-10 h-10 rounded-full bg-[#7CB342] flex items-center justify-center">
            <span className="text-white text-xl font-medium">C</span>
          </div>

          <div>
            <h1 className="text-gray-900 font-medium">{username}</h1>
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

/* ---- slide-in / slide-out animations + custom shadow ---- */
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

  /* Very small, subtle shadow */
  
.shadow-xs {
    box-shadow: -14px 1px 14px 5px rgba(0, 0, 0, 0.05);
}
`;
document.head.appendChild(chatStyle);
