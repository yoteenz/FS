import React from 'react';

const SimpleLobby: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">LOBBY PAGE</h1>
        <p className="text-xl">This is the lobby page</p>
        <p className="text-sm mt-4">Mobile Only</p>
      </div>
    </div>
  );
};

export default SimpleLobby;
