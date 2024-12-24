import { DragVertical, Close } from '@carbon/icons-react';

type Widget = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

const availableWidgets: Widget[] = [
  {
    id: 'loan-pipeline',
    name: 'Loan Pipeline',
    description: 'Track and manage loan applications',
  },
  {
    id: 'intranet-news',
    name: 'Company News',
    description: 'Stay updated with company announcements',
  }
];

export const LauncherWidget = () => {
  const handleLaunchWidget = (widgetId: string) => {
    window.electron?.launchWidget(widgetId);
  };

  const handleClose = () => {
    window.electron?.closeLauncher();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="titlebar bg-gray-800 border-b border-gray-700">
        <div className="titlebar-content">
          <div className="titlebar-left">
            <DragVertical className="titlebar-icon text-gray-400" />
            <span className="titlebar-text">Widget Launcher</span>
          </div>
          <div className="titlebar-controls">
            <button 
              onClick={handleClose} 
              className="titlebar-button text-gray-400 hover:text-white"
            >
              <Close size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Available Widgets</h2>
        {availableWidgets.map(widget => (
          <div 
            key={widget.id}
            onClick={() => handleLaunchWidget(widget.id)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 
                     transition-all cursor-pointer border border-gray-700
                     hover:border-gray-600"
          >
            <h3 className="font-medium text-white mb-1">{widget.name}</h3>
            <p className="text-sm text-gray-400">{widget.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 