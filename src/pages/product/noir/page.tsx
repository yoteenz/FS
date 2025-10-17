import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/base/LoadingScreen';
import DynamicCartIcon from '../../../components/DynamicCartIcon';

export default function NoirProductPage() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedCapSize, setSelectedCapSize] = useState('S');
  const [selectedFlexibleCap, setSelectedFlexibleCap] = useState('');
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [addToBagState, setAddToBagState] = useState<'idle' | 'adding' | 'added'>('idle');
  
  // Cart count state
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem('cartCount') || '0');
  });

  // Product images
  const productImages = [
    '/assets/NOIR/mannequin hero.png',
    '/assets/NOIR/mannequin top.png', 
    '/assets/NOIR/mannequin bottom.png'
  ];

  // Hide loading screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for cart count updates
  useEffect(() => {
    const handleCartCountUpdate = (event: CustomEvent) => {
      setCartCount(event.detail);
    };

    const handleStorageChange = () => {
      const newCount = parseInt(localStorage.getItem('cartCount') || '0');
      setCartCount(newCount);
    };

    const handleFocus = () => {
      const newCount = parseInt(localStorage.getItem('cartCount') || '0');
      setCartCount(newCount);
    };

    window.addEventListener('cartCountUpdated', handleCartCountUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('cartCountUpdated', handleCartCountUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToBag = async () => {
    if (addToBagState === 'adding' || addToBagState === 'added') return;
    
    setAddToBagState('adding');
    
    // Simulate adding to bag process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Increment cart count when item is successfully added
    const newCartCount = cartCount + 1;
    setCartCount(newCartCount);
    localStorage.setItem('cartCount', newCartCount.toString());
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: newCartCount }));
    
    setAddToBagState('added');
  };


  const capSizes = [
    { size: 'XXS', measurement: '19"' },
    { size: 'XS', measurement: '20"' },
    { size: 'S', measurement: '21"' },
    { size: 'M', measurement: '22"' },
    { size: 'L', measurement: '23"' }
  ];

  const flexibleCaps = [
    { label: 'XXS/XS/S', value: 'XXS/XS/S' },
    { label: 'S/M/L', value: 'S/M/L' }
  ];

  const productDetails = [
    "13X6 ULTRA THIN HD FILM LACE, RAW CAMBODIAN STRAIGHT 250% DENSITY.",
    "HANDMADE UNIT MEASURING 24 INCHES IN LENGTH, OFF BLACK HAIR COLOR.",
    "100% DOUBLE DRAWN HUMAN HAIR EXTENSIONS USING SINGLE DONOR BUNDLES.",
    "STRETCHY, BREATHEABLE CAP WITH REMOVABLE COMBS + ELASTIC BAND TO ENSURE A SNUG FIT.",
    "SINGLE STRAND KNOTS ARE LIGHTLY BLEACHED FOR A SEAMLESS, READY TO WEAR APPLICATION.",
    "UNIT COMES CO-WASHED IN ITS NATURAL STATE. CAN BE BLEACHED, DYED OR COLORED.",
    "USE 3D WIG GENERATOR TO CUSTOMIZE UNIT TO YOUR DESIRABILITY. MEMBERSHIP REQUIRED."
  ];

  return (
    <>
      {showLoading && <LoadingScreen />}
      <div
        className="baw-page min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/Marble Floor.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center calc(50% + 25px)',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* MOBILE MAIN CONTENT */}
        <div className="flex flex-col py-3 px-3 w-full max-w-md mx-auto">
          
          {/* MOBILE HEADER */}
          <div
            className="border border-black flex justify-center items-center py-2 w-full mb-3 px-3 bg-white/60 backdrop-blur-sm relative"
            style={{ borderWidth: '1.3px' }}
          >
            <div className="flex gap-3 absolute left-3">
              <button onClick={handleBack} className="cursor-pointer">
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
                  width="12"
                  height="12"
                  src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsearch.713ec616.png&w=32&q=75"
                />
              </button>
            </div>
            <p className="font-futura text-[14px]">
              <span 
                style={{ fontFamily: '"Futura PT Book", Futura, Futura, Inter, sans-serif', fontWeight: '500', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                STRAIGHT &gt;
              </span>{' '}
              <span
                className="font-semibold"
                style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif', fontWeight: '500' }}
              >
                NOIR
              </span>
            </p>
            <div className="gap-3 flex absolute" style={{ right: '11px' }}>
                <div style={{ transform: 'translateY(-4px)' }}>
                  <DynamicCartIcon count={cartCount} width={20} height={17} />
                </div>
              <img
                alt="Menu"
                width="18"
                height="18"
                className="cursor-pointer"
                src="/assets/menu-icon.svg"
              />
            </div>
          </div>

          {/* MAIN PRODUCT CONTAINER */}
          <div
            className="border border-black flex flex-col pt-4 pb-3 px-3 mb-2 bg-white/60 backdrop-blur-sm"
            style={{ borderWidth: '1.3px' }}
          >
            {/* ADD TO WISHLIST */}
            <div className="flex justify-between items-center mb-3">
              <button className="text-[10px] font-medium text-black cursor-pointer" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                ADD TO WISHLIST
              </button>
              <span className="text-[10px] font-medium" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                1/3
              </span>
            </div>

            {/* MAIN PRODUCT IMAGE WITH THUMBNAILS */}
            <div className="w-full flex items-start justify-center mb-4">
              {/* HERO IMAGE */}
              <div className="flex-1 max-w-[200px] mr-3">
                <img
                  src={productImages[selectedView]}
                  alt="NOIR Product"
                  className="w-full h-auto"
                />
              </div>
              
              {/* THUMBNAIL IMAGES - RIGHT SIDE */}
              <div className="flex flex-col space-y-2">
                {productImages.map((image, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`border-2 ${
                        selectedView === index ? 'border-black' : 'border-transparent'
                      }`}
                      style={{
                        width: '60px',
                        height: '80px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedView(index)}
                    >
                      <img
                        alt={`Thumbnail ${index + 1}`}
                        src={image}
                        className="w-full h-full object-cover"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DISCLAIMER */}
            <p className="text-[8px] text-center text-gray-500 mb-4" style={{ fontFamily: '"Futura PT Book", Futura, Futura, Inter, sans-serif' }}>
              (3D MODEL IS FOR VISUAL & AESTHETIC PURPOSES ONLY)
            </p>

            {/* PRODUCT SHOTS SECTION */}
            <div className="mb-4">
              <h2 className="text-[12px] font-bold text-black mb-3 text-center" style={{ fontFamily: '"Covered By Your Grace", cursive' }}>
                product shots
              </h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="w-full h-32 bg-gray-200 mb-2 rounded"></div>
                  <p className="text-[8px] text-center text-gray-500" style={{ fontFamily: '"Futura PT Book", Futura, Futura, Inter, sans-serif' }}>
                    Mannequin with choker necklace
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-32 bg-gray-200 mb-2 rounded"></div>
                  <p className="text-[8px] text-center text-gray-500" style={{ fontFamily: '"Futura PT Book", Futura, Futura, Inter, sans-serif' }}>
                    Product detail shot
                  </p>
                </div>
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-black mb-1" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                NOIR
              </h1>
              <p className="text-[10px] font-medium mb-2" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                24" RAW CAMBODIAN
              </p>
              <p className="text-lg font-bold text-black mb-1" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                $860 USD
              </p>
              <p className="text-[8px] text-gray-500 mb-2" style={{ fontFamily: '"Futura PT Book", Futura, Futura, Inter, sans-serif' }}>
                (EXCLUDING SALES TAX)
              </p>
              
              {/* RATING */}
              <div className="flex justify-center items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-[12px]"
                    style={{ color: i < 4 ? '#EB1C24' : '#ccc' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              
              <p className="text-[10px] font-medium text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                OR 4 PAYMENTS OF $240 WITH <span style={{ color: '#EB1C24' }}>KLARNA</span>
              </p>
            </div>

            {/* CUSTOMIZATION SECTION */}
            <div className="mb-4">
              <h2 className="text-[12px] font-bold text-black mb-3" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                SELECT CAP SIZE
              </h2>

              {/* CAP SIZE OPTIONS */}
              <div className="mb-4">
                {capSizes.map((cap) => (
                  <div key={cap.size} className="flex justify-between items-center py-1">
                    <span className="text-[10px] font-medium text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                      {cap.size}: {cap.measurement}
                    </span>
                  </div>
                ))}
              </div>

              {/* CUSTOM CAP */}
              <div className="mb-4">
                <h3 className="text-[10px] font-bold text-black mb-2" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  custom cap
                </h3>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedCapSize(size)}
                      className={`border border-black text-[8px] font-medium py-1 px-2 ${
                        selectedCapSize === size ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                      style={{ 
                        borderWidth: '1.3px',
                        fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* FLEXIBLE CAP */}
              <div className="mb-4">
                <h3 className="text-[10px] font-bold text-black mb-2" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  flexible cap
                </h3>
                <div className="flex gap-2">
                  {flexibleCaps.map((cap) => (
                    <button
                      key={cap.value}
                      onClick={() => setSelectedFlexibleCap(cap.value)}
                      className={`border border-black text-[8px] font-medium py-1 px-2 ${
                        selectedFlexibleCap === cap.value ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                      style={{ 
                        borderWidth: '1.3px',
                        fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
                      }}
                    >
                      {cap.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY SELECTOR */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border border-black text-[10px] font-medium py-1 px-2 bg-white text-black"
                  style={{ 
                    borderWidth: '1.3px',
                    fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
                  }}
                >
                  -
                </button>
                <span className="text-[10px] font-medium text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-black text-[10px] font-medium py-1 px-2 bg-white text-black"
                  style={{ 
                    borderWidth: '1.3px',
                    fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
                  }}
                >
                  +
                </button>
              </div>

              {/* CAP SIZE CHART BUTTON */}
              <button className="border border-black text-[8px] font-medium py-2 px-3 bg-white text-black mb-3" style={{ 
                borderWidth: '1.3px',
                fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
              }}>
                VIEW CAP SIZE CHART
              </button>

              {/* CAP SIZE CHART IMAGE */}
              <div className="flex justify-center mb-4">
                <img
                  src="/assets/NOIR/cap size chart.png"
                  alt="Cap Size Chart"
                  className="w-32 h-24 object-cover"
                />
              </div>
            </div>

            {/* PRODUCT INFORMATION TABS */}
            <div className="mb-4">
              {/* TABS */}
              <div className="flex justify-between mb-4">
                {['DETAILS', 'SHIPPING', 'POLICY', 'CARE & STORAGE', 'REVIEWS'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[8px] font-medium ${
                      activeTab === tab ? 'text-red-500' : 'text-black'
                    }`}
                    style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              {activeTab === 'DETAILS' && (
                <div className="space-y-2">
                  {productDetails.map((detail, index) => (
                    <p key={index} className="text-[8px] text-black" style={{ fontFamily: '"Futura PT Book", Futura, Futura, Inter, sans-serif' }}>
                      {detail}
                    </p>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ACTION BUTTONS - STANDALONE */}
          <div className="flex flex-col gap-3 mb-2">
            <button
              onClick={handleAddToBag}
              disabled={addToBagState === 'adding'}
              className={`border border-black font-medium w-full text-center py-2 text-[10px] ${
                addToBagState === 'adding' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer hover:bg-gray-50'
              }`}
              style={{ 
                borderWidth: '1.3px',
                fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
              }}
            >
              {addToBagState === 'idle' && 'ADD TO BAG'}
              {addToBagState === 'adding' && 'ADDING...'}
              {addToBagState === 'added' && (
                <span className="flex items-center justify-center gap-1">
                  <img src="/assets/check.svg" alt="Check" width="5" height="5" />
                  <span style={{ color: '#909090', marginLeft: '1px' }}>IN THE BAG</span>
                </span>
              )}
            </button>
            
            <button
              onClick={() => navigate('/build-a-wig')}
              className="border border-black font-medium w-full text-center py-2 text-[10px] bg-white cursor-pointer hover:bg-gray-50"
              style={{ 
                borderWidth: '1.3px',
                fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif'
              }}
            >
              CUSTOMIZE IN BUILD-A-WIG
            </button>
          </div>

          {/* SIMILAR PRODUCTS */}
          <div
            className="border border-black flex flex-col pt-4 pb-3 px-3 mb-2 bg-white/60 backdrop-blur-sm"
            style={{ borderWidth: '1.3px' }}
          >
            <h2 className="text-[12px] font-bold text-black mb-3" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
              SIMILAR PRODUCTS
            </h2>
            <div className="flex gap-3">
              <div className="flex-1 text-center">
                <div className="w-full h-24 bg-gray-200 mb-2"></div>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  BLANCO
                </p>
                <p className="text-[7px] font-medium" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  24" RAW RUSSIAN
                </p>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  $860 USD
                </p>
                <div className="flex justify-center items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[8px]" style={{ color: '#ccc' }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="w-full h-24 bg-gray-200 mb-2"></div>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  SOFT WAVE
                </p>
                <p className="text-[7px] font-medium" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  24" RAW INDIAN
                </p>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  $780 USD
                </p>
                <div className="flex justify-center items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[8px]" style={{ color: '#ccc' }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RECENTLY VIEWED */}
          <div
            className="border border-black flex flex-col pt-4 pb-3 px-3 mb-2 bg-white/60 backdrop-blur-sm"
            style={{ borderWidth: '1.3px' }}
          >
            <h2 className="text-[12px] font-bold text-black mb-3" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
              RECENTLY VIEWED
            </h2>
            <div className="flex gap-3">
              <div className="flex-1 text-center">
                <div className="w-full h-24 bg-gray-200 mb-2"></div>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  BEACH WAVE
                </p>
                <p className="text-[7px] font-medium" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  24" RAW INDIAN
                </p>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  $780 USD
                </p>
                <div className="flex justify-center items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[8px]" style={{ color: '#ccc' }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="w-full h-24 bg-gray-200 mb-2"></div>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  SOFT CURL
                </p>
                <p className="text-[7px] font-medium" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  24" RAW VIETNAMESE
                </p>
                <p className="text-[8px] font-bold text-black" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                  $820 USD
                </p>
                <div className="flex justify-center items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[8px]" style={{ color: '#ccc' }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
