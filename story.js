// story.js
// This file defines StoryItem globally — no export needed

function StoryItem() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-dashed border-gray-300 mb-4"></div>
      <p className="text-gray-600 text-base font-medium">No stories yet</p>
      <p className="text-gray-400 text-sm mt-1">When your friends post stories, they'll appear here</p>
    </div>
  );
}

// Make it globally available so App.js can use it
window.StoryItem = StoryItem;
