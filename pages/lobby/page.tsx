import React from 'react';

const LobbyPage: React.FC = () => {
  console.log('LobbyPage component is rendering');
  return (
    <div className="min-h-screen bg-red-900 relative overflow-hidden md:hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/landing-background.png)'
        }}
      />
      
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
          <img 
            src="/assets/neon-logo.png" 
            alt="Frontal Slayer" 
            className="w-auto h-32 md:h-40 lg:h-48"
          />
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-16">
          <img 
            src="/assets/neon-products.png" 
            alt="Products" 
            className="w-auto h-8 md:h-10 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <img 
            src="/assets/neon-tools.png" 
            alt="Tools" 
            className="w-auto h-8 md:h-10 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <img 
            src="/assets/neon-booking.png" 
            alt="Booking" 
            className="w-auto h-8 md:h-10 cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
        
        {/* Product Display Shelves */}
        <div className="flex flex-col gap-8 mb-16">
          {/* HD LACE Shelf */}
          <div className="flex flex-col items-center">
            <img 
              src="/assets/hd-group.png" 
              alt="HD Lace Collection" 
              className="w-auto h-32 md:h-40 lg:h-48"
            />
          </div>
          
          {/* TRANSPARENT LACE Shelf */}
          <div className="flex flex-col items-center">
            <img 
              src="/assets/transparent-group.png" 
              alt="Transparent Lace Collection" 
              className="w-auto h-32 md:h-40 lg:h-48"
            />
          </div>
          
          {/* CUSTOM UNITS Shelf */}
          <div className="flex flex-col items-center">
            <img 
              src="/assets/custom-group.png" 
              alt="Custom Units Collection" 
              className="w-auto h-32 md:h-40 lg:h-48"
            />
          </div>
        </div>
        
        {/* Bottom Display Case and Accessories */}
        <div className="relative w-full max-w-4xl">
          {/* Acrylic Case */}
          <div className="relative">
            <img 
              src="/assets/CASE.png" 
              alt="Display Case" 
              className="w-full h-auto"
            />
            
            {/* Register - Left side of case */}
            <div className="absolute top-4 left-8">
              <img 
                src="/assets/REGISTER.png" 
                alt="Register" 
                className="w-16 h-12 md:w-20 md:h-16"
              />
            </div>
            
            {/* Phone - Right side of case */}
            <div className="absolute top-4 right-8">
              <img 
                src="/assets/PHONE.png" 
                alt="Phone" 
                className="w-16 h-12 md:w-20 md:h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
