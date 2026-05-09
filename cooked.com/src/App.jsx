import { useState } from 'react';
import Landing from './components/Landing';
import AppView from './components/AppView';

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [activeTab, setActiveTab] = useState('make');
  const [showApp, setShowApp] = useState(false);
  const [expanding, setExpanding] = useState(null);

  const handleSelect = (tab) => {
    setExpanding(tab);
    setActiveTab(tab);
    setPhase('expanding');
    setTimeout(() => setPhase('app'), 680);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBackToLanding = () => {
    setPhase('landing');
    setActiveTab('make');
  };

  return (
    <div className="root-container">
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
          onTabChange={setActiveTab}
          onBackToLanding={() => setShowApp(false)}
        />
      )}
      <div className={`landing-wrapper ${phase !== 'landing' ? 'landing-wrapper--exit' : ''}`}>
        <Landing onSelect={handleSelect} />
        {phase === 'expanding' && expanding && (
          <div className={`expand-flash expand-flash--${expanding}`} />
        )}
      </div>
      <div className={`app-wrapper ${phase === 'app' ? 'app-wrapper--visible' : ''}`}>
        <AppView activeTab={activeTab} onTabChange={handleTabChange} onBackToLanding={handleBackToLanding} />
      </div>
    </div>
  );
}