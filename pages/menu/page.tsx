
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    { label: 'UNITS', path: '/product', hasArrow: true },
    { label: 'BOOKING', path: '/booking', hasArrow: true },
    { label: 'BUILD-A-WIG', path: '/build-a-wig', hasArrow: false },
    { label: 'ORDER AUTHORIZATION FORM', path: '/order-form', hasArrow: false },
  ];

  const socialLinks = [
    { icon: 'ri-instagram-line', url: '#', label: 'Instagram' },
    { icon: 'ri-twitter-line', url: '#', label: 'Twitter' },
    { icon: 'ri-facebook-line', url: '#', label: 'Facebook' },
  ];


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Background Layer */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('https://www.dropbox.com/scl/fi/u4m42t2levejhysa3mnby/Marble-Floor.jpg?rlkey=j87posj7qo7fed7v6vihe09kr&st=uzmjl2p3&dl=1')`,
          backgroundSize: '500% auto',
          backgroundPosition: 'right 140%',
          backgroundRepeat: 'repeat-y',
        }}
      />

      {/* Semi‑transparent overlay */}
      <div className="fixed inset-0 bg-white/60 backdrop-blur-sm -z-5"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Icons */}
            <div className="flex items-center space-x-4">
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-shopping-bag-line text-xl text-black"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-heart-line text-xl text-black"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-user-line text-xl text-black"></i>
              </button>
            </div>

            {/* Right: Close */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-2xl text-black font-bold"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="px-6 mb-8">
          <div className="flex justify-center space-x-8">
            <button
              className="text-red-500 font-bold text-lg tracking-wider border-b-2 pb-2"
              style={{
                color: '#EB1C24',
                borderColor: '#EB1C24',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              SHOP
            </button>
            <button
              className="text-black font-bold text-lg tracking-wider pb-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              TOOLS
            </button>
            <button
              className="text-black font-bold text-lg tracking-wider pb-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              BRAND
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-6">
          <div className="space-y-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="w-full text-left flex items-center justify-between group"
                >
                  <span
                    className="text-black font-normal text-xl tracking-wider group-hover:text-red-500 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif', color: '#000000' }}
                  >
                    {item.label}
                  </span>
                  {item.hasArrow && (
                    <i
                      className="ri-arrow-right-line text-xl text-black group-hover:text-red-500 transition-colors"
                      style={{ color: '#000000' }}
                    ></i>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-6 pb-12">
          {/* Sign In */}
          <div className="mb-12">
            <span
              className="tracking-wider"
              style={{ fontFamily: 'Arial, sans-serif', color: '#EB1C24', fontSize: '10px' }}
            >
              SIGN UP
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-8">
            {socialLinks.map((social, index) => (
              <button
                key={index}
                onClick={() => window.open(social.url, '_blank')}
                className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-full hover:bg-black transition-colors"
                style={{ borderColor: '#000000' }}
                aria-label={social.label}
              >
                <i
                  className={`${social.icon} text-xl text-black group-hover:text-white transition-colors`}
                ></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
