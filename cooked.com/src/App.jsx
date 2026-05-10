import { useState } from 'react';
import Landing from './components/Landing';
import AppView from './components/AppView';

export default function App() {
  const [activeTab, setActiveTab] = useState('make');
  const [showApp, setShowApp] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBackToLanding = () => {
    setShowApp(false);
    setActiveTab('make');
  };

  return (
    <div className="w-full min-h-screen bg-black">
       {!showApp ? (
        <Landing
          onSelect={(tab) => {
            setActiveTab(tab);
            setShowApp(true);
          }}
        />
      ) : (
        <AppView
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBackToLanding={handleBackToLanding}
        />
      )}
    </div>
  );
}