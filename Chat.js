// Chat.js  –  global Chat component
function Chat({ username, onClose }) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-100">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{username}</h1>
      </header>

      {/* Empty body – messages will go here later */}
      <main className="flex-1 bg-white"></main>
    </div>
  );
}

/* ---- slide-in / slide-out animations ---- */
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
`;
document.head.appendChild(chatStyle);
