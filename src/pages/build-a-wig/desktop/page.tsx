import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/base/LoadingScreen';
import DynamicCartIcon from '../../../components/DynamicCartIcon';

interface WigCustomization {
  capSize: string;
  length: string;
  density: string;
  lace: string;
  texture: string;
  color: string;
  hairline: string;
  styling: string;
  addOns: string[];
}

export default function BuildAWigDesktopPage() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(1);
  const [showLoading, setShowLoading] = useState(true);
  const [customization, setCustomization] = useState<WigCustomization>(() => {
    // Check if we're editing an existing cart item
    const editingCartItem = localStorage.getItem('editingCartItem');
    if (editingCartItem) {
      const item = JSON.parse(editingCartItem);
      return {
        capSize: item.capSize || 'M',
        length: item.length || '24"',
        density: item.density || '180%',
        lace: item.lace || '13X6',
        texture: item.texture || 'SILKY',
        color: item.color || 'OFF BLACK',
        hairline: item.hairline || 'NATURAL',
        styling: item.styling || 'NATURAL',
        addOns: item.addOns || [],
      };
    }
    // Default values
    return {
      capSize: 'M',
      length: '24"',
      density: '180%',
      lace: '13X6',
      texture: 'SILKY',
      color: 'OFF BLACK',
      hairline: 'NATURAL',
      styling: 'NATURAL',
      addOns: [],
    };
  });

  const [basePrice] = useState(860);
  const [totalPrice, setTotalPrice] = useState(860);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isEditingMode, setIsEditingMode] = useState(() => {
    return !!localStorage.getItem('editingCartItem');
  });
  const [originalItem, setOriginalItem] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Add to bag button states: 'idle', 'adding', 'added'
  const [addToBagState, setAddToBagState] = useState<'idle' | 'adding' | 'added'>('idle');
  const [currentConfiguration, setCurrentConfiguration] = useState<string>('');
  
  // Cart count state
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem('cartCount') || '0');
  });

  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  // Desktop menu states
  const [desktopMenuActiveTab, setDesktopMenuActiveTab] = useState('SHOP');
  const [desktopMenuExpandedItems, setDesktopMenuExpandedItems] = useState<string[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Cart items state
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  // Load editing item data into localStorage when in editing mode
  useEffect(() => {
    if (isEditingMode) {
      const editingCartItem = localStorage.getItem('editingCartItem');
      if (editingCartItem) {
        const item = JSON.parse(editingCartItem);
        setOriginalItem(item);
        setTotalPrice(item.price || 860);
      }
    }
  }, [isEditingMode]);

  // Handle back navigation
  const handleBack = () => {
    if (isEditingMode) {
      // If editing, go back to cart or previous page
      navigate('/menu');
    } else {
      // If creating new, go back to build-a-wig
      navigate('/build-a-wig');
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: string, value: string) => {
      setCustomization(prev => ({
        ...prev,
      [option]: value
    }));
    setHasChanges(true);
  };

  // Handle desktop menu tab click
  const handleDesktopMenuTabClick = (tab: string) => {
    setDesktopMenuActiveTab(tab);
    setDesktopMenuExpandedItems([]);
  };

  // Handle desktop menu item toggle
  const handleDesktopMenuItemToggle = (item: string) => {
    setDesktopMenuExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  // Handle desktop menu sign in toggle
  const handleDesktopMenuSignInToggle = () => {
    setIsSignedIn(!isSignedIn);
  };

  // Handle add to bag
  const handleAddToBag = async () => {
    if (addToBagState === 'adding') return;
    
    setAddToBagState('adding');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem = {
        id: Date.now(),
        name: 'NOIR',
            price: totalPrice,
        image: '/assets/NOIR/noir-thumb.png',
        quantity: 1,
        customization: { ...customization }
      };
      
      if (isEditingMode) {
        // Update existing item
        const editingCartItem = localStorage.getItem('editingCartItem');
        if (editingCartItem) {
          const item = JSON.parse(editingCartItem);
          const updatedItems = cartItems.map(cartItem => 
            cartItem.id === item.id ? { ...cartItem, ...newItem } : cartItem
          );
          setCartItems(updatedItems);
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        }
      localStorage.removeItem('editingCartItem');
      setIsEditingMode(false);
    } else {
        // Add new item
        const updatedItems = [...cartItems, newItem];
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      }
      
      // Update cart count
      const updatedItems = isEditingMode ? cartItems : [...cartItems, newItem];
      const newCount = updatedItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(newCount);
      localStorage.setItem('cartCount', newCount.toString());
      
      setAddToBagState('added');
    setTimeout(() => {
        setAddToBagState('idle');
        navigate('/menu');
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to bag:', error);
      setAddToBagState('idle');
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return {
      __html: `$${price} <span style="font-size: 0.8em; color: #909090;">${selectedCurrency}</span>`
    };
  };

  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {showLoading && <LoadingScreen />}
      <div className="min-h-screen" style={{ position: 'relative' }}>
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
          <div className="flex py-5 px-4">
            {/* LEFT SIDE - NAV BAR + MAIN CONTAINER */}
            <div className="pr-4 flex flex-col" style={{ width: '70%', flexShrink: 0, flexGrow: 0 }}>
              {/* HEADER */}
              <div
                className="border-solid border-black flex justify-center items-center py-3 mb-5 px-5 bg-white/60 backdrop-blur-sm relative"
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
                    onClick={() => navigate('/build-a-wig')}
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
                    alt="Wishlist"
                    width="17"
                    height="18"
                    className="cursor-pointer"
                    src="/assets/wishlist-heart.svg"
                  />
                  <img
                    alt="Account"
                    width="17"
                    height="18"
                    className="cursor-pointer"
                    src="/assets/NOIR/account-icon.svg"
                  />
                </div>
              </div>

              {/* MAIN CONTAINER */}
              <div className="flex flex-col">
                {/* BUILD AREA */}
                <div className="border border-black flex pt-6 pb-4 px-5 mb-2 bg-white/60 backdrop-blur-sm" style={{ borderWidth: '1.3px' }}>
                  {/* LEFT SIDE - WIG PREVIEW */}
                  <div className="flex flex-col items-center">
                    {/* MAIN HERO IMAGE */}
                    <div className="flex items-center justify-center mb-4" style={{ transform: 'translateY(20px)' }}>
                <div className="leaf-stack hero-thumb">
                  <div className="leaf-bg" aria-hidden="true"></div>
                  <div
                    className="relative bg-cover bg-center flex items-center justify-center"
                    style={{
                      width: '262px',
                      height: '367px',
                            backgroundImage: `url('/assets/NOIR/leaf-brick.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                          <img
                            src={
                              selectedView === 1 ? '/assets/natural front.png' :
                              selectedView === 2 ? '/assets/natural left.png' :
                              '/assets/natural right.png'
                            }
                            alt="NOIR Wig"
                            className="object-cover"
                      style={{ 
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                  </div>
                </div>

                    {/* THUMBNAIL PREVIEWS */}
                    <div className="flex gap-2 mb-4">
                      {[
                        { src: '/assets/natural front.png', alt: 'Natural Front View' },
                        { src: '/assets/natural left.png', alt: 'Natural Left View' },
                        { src: '/assets/natural right.png', alt: 'Natural Right View' }
                      ].map((thumbnail, index) => (
                        <div key={index} className="relative">
                          <div
                            className="border border-black cursor-pointer"
                          style={{
                              width: '60px',
                              height: '60px',
                              borderWidth: '1.3px',
                              backgroundColor: selectedView === index + 1 ? '#f0f0f0' : 'white',
                              borderColor: selectedView === index + 1 ? '#000' : '#000'
                            }}
                            onClick={() => setSelectedView(index + 1)}
                        >
                          <img
                              src={thumbnail.src}
                              alt={thumbnail.alt}
                              className="w-full h-full object-cover"
                            />
                      </div>
                    </div>
                  ))}
                </div>

                    {/* RED NOTE TEXT */}
                    <p
                      className="font-futura text-[10px] md:text-xs text-center my-4 w-[95%] mx-auto uppercase"
                      style={{ color: '#EB1C24', fontFamily: '"Futura PT Demi", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500', transform: 'translateY(-7px)' }}
                    >
                      PLEASE NOTE: EACH CUSTOM UNIT IS MADE TO ORDER.<br />
                      WE ENSURE ALL DETAILS ARE ACCURATE + PRECISE.<br />
                      EXPECT 2-4 WEEKS OF PROCESSING TIME FOR THIS UNIT.
                    </p>

                    {/* TOTAL DUE & PRICE */}
                    <div className="text-center mb-4">
                      <p className="font-futura text-[12px] md:text-sm lg:text-base font-medium" style={{ color: '#909090' }}>
                        TOTAL DUE
                      </p>
                      <p
                        className="text-black font-medium text-base md:text-xl lg:text-2xl"
                        style={{ fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif', fontWeight: '500' }}
                        dangerouslySetInnerHTML={formatPrice(totalPrice)}
                      />
                </div>
              </div>

                  {/* RIGHT SIDE - CUSTOMIZATION OPTIONS */}
                  <div className="flex flex-col items-center justify-center" style={{ width: '30%', flexShrink: 0, flexGrow: 0 }}>
                    {/* SELECT ICONS BELOW Header */}
                    <p
                      className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-red-500 mb-4"
                      style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24', transform: 'translateY(18px)' }}
                    >
                      SELECT ICONS BELOW
                    </p>

                    {/* BASIC MEMBERSHIP OPTIONS */}
                    <div className="flex flex-col gap-3 mt-4 mx-auto" style={{ marginBottom: '18px', transform: 'translateY(6px)' }}>
                      <p className="text-[9px] sm:text-sm md:text-base lg:text-lg font-medium text-black text-center" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500' }}>
                        BASIC MEMBERSHIP OPTIONS:
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mx-auto justify-evenly">
                    {/* CAP SIZE */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('capSize', 'M')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        CAP SIZE
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '78px',
                          height: '78px',
                          overflow: 'visible',
                          top: '53%',
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="Card image"
                          src="/assets/cap size-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.capSize}
                      </p>
                    </div>

                    {/* LENGTH */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('length', customization.length)}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        LENGTH
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '72px',
                          height: '72px',
                          overflow: 'visible',
                          top: '50%',
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="Card image"
                          src="/assets/back length-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.length}
                      </p>
                    </div>

                    {/* DENSITY */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('density', '180%')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        DENSITY
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '57px',
                          height: '57px',
                          overflow: 'visible',
                          top: '55%',
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="Card image"
                          src="/assets/density.png"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.density}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PREMIUM MEMBERSHIP OPTIONS */}
                <div className="flex flex-col gap-3 mx-auto mb-6" style={{ marginTop: '18px', transform: 'translateY(3px)' }}>
                  <p className="text-[9px] sm:text-sm md:text-base lg:text-lg font-medium text-black text-center" style={{ fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500' }}>
                    PREMIUM MEMBERSHIP OPTIONS:
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mx-auto justify-evenly">
                    {/* LACE */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('lace', '13X6')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        LACE
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '74px',
                          height: '74px',
                          overflow: 'visible',
                          top: '52%',
                          transform: 'translateX(calc(-50% - 3px)) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="Card image"
                          src="/assets/lace-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.lace}
                      </p>
                    </div>

                    {/* TEXTURE */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('texture', 'SILKY')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        TEXTURE
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                              width: '74px',
                              height: '74px',
                          overflow: 'visible',
                              top: '52%',
                              transform: 'translateX(calc(-50% - 3px)) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="Card image"
                              src="/assets/texture-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.texture}
                      </p>
                    </div>

                    {/* COLOR */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('color', 'OFF BLACK')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        COLOR
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '35px',
                          height: '35px',
                          overflow: 'visible',
                          top: '55%',
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      >
                        <div
                              className="w-full h-full rounded-full"
                              style={{ backgroundColor: '#000000' }}
                            />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.color}
                      </p>
                    </div>

                    {/* HAIRLINE */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('hairline', 'NATURAL')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        HAIRLINE
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                              width: '74px',
                              height: '74px',
                          overflow: 'visible',
                              top: '52%',
                              transform: 'translateX(calc(-50% - 3px)) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="Card image"
                              src="/assets/hairline-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.hairline}
                      </p>
                    </div>

                    {/* STYLING */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('styling', 'NATURAL')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        STYLING
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '35px',
                          height: '35px',
                          overflow: 'visible',
                          top: '55%',
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="None icon"
                          src="/assets/none-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        {customization.styling}
                      </p>
                    </div>

                    {/* ADD-ONS */}
                    <div
                      className="border relative text-center cursor-pointer border-black bg-white"
                      style={{
                        borderWidth: '1.3px',
                        width: '60px',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0',
                        overflow: 'visible'
                      }}
                      onClick={() => handleOptionSelect('addOns', 'NONE')}
                    >
                      <p
                        className="text-[12px] md:text-base text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                        style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                      >
                        ADD-ONS
                      </p>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                        style={{
                          width: '35px',
                          height: '35px',
                          overflow: 'visible',
                          top: '55%',
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      >
                        <img
                          alt="None icon"
                          src="/assets/none-icon.svg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            position: 'relative'
                          }}
                        />
                      </div>
                      <p className="absolute bottom-[-6.9px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[9px] w-full md:text-xs font-medium text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Inter, sans-serif' }}>
                        NONE
                      </p>
                    </div>
                  </div>
                </div>

                </div>
                  </div>

                {/* ADD TO BAG BUTTON - OUTSIDE CONTAINER */}
                <button
                  onClick={handleAddToBag}
                  disabled={addToBagState === 'adding'}
                  className={`border border-black font-futura w-full text-center py-4 text-sm font-semibold ${
                    addToBagState === 'adding' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer hover:bg-gray-50'
                  }`}
                  style={{
                    borderWidth: '1.3px',
                    color: addToBagState === 'adding' ? '#EB1C24' : '#EB1C24',
                    fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif',
                    marginTop: '10px'
                  }}
                >
                  {addToBagState === 'idle' && 'ADD TO BAG'}
                  {addToBagState === 'adding' && 'ADDING...'}
                  {addToBagState === 'added' && (
                    <span className="flex items-center justify-center gap-1">
                      <img src="/assets/check.svg" alt="Check" width="9" height="9" />
                      <span style={{ color: '#909090' }}>IN THE BAG</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT PANEL - NAVIGATION & SHOPPING BAG */}
            <div className="pl-4 flex flex-col" style={{ width: '400px' }}>
              {/* TOP NAVIGATION CONTAINER */}
              <div className="border border-black p-6 mb-4 bg-white/60 backdrop-blur-sm" style={{ borderWidth: '1.3px', minHeight: '400px' }}>
                {/* TAB BUTTONS */}
                <div className="flex gap-8 mb-6 justify-center">
                     <button
                       onClick={() => handleDesktopMenuTabClick('SHOP')}
                       style={{ 
                         fontFamily: '"Covered By Your Grace", cursive',
                         fontSize: '22px',
                         color: desktopMenuActiveTab === 'SHOP' ? '#EB1C24' : 'black',
                         fontWeight: '400',
                         textTransform: 'none',
                         borderBottom: desktopMenuActiveTab === 'SHOP' ? '2px solid #EB1C24' : 'none',
                         paddingBottom: '4px',
                         paddingLeft: '10px',
                         paddingRight: '10px',
                         background: 'none',
                         border: 'none',
                         cursor: 'pointer'
                       }}
                     >
                       SHOP
                     </button>
                     <button
                       onClick={() => handleDesktopMenuTabClick('TOOLS')}
                       style={{ 
                         fontFamily: '"Covered By Your Grace", cursive',
                         fontSize: '22px',
                         color: desktopMenuActiveTab === 'TOOLS' ? '#EB1C24' : 'black',
                         fontWeight: '400',
                         textTransform: 'none',
                         borderBottom: desktopMenuActiveTab === 'TOOLS' ? '2px solid #EB1C24' : 'none',
                         paddingBottom: '4px',
                         paddingLeft: '10px',
                         paddingRight: '10px',
                         background: 'none',
                         border: 'none',
                         cursor: 'pointer'
                       }}
                     >
                       TOOLS
                     </button>
                    <button
                      onClick={() => handleDesktopMenuTabClick('BRAND')}
                      style={{ 
                        fontFamily: desktopMenuActiveTab === 'BRAND' ? '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' : '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                        fontSize: '14px',
                        color: desktopMenuActiveTab === 'BRAND' ? '#EB1C24' : 'black',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        borderBottom: desktopMenuActiveTab === 'BRAND' ? '2px solid #EB1C24' : 'none',
                        paddingBottom: '4px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      BRAND
                    </button>
                  </div>

                  {/* MENU ITEMS */}
                  <div className="space-y-3">
                    {desktopMenuActiveTab === 'TOOLS' ? (
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
                    ) : desktopMenuActiveTab === 'BRAND' ? (
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
                            onClick={() => item.isExpandable && handleDesktopMenuItemToggle(item.label)}
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
                                src="/assets/NOIR/down-arrow.svg"
                                alt="Expand"
                                width="12"
                                height="12"
                                className={`transition-transform duration-200 ${desktopMenuExpandedItems.includes(item.label) ? 'rotate-180' : ''}`}
                              />
                            )}
                          </div>
                          {item.isExpandable && desktopMenuExpandedItems.includes(item.label) && (
                            <div className="ml-4 mt-2 space-y-2">
                              {item.subItems?.map((subItem, subIndex) => (
                                <div key={subIndex} className="text-sm" style={{ 
                                  fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif',
                                  fontSize: '12px',
                                  color: '#666',
                                  fontWeight: '400',
                                  textTransform: 'uppercase'
                                }}>
                                  {subItem}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex gap-4 mt-6 justify-center">
                    <img src="/assets/twitter-icon.svg" alt="Twitter" width="20" height="20" className="cursor-pointer" />
                    <img src="/assets/instagram-icon.svg" alt="Instagram" width="20" height="20" className="cursor-pointer" />
                    <img src="/assets/facebook-icon.svg" alt="Facebook" width="20" height="20" className="cursor-pointer" />
                    <img src="/assets/tiktok-icon.svg" alt="TikTok" width="20" height="20" className="cursor-pointer" />
                  </div>
                </div>

                {/* SIGN OUT BUTTON - OUTSIDE CONTAINER */}
                <button 
                  onClick={handleDesktopMenuSignInToggle}
                  className="w-full px-4 py-3 bg-white text-sm font-medium mb-4"
                  style={{ 
                    fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif',
                    color: '#EB1C24',
                    border: '1.3px solid black'
                  }}
                >
                  {isSignedIn ? 'SIGN OUT' : 'SIGN IN'}
                </button>

                {/* YOUR BAG CONTAINER */}
                <div className="border border-black p-6 bg-white/60 backdrop-blur-sm" style={{ borderWidth: '1.3px', minHeight: '279px' }}>
                  <div className="mb-4">
                    <p
                      className="text-2xl font-medium mb-2"
                      style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                    >
                      YOUR BAG
                    </p>
                    <div className="text-sm cursor-pointer" style={{ color: '#EB1C24' }}>
                      CHANGE CURRENCY &gt; USD
                    </div>
                  </div>

                  {/* CART ITEMS */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-3 border border-gray-200">
                        <img
                          src={item.image || '/assets/NOIR/noir-thumb.png'}
                          alt={item.name}
                          width="60"
                          height="60"
                          className="object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm" style={{ color: '#EB1C24' }}>
                            ${item.price} USD
                          </p>
                          <p className="text-xs cursor-pointer" style={{ color: '#EB1C24' }}>
                            EDIT IN BUILD-A-WIG
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <img src="/assets/close-icon.svg" alt="Remove" width="12" height="12" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* SUBTOTAL */}
                  <div className="mb-6">
                    <p className="text-sm font-medium">
                      SUBTOTAL ${cartSubtotal} USD
                    </p>
                  </div>
                </div>

                {/* PROCEED TO BAG BUTTON - OUTSIDE CONTAINER */}
                <button className="w-full py-4 bg-white text-sm font-medium" style={{ 
                  fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif', 
                  marginTop: '15px',
                  color: '#EB1C24',
                  border: '1.3px solid black'
                }}>
                  PROCEED TO BAG
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
