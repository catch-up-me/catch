// Story View Component
function StoryView() {
  const stories = [
    {
      id: 1,
      name: 'My story',
      avatar: 'M',
      avatarColor: 'bg-blue-500',
      hasStory: true
    },
    {
      id: 2,
      name: 'VaVia',
      avatar: 'V',
      avatarColor: 'bg-purple-500',
      hasStory: true
    }
  ];

  return (
    <div className="py-4">
      <div className="flex gap-4 px-4 overflow-x-auto">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
          >
            {/* Story Ring */}
            <div
              className="p-[3px] rounded-full"
              style={{
                background: 'linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)'
              }}
            >
              <div className="p-[3px] bg-white rounded-full">
                <div
                  className={`w-16 h-16 rounded-full ${story.avatarColor} flex items-center justify-center text-white text-2xl font-semibold`}
                >
                  {story.avatar}
                </div>
              </div>
            </div>
            
            {/* Story Name */}
            <span className="text-xs text-gray-600 max-w-[72px] truncate">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryView;
