import React from 'react';

const LobbyDebug: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">LOBBY DEBUG</h1>
        <p className="text-2xl">This is a test page</p>
        <p className="text-lg mt-4">If you see this, React Router is working</p>
        <p className="text-sm mt-2">Time: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default LobbyDebug;
