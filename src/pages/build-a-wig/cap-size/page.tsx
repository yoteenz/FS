
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbBox from '../../../components/ThumbBox';
import DynamicCartIcon from '../../../components/DynamicCartIcon';
import LoadingScreen from '../../../components/base/LoadingScreen';

interface CapSizeOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

function CapSizeSelection() {
  const navigate = useNavigate();
  const [selectedCapSize, setSelectedCapSize] = useState(() => {
    return localStorage.getItem('selectedCapSize') || 'M';
  });
  const [selectedView, setSelectedView] = useState(1); // Changed from 0 to 1 (middle image)
  const [showLoading, setShowLoading] = useState(true);

  // Cart count state
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem('cartCount') || '0');
  });

  // Mobile menu state
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuActiveTab, setMobileMenuActiveTab] = useState('SHOP');
  const [mobileMenuExpandedItems, setMobileMenuExpandedItems] = useState<string[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Listen for cart count changes
  useEffect(() => {
    const handleCartCountUpdate = (event: CustomEvent) => {
      setCartCount(event.detail);
    };

    const handleStorageChange = () => {
      const newCartCount = parseInt(localStorage.getItem('cartCount') || '0');
      setCartCount(newCartCount);
      
      // Update selected cap size from localStorage
      const storedCapSize = localStorage.getItem('selectedCapSize');
      if (storedCapSize && storedCapSize !== selectedCapSize) {
        setSelectedCapSize(storedCapSize);
      }
    };

    // Listen for custom storage changes (same-tab)
    const handleCustomStorageChange = () => {
      handleStorageChange();
    };

    window.addEventListener('cartCountUpdated', handleCartCountUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    window.addEventListener('customStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('cartCountUpdated', handleCartCountUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
      window.removeEventListener('customStorageChange', handleCustomStorageChange);
    };
  }, []);

  // Get wig views based on selected hairline from localStorage
  const getWigViews = () => {
    const selectedHairline = localStorage.getItem('selectedHairline') || 'NATURAL';
    const hasPeak = selectedHairline.includes('PEAK');
    const hasLagos = selectedHairline.includes('LAGOS');
    
    if (hasPeak) {
      return [
        '/assets/peak left.png',
        '/assets/peak front.png', 
        '/assets/peak right.png'
      ];
    } else if (hasLagos) {
      return [
        '/assets/lagos left.png',
        '/assets/lagos front.png',
        '/assets/lagos right.png'
      ];
    } else {
      // Default to natural images
      return [
        '/assets/natural left.png',
        '/assets/natural front.png',
        '/assets/natural right.png'
      ];
    }
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleMobileMenuTabClick = (tab: string) => {
    setMobileMenuActiveTab(tab);
  };

  const handleMobileMenuItemToggle = (item: string) => {
    setMobileMenuExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleMobileMenuSignInToggle = () => {
    setIsSignedIn(!isSignedIn);
  };

  const wigViews = getWigViews();

  // Cap size options - UPDATED to match reference exactly
  const capSizeOptions: CapSizeOption[] = [
    {
      id: 'XS',
      name: 'XS',
      description: '20" circumference',
      price: 0,
      image: '/assets/cap size-icon.svg'
    },
    {
      id: 'S',
      name: 'S',
      description: '21" circumference',
      price: 0,
      image: '/assets/cap size-icon.svg'
    },
    {
      id: 'M',
      name: 'M',
      description: '22" circumference',
      price: 0, // Default option - included in base price
      image: '/assets/cap size-icon.svg'
    },
    {
      id: 'L',
      name: 'L',
      description: '23" circumference',
      price: 0,
      image: '/assets/cap size-icon.svg'
    }
  ];

  // Flexible sizing options - ADDED to match reference
  const flexibleSizeOptions: CapSizeOption[] = [
    {
      id: 'XXS/XS/S',
      name: 'XXS/XS/S',
      description: 'Flexible sizing',
      price: 60, // Additional cost for flexible sizing
      image: '/assets/cap size-icon.svg'
    },
    {
      id: 'S/M/L',
      name: 'S/M/L',
      description: 'Flexible sizing',
      price: 60, // Additional cost for flexible sizing
      image: '/assets/cap size-icon.svg'
    }
  ];

  const handleCapSizeSelect = (capSizeId: string) => {
    setSelectedCapSize(capSizeId);
  };

  const handleBack = () => {
    navigate('/build-a-wig');
  };

  const handleConfirmSelection = () => {
    console.log('Cap-size page - confirming selection:', selectedCapSize);
    localStorage.setItem('selectedCapSize', selectedCapSize);
    localStorage.setItem('selectedCapSizePrice', getSelectedPrice().toString());
    
    console.log('Cap-size page - saved to localStorage:', {
      selectedCapSize,
      price: getSelectedPrice()
    });
    
    // Dispatch custom event to notify main page of changes
    console.log('Cap-size page - dispatching customStorageChange event');
    window.dispatchEvent(new CustomEvent('customStorageChange'));
    
    // Add a small delay to ensure the event is processed
    setTimeout(() => {
      navigate('/build-a-wig');
    }, 100);
  };

  const getSelectedPrice = () => {
    const allOptions = [...capSizeOptions, ...flexibleSizeOptions];
    const selected = allOptions.find(option => option.id === selectedCapSize);
    return selected ? selected.price : 0;
  };

  const totalPrice = getSelectedPrice();

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize with edit mode data if available
  useEffect(() => {
    const editingCartItem = localStorage.getItem('editingCartItem');
    if (editingCartItem) {
      const item = JSON.parse(editingCartItem);
      console.log('Cap-size page - loading edit mode cap size:', item.capSize);
      if (item.capSize) {
        setSelectedCapSize(item.capSize);
      }
    }
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen />}
      <div className="min-h-screen" style={{
        position: 'relative'
      }}>
        {/* Fixed Background Layer */}
        <div 
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url('/assets/Marble Floor.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center calc(50% + 25px)',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        {/* Scrollable Content */}
        <div className="relative z-10">
          {/* MAIN CONTENT */}
          <div className="flex flex-col py-5 px-4">
        {/* HEADER */}
        <div
          className="border-solid border-black flex justify-center items-center py-3 w-full mb-5 px-5 bg-white/60 backdrop-blur-sm relative"
          style={{ border: '1.3px solid black' }}
        >
          <div className="flex gap-5 absolute left-4">
            <button 
              onClick={handleBack} 
              className="cursor-pointer"
              style={{ height: '15px !important', width: '21px !important', padding: '0 !important', border: 'none !important', background: 'none !important' }}
            >
              <img
                alt="Back"
                width="21"
                height="15"
                src="/assets/back-button.svg"
              />
            </button>
            <button className="cursor-pointer" style={{ transform: 'translateX(-2px)' }}>
              <img
                alt="Search icon"
                width="16"
                height="15"
                src="/assets/search-icon.svg"
              />
            </button>
          </div>
          <p className="text-sm" style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}>
            <span 
                style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '400', cursor: 'pointer' }}
              onClick={() => window.REACT_APP_NAVIGATE('/build-a-wig')}
            >
              BUILD-A-WIG &gt;
            </span>{' '}
              <span
                style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500', cursor: 'pointer' }}
                onClick={() => navigate('/units/noir')}
              >
                NOIR
              </span>
          </p>
          <div className="gap-5 flex absolute" style={{ right: '17px' }}>
            <div>
              <DynamicCartIcon count={cartCount} width={22} height={19} />
            </div>
            <img
              alt="Menu"
              width="17"
              height="18"
              className="cursor-pointer"
              src="/assets/menu-icon.svg"
              onClick={handleMobileMenuToggle}
            />
          </div>
        </div>

        {/* MAIN BUILD AREA */}
        <div
          className="border border-black flex flex-col pt-6 pb-4 px-5 mb-2 bg-white/60 backdrop-blur-sm"
          style={{ borderWidth: '1.3px' }}
        >
          {/* WIG PREVIEW */}
          <div className="w-full flex items-center flex-col mb-6 md:mb-8" style={{ transform: 'translateY(20px)' }}>
            <div className="leaf-stack hero-thumb">
              <div className="leaf-bg" aria-hidden="true"></div>
              <div
                className="relative bg-cover bg-center flex items-center justify-center"
                style={{
                  width: '262px',
                  height: '367px',
                  backgroundImage: `url('/assets/leaf-brick.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                  <p
                    className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-5xl sm:text-6xl z-20 noir-text cursor-pointer"
                    style={{
                      color: '#EB1C24',
                    }}
                    onClick={() => navigate('/units/noir')}
                  >
                    NOIR
                  </p>
                <img
                  src={wigViews[selectedView]}
                  alt="Selected Wig"
                  width="282"
                  height="387"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hero-mannequin-img"
                  style={{ 
                    top: 'calc(50% - 10.601px + 18px)',
                    '--hero-width': '282px',
                    '--hero-height': '387px'
                  } as React.CSSProperties}
                />
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex justify-center mb-3 mt-2" style={{ transform: 'translateY(10px)', gap: '2px' }}>
              {wigViews.map((view, index) => (
                <div className="leaf-stack thumb" key={index}>
                  <div 
                    className={`leaf-bg ${
                      selectedView === index ? 'border-black' : 'border-transparent'
                    }`} 
                    aria-hidden="true"
                  ></div>
                  <div
                    className="border-transparent p-1 cursor-pointer"
                    onClick={() => setSelectedView(index)}
                  >
                    <div
                      className="relative bg-cover bg-center"
                      data-thumb-index={index}
                      style={{
                        width: '72px',
                        height: '95px',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        alt={`Thumbnail ${index + 1}`}
                        width="63"
                        height="84"
                        src={view}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 thumbnail-mannequin-img"
                        style={{ 
                          '--thumb-top': 'calc(50% - 6.1px + 7.2px)',
                          ...(index === 0 && { left: 'calc(50% - 6px)' })
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Back Button - Fixed positioning to match hairline page */}
            <div className="flex justify-start ml-[calc(50%-131px)]">
          </div>

          {/* RED NOTICE TEXT - Moved to match reference layout exactly */}

          {/* TOTAL DUE - Hidden on mobile to match reference */}
          <div className="text-center hidden md:block">
            <p className="text-sm font-medium" style={{ color: '#909090', fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' }}>
              TOTAL DUE
            </p>
            <p 
              className="text-base font-medium"
              style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500' }}
            >
              $400 USD
            </p>
          </div>

          {/* SELECTION AREA - Moved to right side to match reference */}
          <div className="w-full flex flex-col lg:mt-0 mt-0">
            {/* CUSTOM SIZING SECTION */}
            <p 
              className="text-xs sm:text-sm text-center mb-4"
              style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24', transform: 'translateY(18px)' }}
            >
              CUSTOM SIZING
            </p>

            {/* CUSTOM SIZE OPTIONS - Updated to fit 4 containers per row with centered layout */}
            <div className="flex flex-col gap-3 mt-[12px] mx-auto mb-6">
              <div className="grid grid-cols-4 gap-4 mx-auto justify-center max-w-[320px]">
                {capSizeOptions.map((option) => (
                  <ThumbBox
                    key={option.id}
                    image={option.image}
                    title="CAP SIZE"
                    label={option.name}
                    isSelected={selectedCapSize === option.id}
                    onClick={() => handleCapSizeSelect(option.id)}
                    imgSize={78}
                    containerSize={60}
                    topPosition="53%"
                  />
                ))}
              </div>
            </div>

            {/* FLEXIBLE SIZING SECTION */}
            <div className="mt-5" style={{ transform: 'translateY(-9px) translateZ(0)', position: 'relative' }}>
              <p 
                className="text-xs sm:text-sm text-center mb-4"
                style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}
              >
                FLEXIBLE SIZING
              </p>

              <div className="flex flex-col mx-auto" style={{ marginTop: '-5px', marginBottom: '13px' }}>
                <div className="grid grid-cols-2 gap-4 justify-center max-w-[160px] mx-auto">
                  {flexibleSizeOptions.map((option) => (
                    <ThumbBox
                      key={option.id}
                      image={option.image}
                      title="CAP SIZE"
                      label={option.name}
                      isSelected={selectedCapSize === option.id}
                      onClick={() => handleCapSizeSelect(option.id)}
                      imgSize={78}
                      containerSize={60}
                      topPosition="55%"
                    />
                  ))}
                </div>
              </div>

              {/* SIZE MEASUREMENTS */}
              <div className="flex justify-center mx-auto gap-5" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <p className="text-[10px] font-semibold text-[#EB1C24]" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' }}>XXS: 19"</p>
                <p className="text-[10px] font-semibold text-[#EB1C24]" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' }}>XS: 20"</p>
                <p className="text-[10px] font-semibold text-[#EB1C24]" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' }}>S: 21"</p>
                <p className="text-[10px] font-semibold text-[#EB1C24]" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' }}>M: 22"</p>
                <p className="text-[10px] font-semibold text-[#EB1C24]" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' }}>L: 23"</p>
              </div>
            </div>

            {/* TOTAL PRICE */}
            <div className="text-center">
              <p className="font-futura text-[12px] font-medium" style={{ color: '#909090' }}>
                TOTAL DUE
              </p>
              <p 
                className="text-black font-medium text-base"
                style={{ fontFamily: '"Futura PT", "Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500' }}
              >
                {totalPrice < 0 ? '-' : totalPrice > 0 ? '+' : ''}${Math.abs(totalPrice)} USD
              </p>
            </div>

          </div>
        </div>

        {/* CONFIRM SELECTION BUTTON */}
        <div className="px-0 md:px-0 flex justify-center" style={{ marginTop: '2px', transform: 'translateY(0px)' }}>
          <button
            onClick={handleConfirmSelection}
            className="border border-black font-futura text-center py-2 text-[12px] font-semibold bg-white cursor-pointer hover:bg-gray-50"
            style={{ borderWidth: '1.3px', color: '#EB1C24', width: '358px' }}
          >
            CONFIRM SELECTION
          </button>
        </div>

        {/* MOBILE MENU POP-UP */}
        {showMobileMenu && (
          <div 
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)'
            }}
            onClick={handleCloseMobileMenu}
          >
            <div 
              className="fixed inset-0 w-full h-full"
              style={{
                backgroundImage: 'url("/assets/Marble Floor.jpg")',
                backgroundSize: '500%',
                backgroundPosition: 'center 60%',
                backgroundRepeat: 'no-repeat'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphism Container */}
            <div 
              className="border border-black bg-white/60 backdrop-blur-sm"
              style={{ 
                borderWidth: '1.3px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                height: 'calc(80% + 120px)',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                willChange: 'backdrop-filter'
              }}
            >
                {/* Close Button */}
                <button
                  onClick={handleCloseMobileMenu}
                  className="absolute z-10"
                  style={{
                    top: '9px',
                    right: '9px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  <img
                    src="/assets/close-icon.svg"
                    alt="Close"
                    style={{ width: '21px', height: '21px' }}
                  />
                </button>

                {/* Top Icons and Currency */}
                <div className="absolute top-16 left-6 right-6 flex justify-between items-center z-10">
                  {/* Top Icons */}
                  <div className="flex gap-4">
                    <div className="flex items-center" style={{ transform: 'translateY(1px)' }}>
                      <DynamicCartIcon count={cartCount} width={28} height={23} />
                    </div>
                    {isSignedIn ? (
                      <img
                        src="/assets/NOIR/account-wishlist.svg"
                        alt="Wishlist"
                        style={{ width: '21px', height: '21px', transform: 'translateY(4px) translateX(-1px)' }}
                      />
                    ) : (
                      <img
                        src="/assets/wishlist-heart.svg"
                        alt="Wishlist"
                        style={{ width: '21px', height: '21px', transform: 'translateY(4px) translateX(-1px)' }}
                      />
                    )}
                    <img
                      src="/assets/NOIR/account-icon.svg"
                      alt="Account"
                      style={{ width: '21px', height: '21px', transform: 'translateY(4px)' }}
                    />
                  </div>
                  
                  {/* Currency Selector */}
                  <div className="flex items-center gap-2">
                    <span style={{ 
                      fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif',
                      fontSize: '14px',
                      color: 'black',
                      fontWeight: '500'
                    }}>
                      $ USD
                    </span>
                    <img
                      src="/assets/NOIR/down-arrow.svg"
                      alt="Currency"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex gap-8 z-10" style={{ marginTop: '30px' }}>
                  <button
                    onClick={() => handleMobileMenuTabClick('SHOP')}
                    style={{ 
                      fontFamily: mobileMenuActiveTab === 'SHOP' ? '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' : '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                      fontSize: '14px',
                      color: mobileMenuActiveTab === 'SHOP' ? '#EB1C24' : 'black',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      borderBottom: mobileMenuActiveTab === 'SHOP' ? '2px solid #EB1C24' : 'none',
                      paddingBottom: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    SHOP
                  </button>
                  <button
                    onClick={() => handleMobileMenuTabClick('TOOLS')}
                    style={{ 
                      fontFamily: mobileMenuActiveTab === 'TOOLS' ? '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' : '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                      fontSize: '14px',
                      color: mobileMenuActiveTab === 'TOOLS' ? '#EB1C24' : 'black',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      borderBottom: mobileMenuActiveTab === 'TOOLS' ? '2px solid #EB1C24' : 'none',
                      paddingBottom: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    TOOLS
                  </button>
                  <button
                    onClick={() => handleMobileMenuTabClick('BRAND')}
                    style={{ 
                      fontFamily: mobileMenuActiveTab === 'BRAND' ? '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' : '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                      fontSize: '14px',
                      color: mobileMenuActiveTab === 'BRAND' ? '#EB1C24' : 'black',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      borderBottom: mobileMenuActiveTab === 'BRAND' ? '2px solid #EB1C24' : 'none',
                      paddingBottom: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    BRAND
                  </button>
                </div>

                {/* Menu Items */}
                <div className="absolute top-40 right-6 z-10" style={{ marginTop: '15px', left: '27px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                    {mobileMenuActiveTab === 'TOOLS' ? (
                      ['GIFT CARD'].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span style={{ 
                            fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                            fontSize: '14px',
                            color: 'black',
                            fontWeight: '500',
                            textTransform: 'uppercase'
                          }}>
                            {item}
                          </span>
                        </div>
                      ))
                    ) : mobileMenuActiveTab === 'BRAND' ? (
                      ['ABOUT US', 'CONTACT', 'CARE & STORAGE', 'BECOME A MEMBER', 'FAQ', 'PAYMENT + SHIPPING', 'REVIEWS', 'TERMS OF SERVICE'].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span style={{ 
                            fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                            fontSize: '14px',
                            color: 'black',
                            fontWeight: '500',
                            textTransform: 'uppercase'
                          }}>
                            {item}
                          </span>
                        </div>
                      ))
                    ) : (
                      // SHOP tab with dropdown functionality
                      [
                        { label: 'UNITS', hasArrow: true, isExpandable: true, subItems: ['STRAIGHT', 'WAVY', 'CURLY'] },
                        { label: 'BOOKING', hasArrow: true, isExpandable: true, subItems: ['APPOINTMENT', 'CONSULTATION'] },
                        { label: 'BUILD-A-WIG', hasArrow: false },
                        { label: 'ORDER AUTHORIZATION FORM', hasArrow: false }
                      ].map((item, index) => (
                        <div key={index}>
                          <div 
                            className="flex items-center justify-between cursor-pointer"
                            style={{ alignItems: 'center' }}
                            onClick={() => item.isExpandable ? handleMobileMenuItemToggle(item.label) : null}
                          >
                            <span style={{ 
                              fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                              fontSize: '14px',
                              color: 'black',
                              fontWeight: '500',
                              textTransform: 'uppercase'
                            }}>
                              {item.label}
                            </span>
                            {item.hasArrow && (
                              <img
                                src="/assets/NOIR/closed-arrow.svg"
                                alt="Arrow"
                                style={{ 
                                  width: '16px', 
                                  height: '16px',
                                  transform: `${mobileMenuExpandedItems.includes(item.label) ? 'rotate(90deg)' : 'rotate(0deg)'} translateY(-4px)`,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              />
                            )}
                          </div>
                          {item.isExpandable && mobileMenuExpandedItems.includes(item.label) && item.subItems && (
                            <div className="ml-4 mt-2 space-y-2">
                              {item.subItems.map((subItem, subIndex) => (
                                <div key={subIndex} className="flex items-center">
                                  <span style={{ 
                                    fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                                    fontSize: '14px',
                                    color: '#EB1C24',
                                    fontWeight: '500',
                                    textTransform: 'uppercase'
                                  }}>
                                    {subItem}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              {/* Sign In/Out */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ bottom: '86px' }}>
                <span 
                  onClick={handleMobileMenuSignInToggle}
                  style={{ 
                    fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif',
                    fontSize: '14px',
                    color: '#EB1C24',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  {isSignedIn ? 'SIGN OUT' : 'SIGN IN'}
                </span>
              </div>

                {/* Social Media Icons */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ bottom: '37px' }}>
                  <div className="flex" style={{ gap: '19px' }}>
                    <img
                      src="/assets/instagram-icon.svg"
                      alt="Instagram"
                      style={{ width: '20px', height: '20px' }}
                    />
                    <img
                      src="/assets/twitter-icon.svg"
                      alt="Twitter"
                      style={{ width: '20px', height: '20px' }}
                    />
                    <img
                      src="/assets/facebook-icon.svg"
                      alt="Facebook"
                      style={{ width: '20px', height: '20px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        </div>
      </div>
    </>
  );
}

export default CapSizeSelection;
