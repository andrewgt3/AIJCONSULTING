import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SystemsIntel from './components/SystemsIntel';
import PaintShopOverview from './components/PaintShopOverview';
import CommandCenter from './components/CommandCenter'; // Currently acts as CellOverview
import LivePredictions from './components/LivePredictions';
import AssetView from './components/AssetView';
import ComponentDetailView from './components/ComponentDetailView';
import LoadingOverlay from './components/LoadingOverlay';
import './App.css';

// MOCK DATA FOR ROBOTIC CELL 05
const robotsData = [
  { id: 'Robot_01', name: 'Robot 1', status: 'critical', risk: 78, prediction: 'Dec 14-21', details: 'Axis 3 Motor Temp (+15%)' },
  { id: 'Robot_02', name: 'Robot 2', status: 'warning', risk: 52, prediction: 'Dec 21-28', details: 'Vibration RMS (2.5x)' },
  { id: 'Robot_03', name: 'Robot 3', status: 'healthy', risk: 18, prediction: 'Stable', details: 'Normal Operation' },
  { id: 'Robot_04', name: 'Robot 4', status: 'healthy', risk: 12, prediction: 'Stable', details: 'Normal Operation' },
  { id: 'Robot_05', name: 'Robot 5', status: 'healthy', risk: 8, prediction: 'Stable', details: 'Normal Operation' },
  { id: 'Robot_06', name: 'Robot 6', status: 'healthy', risk: 5, prediction: 'Stable', details: 'Normal Operation' },
];

const modelMetrics = {
  precision: 0.74,
  recall: 0.82,
  f1: 0.78,
  auc: 0.87,
  lastUpdated: '2024-12-07 02:15 AM'
};

function App() {
  const [view, setView] = useState('plant'); // plant, cell, robot, factor
  const [selectedProcess, setSelectedProcess] = useState(null); // Level 0 -> 1
  const [selectedRobot, setSelectedRobot] = useState(null); // Level 1 -> 2
  const [selectedFactor, setSelectedFactor] = useState(null); // Level 2 -> 3
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = (callback) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 800);
  };

  // Level 0 -> Level 1 (Paint Shop -> Robotic Cell)
  const handleSelectProcess = (processName) => {
    simulateLoading(() => {
      setSelectedProcess(processName);
      // Map 'Base Coat' to the Robotic Cell view
      if (processName === 'Base Coat') {
        setView('cell');
      } else {
        // Placeholder for other nodes if we had them
        console.log(`Selected ${processName} - in full app would load that cell.`);
        setView('cell'); // Default to cell view for demo purposes
      }
    });
  };

  // Level 1 -> Level 2 (Cell -> Robot)
  const handleSelectRobot = (robot) => {
    simulateLoading(() => {
      setSelectedRobot(robot);
      setView('robot');
    });
  };

  // Level 2 -> Level 3 (Robot -> Factor)
  const handleSelectFactor = (factor) => {
    simulateLoading(() => {
      setSelectedFactor(factor);
      setView('factor');
    });
  };

  const handleBack = () => {
    if (view === 'factor') setView('robot');
    else if (view === 'robot') setView('cell');
    else if (view === 'cell') setView('plant');
  };

  const handleHome = () => {
    setView('plant');
  };

  return (
    <Layout>
      {isLoading && <LoadingOverlay message="AI Analyzing System State..." />}

      {/* Breadcrumb / Navigation Helper */}
      {view !== 'plant' && (
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem' }}>
          <span className="clickable text-gray" onClick={handleHome}>Paint Shop</span>
          <span className="text-gray">/</span>
          <span className={`clickable ${view === 'cell' ? 'font-bold' : 'text-gray'}`} onClick={() => view !== 'cell' && setView('cell')}>
            {selectedProcess || 'Robotic Cell'}
          </span>
          {view !== 'cell' && (
            <>
              <span className="text-gray">/</span>
              <span className={`clickable ${view === 'robot' ? 'font-bold' : 'text-gray'}`} onClick={() => view !== 'robot' && setView('robot')}>
                {selectedRobot?.name}
              </span>
            </>
          )}
        </div>
      )}

      <div className="dashboard-grid">
        <div className="sidebar-col">
          <SystemsIntel metrics={modelMetrics} robots={robotsData} />
        </div>
        <div className="main-col">

          {view === 'plant' && (
            <PaintShopOverview onSelectProcess={handleSelectProcess} />
          )}

          {view === 'cell' && (
            <CommandCenter
              robots={robotsData}
              metrics={modelMetrics}
              onSelectRobot={handleSelectRobot}
            />
          )}

          {view === 'robot' && selectedRobot && (
            <AssetView
              robot={selectedRobot}
              onBack={handleBack}
              onSelectFactor={handleSelectFactor}
            />
          )}

          {view === 'factor' && selectedFactor && (
            <ComponentDetailView
              factor={selectedFactor}
              robotName={selectedRobot?.name}
              onBack={handleBack}
            />
          )}

          {/* Bottom Panel */}
          {(view === 'plant' || view === 'cell') && <LivePredictions robots={robotsData} />}
        </div>
      </div>
    </Layout>
  );
}

export default App;
