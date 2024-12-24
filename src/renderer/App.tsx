import { LauncherWidget } from './components/LauncherWidget/LauncherWidget';
import { LoanPipelineWidget } from './components/LoanPipelineWidget/LoanPipelineWidget';
import { IntranetNewsWidget } from './components/IntranetNewsWidget/IntranetNewsWidget';

function App() {
  // Get the exact path without the '#'
  const path = window.location.hash.replace('#', '');
  
  console.log('Current route path:', path); // Debug log

  // Explicit path matching
  switch (path) {
    case '/loan-pipeline':
      console.log('Rendering Loan Pipeline');
      return <LoanPipelineWidget />;
    case '/intranet-news':
      console.log('Rendering Intranet News');
      return <IntranetNewsWidget />;
    case '/launcher':
    case '/':
      console.log('Rendering Launcher');
      return <LauncherWidget />;
    default:
      console.log('Default to Launcher');
      return <LauncherWidget />;
  }
}

export default App; 