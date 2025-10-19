import React from 'react';

const LobbyPage: React.FC = () => {
  console.log('LobbyPage component is rendering');
  return (
    <div className="min-h-screen bg-red-900 relative overflow-hidden md:hidden">
      {/* Simple red background instead of large image */}
      <div className="absolute inset-0 bg-red-900" />
      
      {/* Chat Icon - Upper Left */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="/assets/chat-icon.svg" 
          alt="Chat" 
          className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
      
      {/* Menu Icon - Upper Right */}
      <div className="absolute top-6 right-6 z-20">
        <img 
          src="/assets/landing-menu-icon.svg" 
          alt="Menu" 
          className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Neon Logo - Center */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">FRONTAL SLAYER</h1>
            <p className="text-white text-lg">Custom Hair Studio</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col gap-4 mb-16">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
            PRODUCTS
          </button>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
            TOOLS
          </button>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
            BOOKING
          </button>
        </div>
        
        {/* Product Display Shelves */}
        <div className="flex flex-col gap-8 mb-16">
          {/* HD LACE Shelf */}
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">HD LACE</h3>
              <p className="text-white/80">Premium Quality Collection</p>
            </div>
          </div>
          
          {/* TRANSPARENT LACE Shelf */}
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">TRANSPARENT LACE</h3>
              <p className="text-white/80">Natural Looking Collection</p>
            </div>
          </div>
          
          {/* CUSTOM UNITS Shelf */}
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">CUSTOM UNITS</h3>
              <p className="text-white/80">Personalized Collection</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Display Case and Accessories */}
        <div className="relative w-full max-w-4xl">
          {/* Acrylic Case */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <h3 className="text-white text-2xl font-bold mb-4">DISPLAY CASE</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">SLAY TOOLS</h4>
                <p className="text-white/80 text-sm">Professional Tools</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">LACE PRODUCTS</h4>
                <p className="text-white/80 text-sm">Quality Lace</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 col-span-2">
                <h4 className="text-white font-semibold mb-2">HAIR PRODUCTS</h4>
                <p className="text-white/80 text-sm">Premium Hair Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
