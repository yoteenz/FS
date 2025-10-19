import React from 'react';

const LobbyDebug: React.FC = () => {
  return React.createElement('div', {
    className: 'min-h-screen bg-red-500 flex items-center justify-center'
  }, React.createElement('div', {
    className: 'text-center text-white'
  }, [
    React.createElement('h1', {
      key: 'title',
      className: 'text-6xl font-bold mb-4'
    }, 'LOBBY DEBUG'),
    React.createElement('p', {
      key: 'subtitle',
      className: 'text-2xl'
    }, 'This is a test page'),
    React.createElement('p', {
      key: 'description',
      className: 'text-lg mt-4'
    }, 'If you see this, React Router is working'),
    React.createElement('p', {
      key: 'time',
      className: 'text-sm mt-2'
    }, `Time: ${new Date().toLocaleTimeString()}`)
  ]));
};

export default LobbyDebug;
