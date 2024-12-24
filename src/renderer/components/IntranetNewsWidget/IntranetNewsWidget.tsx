import { Search, DragVertical, Minimize, Close } from '@carbon/icons-react';
import { useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
};

const dummyNews: NewsItem[] = [
  {
    id: '1',
    title: 'Q1 Performance Review',
    category: 'company',
    date: '2024-03-20',
    content: 'Company performance exceeded expectations in Q1...'
  },
  {
    id: '2',
    title: 'New Product Launch',
    category: 'announcement',
    date: '2024-03-19',
    content: 'Exciting new product features coming next month...'
  },
  {
    id: '3',
    title: 'Industry Conference',
    category: 'event',
    date: '2024-03-18',
    content: 'Join us at the annual industry conference...'
  }
];

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    company: 'bg-blue-500',
    announcement: 'bg-purple-500',
    event: 'bg-green-500',
    training: 'bg-yellow-500'
  };
  return colors[category] || 'bg-gray-500';
};

export const IntranetNewsWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleMinimize = () => {
    window.electron?.minimizeIntranetNews();
  };

  const handleClose = () => {
    window.electron?.closeIntranetNews();
  };

  const filteredNews = dummyNews.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Title Bar */}
      <div className="titlebar bg-gray-800 border-b border-gray-700">
        <div className="titlebar-content">
          <div className="titlebar-left">
            <DragVertical className="titlebar-icon text-gray-400" />
            <span className="titlebar-text">Company News</span>
          </div>
          <div className="titlebar-controls flex gap-2">
            <button onClick={handleMinimize} className="titlebar-button text-gray-400 hover:text-white">
              <Minimize size={20} />
            </button>
            <button onClick={handleClose} className="titlebar-button text-gray-400 hover:text-white">
              <Close size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md 
                     border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* News List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {filteredNews.map(news => (
            <div 
              key={news.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{news.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(news.category)}`}>
                  {news.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{news.content}</p>
              <div className="text-xs text-gray-500">
                {new Date(news.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 