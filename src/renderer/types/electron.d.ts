export {};

declare global {
  interface Window {
    electron: {
      launchWidget: (widgetId: string) => void;
      closeLauncher: () => void;
      minimize: () => void;
      close: () => void;
      minimizeIntranetNews: () => void;
      closeIntranetNews: () => void;
    };
  }
} 