// App.js
const Search = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const Menu = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white px-4 py-6 flex items-center justify-between">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#749cbf" stroke="#749cbf" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <h1 className="text-xl font-medium text-gray-800">Message</h1>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-6 h-6 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="bg-white p-6">
        {/* Your content goes here */}
      </main>
    </div>
  );
}
