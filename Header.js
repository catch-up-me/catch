const { useState } = React;

function Header({ conversation, onClose }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
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
  );
}
