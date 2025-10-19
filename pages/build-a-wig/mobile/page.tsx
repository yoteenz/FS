import { useState, useEffect } from 'react';
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

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  image: string;
  isPremium?: boolean;
  description?: string;
}

export default function BuildAWigMobilePage() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(1);
  const [activeCategory, setActiveCategory] = useState('capSize');
  const [showLoading, setShowLoading] = useState(true);
  const [customization, setCustomization] = useState<WigCustomization>({
    capSize: 'M',
    length: '24"',
    density: '200%',
    lace: '13X6',
    texture: 'SILKY',
    color: 'OFF BLACK',
    hairline: 'NATURAL',
    styling: 'NONE',
    addOns: [],
  });

  const [basePrice] = useState(860);
  const [totalPrice, setTotalPrice] = useState(860);
  const [showCapSizeSelection, setShowCapSizeSelection] = useState(false);
  const [selectedCapSize, setSelectedCapSize] = useState('M');
  
  // Edit mode states
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [originalItem, setOriginalItem] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Add to bag button states: 'idle', 'adding', 'added'
  const [addToBagState, setAddToBagStateDebug] = useState<'idle' | 'adding' | 'added'>('idle');
  
  // Debug wrapper to track all setAddToBagStateDebug calls
  const setAddToBagStateDebugDebug = (newState: 'idle' | 'adding' | 'added') => {
    console.log('🔴 setAddToBagStateDebug called:', {
      from: addToBagState,
      to: newState,
      stack: new Error().stack
    });
    setAddToBagStateDebug(newState);
  };
  const [currentConfiguration, setCurrentConfiguration] = useState<string>('');
  
  // Cart count state
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem('cartCount') || '0');
  });

  // Hair views for the 3D preview
  const wigViews = [
    'https://hair-saloon-one.vercel.app/_next/static/media/imagehair1.4294b5da.svg',
    'https://hair-saloon-one.vercel.app/_next/static/media/imagehair2.e3043982.svg',
    'https://hair-saloon-one.vercel.app/_next/static/media/imagehair3.aa7b3f6f.svg'
  ];

  // Hide loading screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Check if we're in edit mode
  useEffect(() => {
    const editingCartItem = localStorage.getItem('editingCartItem');
    if (editingCartItem) {
      console.log('Mobile page - entering edit mode');
      setIsEditingMode(true);
      const item = JSON.parse(editingCartItem);
      setOriginalItem(item);
      
      // Set customization from the cart item
      setCustomization({
        capSize: item.capSize || 'M',
        length: item.length || '24"',
        density: item.density || '200%',
        lace: item.lace || '13X6',
        texture: item.texture || 'SILKY',
        color: item.color || 'OFF BLACK',
        hairline: item.hairline || 'NATURAL',
        styling: item.styling || 'NONE',
        addOns: item.addOns || [],
      });
    }
  }, []);

  useEffect(() => {
    calculatePrice();
  }, [customization]);

  // Detect changes when in editing mode
  useEffect(() => {
    // Don't run change detection during 'adding' state to prevent interference
    if (addToBagState === 'adding') {
      return;
    }
    
    if (isEditingMode && originalItem) {
      const hasChanges = 
        customization.capSize !== originalItem.capSize ||
        customization.length !== originalItem.length ||
        customization.density !== originalItem.density ||
        customization.color !== originalItem.color ||
        customization.texture !== originalItem.texture ||
        customization.lace !== originalItem.lace ||
        customization.hairline !== originalItem.hairline ||
        customization.styling !== originalItem.styling ||
        JSON.stringify(customization.addOns) !== JSON.stringify(originalItem.addOns);
      
      console.log('Mobile page - Change detection:', {
        hasChanges,
        customization: {
          capSize: customization.capSize,
          color: customization.color,
          styling: customization.styling
        },
        originalItem: {
          capSize: originalItem.capSize,
          color: originalItem.color,
          styling: originalItem.styling
        }
      });
      
      setHasChanges(hasChanges);
    }
  }, [customization, originalItem, isEditingMode]);

  // Listen for custom storage changes to trigger change detection
  useEffect(() => {
    const handleCustomStorageChange = () => {
      // Don't run change detection during 'adding' state to prevent interference
      if (addToBagState === 'adding') {
        return;
      }
      
      // Force re-evaluation of change detection
      if (isEditingMode && originalItem) {
        const hasChanges = 
          customization.capSize !== originalItem.capSize ||
          customization.length !== originalItem.length ||
          customization.density !== originalItem.density ||
          customization.color !== originalItem.color ||
          customization.texture !== originalItem.texture ||
          customization.lace !== originalItem.lace ||
          customization.hairline !== originalItem.hairline ||
          customization.styling !== originalItem.styling ||
          JSON.stringify(customization.addOns) !== JSON.stringify(originalItem.addOns);
        
        setHasChanges(hasChanges);
      }
    };

    window.addEventListener('customStorageChange', handleCustomStorageChange);
    return () => window.removeEventListener('customStorageChange', handleCustomStorageChange);
  }, [customization, originalItem, isEditingMode]);

  // Listen for cart updates to sync cart count and button state
  useEffect(() => {
    const handleCartUpdate = () => {
      const newCartCount = parseInt(localStorage.getItem('cartCount') || '0');
      setCartCount(newCartCount);
      
      // Check button state from localStorage to avoid stale closure
      const currentButtonState = localStorage.getItem('addToBagButtonState');
      
      // If button is currently 'adding', don't reset it
      if (currentButtonState === 'adding') {
        return;
      }
      
      // Only check for reset if button is currently 'added'
      if (currentButtonState === 'added') {
        // If cart is completely empty, reset button state
      if (newCartCount === 0) {
          setAddToBagStateDebug('idle');
        localStorage.removeItem('addToBagButtonState');
          localStorage.removeItem('lastAddedItemId');
        return;
      }
      
        // Check if the specific item that was added is still in cart
        const lastAddedItemId = localStorage.getItem('lastAddedItemId');
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
        // Check if the specific item ID exists in cart items
        const itemStillInCart = cartItems.some((item: any) => item.id === lastAddedItemId);
        
        // Only reset if the specific item is not in cart
        if (!itemStillInCart) {
          setAddToBagStateDebug('idle');
        localStorage.removeItem('addToBagButtonState');
          localStorage.removeItem('lastAddedItemId');
        }
      }
    };

    // Listen for custom events
    window.addEventListener('cartCountUpdated', handleCartUpdate);
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Also listen for localStorage changes as backup
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartCount' || e.key === 'cartItems') {
        handleCartUpdate();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Simple polling that only runs when button is in 'added' state
    const interval = setInterval(() => {
      // Check current button state from localStorage to avoid stale closure
      const currentButtonState = localStorage.getItem('addToBagButtonState');
      if (currentButtonState === 'added') {
        handleCartUpdate();
      }
    }, 1000); // Check every 1 second, only when needed
    
    return () => {
      window.removeEventListener('cartCountUpdated', handleCartUpdate);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);


  const forceResetButtonState = () => {
    console.log('Mobile - RESET BUTTON CLICKED!');
    console.log('Mobile - Before reset:', {
      addToBagState,
      isEditingMode,
      hasChanges,
      cartCount
    });
    
    setAddToBagStateDebug('idle');
    setIsEditingMode(false);
    setHasChanges(false);
    setOriginalItem(null);
    localStorage.removeItem('addToBagButtonState');
    localStorage.removeItem('lastAddedConfiguration');
    localStorage.removeItem('editingCartItem');
    localStorage.removeItem('editingCartItemId');
    
    console.log('Mobile - After reset - state should be updated');
    
    // Force a re-render by updating a dummy state
    setTimeout(() => {
      console.log('Mobile - 1 second after reset:', {
        addToBagState,
        isEditingMode,
        hasChanges
      });
    }, 1000);
  };

  const calculatePrice = () => {
    let total = basePrice;
    const capSizePrice = parseFloat(localStorage.getItem('selectedCapSizePrice') || '0');
    const colorPrice = parseFloat(localStorage.getItem('selectedColorPrice') || '0');
    const lengthPrice = parseFloat(localStorage.getItem('selectedLengthPrice') || '0');
    const densityPrice = parseFloat(localStorage.getItem('selectedDensityPrice') || '0');
    const lacePrice = parseFloat(localStorage.getItem('selectedLacePrice') || '0');
    const texturePrice = parseFloat(localStorage.getItem('selectedTexturePrice') || '0');
    const hairlinePrice = parseFloat(localStorage.getItem('selectedHairlinePrice') || '0');
    const stylingPrice = parseFloat(localStorage.getItem('selectedStylingPrice') || '0');
    const addOnsPrice = parseFloat(localStorage.getItem('selectedAddOnsPrice') || '0');
    total += capSizePrice + colorPrice + lengthPrice + densityPrice + lacePrice + texturePrice + hairlinePrice + stylingPrice + addOnsPrice;
    setTotalPrice(total);
  };

  const handleOptionSelect = (category: string, optionId: string) => {
    console.log(`Mobile page - Selected ${category}: ${optionId}`);
    
    // Handle all selections inline on mobile - no navigation to desktop sub pages
    setCustomization((prev) => ({
      ...prev,
      [category]: optionId,
    }));
    
    // Save to localStorage for edit mode compatibility
    console.log(`Mobile page - saving ${category}: ${optionId} to localStorage`);
    localStorage.setItem(`selected${category.charAt(0).toUpperCase() + category.slice(1)}`, optionId);
    
    // Dispatch custom event to trigger change detection
    window.dispatchEvent(new CustomEvent('customStorageChange'));
  };

  // Generate unique configuration string to detect changes
  const generateConfigurationString = () => {
    return `${customization.capSize}-${customization.length}-${customization.density}-${customization.lace}-${customization.texture}-${customization.color}-${customization.hairline}-${customization.styling}-${customization.addOns ? customization.addOns.join(',') : ''}`;
  };

  // Check if configuration has changed
  useEffect(() => {
    // Don't run configuration change detection during 'adding' state to prevent interference
    if (addToBagState === 'adding') {
      return;
    }
    
    const newConfig = generateConfigurationString();
    if (currentConfiguration && newConfig !== currentConfiguration) {
      // Check if the new configuration is already in the cart
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const matchingItem = cartItems.find((item: any) => {
        const itemConfig = `${item.capSize}-${item.length || '24"'}-${item.density}-${item.lace}-${item.texture}-${item.color}-${item.hairline}-${item.styling}-${item.addOns ? item.addOns.join(',') : ''}`;
        return itemConfig === newConfig;
      });
      
      if (matchingItem) {
        // If the new configuration is in cart, set button to 'added'
        setAddToBagStateDebug('added');
        localStorage.setItem('addToBagButtonState', 'added');
        localStorage.setItem('lastAddedItemId', matchingItem.id);
      } else {
        // If not in cart, reset to idle
        setAddToBagStateDebug('idle');
        localStorage.removeItem('addToBagButtonState');
        localStorage.removeItem('lastAddedItemId');
      }
    }
    setCurrentConfiguration(newConfig);
  }, [selectedView, activeCategory, customization]);

  // Initialize button state from localStorage on page load
  useEffect(() => {
    const savedButtonState = localStorage.getItem('addToBagButtonState');
    const lastAddedItemId = localStorage.getItem('lastAddedItemId');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    if (savedButtonState === 'added' && lastAddedItemId) {
      // Check if the item is still in cart
      const itemStillInCart = cartItems.some((item: any) => item.id === lastAddedItemId);
      if (itemStillInCart) {
        setAddToBagStateDebug('added');
      } else {
        // Item was removed, clean up
        localStorage.removeItem('addToBagButtonState');
        localStorage.removeItem('lastAddedItemId');
      }
    } else {
      // If no saved button state, check if current configuration is in cart
      const currentConfig = generateConfigurationString();
      const matchingItem = cartItems.find((item: any) => {
        const itemConfig = `${item.capSize}-${item.length || '24"'}-${item.density}-${item.lace}-${item.texture}-${item.color}-${item.hairline}-${item.styling}-${item.addOns ? item.addOns.join(',') : ''}`;
        return itemConfig === currentConfig;
      });
      
      if (matchingItem) {
        setAddToBagStateDebug('added');
        localStorage.setItem('addToBagButtonState', 'added');
        localStorage.setItem('lastAddedItemId', matchingItem.id);
      }
    }
  }, [customization]);

  const handleAddToBag = async () => {
    if (addToBagState === 'adding' || addToBagState === 'added') return;
    
    // Capture edit mode state at the start to prevent changes during "adding" state
    const isEditing = isEditingMode;
    const hasChangesValue = hasChanges;
    
    setAddToBagStateDebug('adding');
    
    // Simulate adding to bag process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let cartItem: any;
    let newCartCount: number;
    
    if (isEditingMode) {
      // Update existing cart item
      const editingCartItemId = localStorage.getItem('editingCartItemId');
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      const updatedCartItems = existingCartItems.map((item: any) => {
        if (item.id === editingCartItemId) {
          cartItem = {
            ...item,
            price: totalPrice,
            capSize: customization.capSize,
            length: customization.length,
            density: customization.density,
            color: customization.color,
            texture: customization.texture,
            lace: customization.lace,
            hairline: customization.hairline,
            styling: customization.styling,
            addOns: customization.addOns
          };
          return cartItem;
        }
        return item;
      });
      
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      newCartCount = cartCount; // No change in count for editing
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } else {
      // Create new cart item
      cartItem = {
        id: `build-a-wig-mobile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: 'NOIR',
        price: totalPrice,
        quantity: 1,
        image: '/assets/NOIR/noir-thumb.png',
        capSize: customization.capSize,
        length: customization.length,
        density: customization.density,
        color: customization.color,
        texture: customization.texture,
        lace: customization.lace,
        hairline: customization.hairline,
        styling: customization.styling,
        addOns: customization.addOns
      };
      
      // Get existing cart items and add new item
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = [...existingCartItems, cartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
      // Increment cart count when item is successfully added
      newCartCount = cartCount + 1;
      setCartCount(newCartCount);
      localStorage.setItem('cartCount', newCartCount.toString());
    }
    
    // Save button state and the specific item ID that was added
    setAddToBagStateDebug('added');
    localStorage.setItem('addToBagButtonState', 'added');
    localStorage.setItem('lastAddedItemId', cartItem.id); // Track the specific item ID
    
    // Small delay to ensure cart item is fully saved before any cart update events
    setTimeout(() => {
      // Dispatch both events after a small delay
      window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: newCartCount }));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: JSON.parse(localStorage.getItem('cartItems') || '[]'), count: newCartCount } }));
    }, 100);
    
    // Clear editing mode AFTER button state is set to 'added'
    if (isEditingMode) {
      localStorage.removeItem('editingCartItem');
      localStorage.removeItem('editingCartItemId');
      setIsEditingMode(false);
      setHasChanges(false);
      setOriginalItem(null);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

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
          backgroundAttachment: 'fixed',
        }}
      >
        {/* MOBILE MAIN CONTENT */}
        <div className="flex flex-col py-3 px-3 w-full mx-auto" style={{ maxWidth: 'none' }}>
          
          
          {/* MOBILE HEADER */}
          <div
            className="border border-black flex justify-center items-center py-2 w-full mb-3 px-3 bg-white/60 backdrop-blur-sm relative"
            style={{ borderWidth: '1.3px' }}
          >
            <div className="flex gap-3 absolute left-3">
              <button onClick={handleBack} className="cursor-pointer">
                <img
                  alt="Back"
                  width="8"
                  height="8"
                  src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBACK.69550822.png&w=32&q=75"
                />
              </button>
              <button className="cursor-pointer">
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
                onClick={() => window.REACT_APP_NAVIGATE('/build-a-wig')}
              >
                BUILD-A-WIG &gt;
              </span>{' '}
              <span
                className="font-semibold"
                style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif', fontWeight: '500' }}
              >
                NOIR
              </span>
            </p>
            <div className="gap-5 flex absolute" style={{ right: '17px', top: '5px' }}>
                <div style={{ transform: 'translateY(6px)', zIndex: 1000 }}>
                  <DynamicCartIcon count={cartCount} width={12} height={9} />
                </div>
              <img
                alt="Menu"
                width="17"
                height="18"
                className="cursor-pointer"
                src="/assets/menu-icon.svg"
              />
            </div>
          </div>

          {/* MOBILE BUILD AREA */}
          <div
            className="border border-black flex flex-col pt-4 pb-3 px-3 mb-2 bg-white/60 backdrop-blur-sm"
            style={{ borderWidth: '1.3px', overflow: 'visible' }}
          >

            {/* MOBILE WIG PREVIEW */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '16px', overflow: 'visible' }}>
              <div style={{ position: 'relative', overflow: 'visible' }}>
                <div style={{ position: 'relative', overflow: 'visible' }}>
                  <div
                  style={{
                      position: 'relative',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    width: '200px',
                    height: '280px',
                    backgroundImage: `url('/assets/leaf-brick.png')`,
                      backgroundRepeat: 'no-repeat',
                      overflow: 'visible'
                  }}
                >
                  <p
                    style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '30px',
                        zIndex: '20',
                      color: '#EB1C24',
                        margin: '0'
                    }}
                  >
                    NOIR
                  </p>
                  <img
                      src="/assets/natural front.png"
                      alt=""
                      className="natural-front-mobile"
                      style={{ 
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        zIndex: '10',
                        width: '460px !important', 
                        height: 'auto !important',
                        maxHeight: '560px !important',
                        minWidth: '460px !important',
                        maxWidth: 'none !important',
                        minHeight: 'auto !important'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* MOBILE THUMBNAILS */}
              <div className="flex justify-center space-x-2 mb-3 mt-2">
                {wigViews.map((view, index) => (
                  <div className="leaf-stack thumb" key={index}>
                    <div
                      className={`leaf-bg ${
                        selectedView === index ? 'border-black' : 'border-transparent'
                      }`}
                      style={{
                        width: '50px',
                        height: '65px',
                        position: 'relative'
                      }}
                      onClick={() => setSelectedView(index)}
                    >
                      <img
                        alt={`Thumbnail ${index + 1}`}
                        width="40"
                        height="53"
                        src={view}
                        className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE SELECT ICONS */}
            <p
              className="text-[10px] text-center text-red-500 mb-3"
              style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}
            >
              SELECT ICONS BELOW
            </p>

            {/* MOBILE BASIC MEMBERSHIP OPTIONS */}
            <div className="flex flex-col gap-2 mt-2 mx-auto mb-4">
              <p className="text-[8px] font-medium text-black text-center" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif', fontWeight: '500' }}>
                BASIC MEMBERSHIP OPTIONS:
              </p>
              <div className="grid grid-cols-3 gap-3 mx-auto justify-evenly">
                {/* CAP SIZE */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('capSize', customization.capSize)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    CAP SIZE
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.capSize}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      overflow: 'visible',
                      top: '62%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage1.8be4f077.png&w=256&q=75"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    M
                  </p>
                </div>

                {/* LENGTH */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('length', customization.length)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    LENGTH
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.length}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      overflow: 'visible',
                      top: '55%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage2.2ff27128.png&w=256&q=75"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    24"
                  </p>
                </div>

                {/* DENSITY */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('density', customization.density)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    DENSITY
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.density}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      overflow: 'visible',
                      top: '55%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage3.d380edd2.png&w=256&q=75"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    200%
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE PREMIUM MEMBERSHIP OPTIONS */}
            <div className="flex flex-col gap-2 mt-3 mx-auto mb-4">
              <p className="text-[8px] font-medium text-black text-center" style={{ fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif', fontWeight: '500' }}>
                PREMIUM MEMBERSHIP OPTIONS:
              </p>
              <div className="grid grid-cols-3 gap-3 mx-auto justify-evenly">
                {/* LACE */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('lace', customization.lace)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    LACE
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.lace}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      overflow: 'visible',
                      top: '55%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage4.ea33a249.png&w=256&q=75"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    13X6
                  </p>
                </div>

                {/* TEXTURE */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('texture', customization.texture)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    TEXTURE
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.texture}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      overflow: 'visible',
                      top: '55%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/static/media/image5.5e361069.svg"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    SILKY
                  </p>
                </div>

                {/* COLOR */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('color', customization.color)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    COLOR
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.color}
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
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/static/media/color1.9a51ab59.svg"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    OFF BLACK
                  </p>
                </div>

                {/* HAIRLINE */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('hairline', customization.hairline)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    HAIRLINE
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.hairline}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      overflow: 'visible',
                      top: '37%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                      src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage7.295b48ce.png&w=256&q=75"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        position: 'relative'
                      }}
                    />
                  </div>
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    NATURAL
                  </p>
                </div>

                {/* STYLING */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('styling', customization.styling)}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    STYLING
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.styling}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '25px',
                      height: '25px',
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
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    NONE
                  </p>
                </div>

                {/* ADD-ONS */}
                <div
                  className="border relative text-center cursor-pointer border-black bg-white"
                  style={{
                    borderWidth: '1.3px',
                    width: '50px',
                    height: '65px',
                    boxSizing: 'border-box',
                    padding: '0',
                    overflow: 'visible'
                  }}
                  onClick={() => handleOptionSelect('addOns', customization.addOns.join(','))}
                >
                  <p
                    className="text-[8px] text-black absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Covered By Your Grace", cursive' }}
                  >
                    ADD-ONS
                  </p>
                  <p
                    className="text-[6px] text-black absolute top-3 left-1/2 transform -translate-x-1/2 w-full"
                    style={{ fontFamily: '"Futura PT Book", futuristic-pt, Futura, Inter, sans-serif' }}
                  >
                    {customization.addOns.length > 0 ? customization.addOns.join(', ') : 'NONE'}
                  </p>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-[99999] flex items-center justify-center"
                    style={{
                      width: '25px',
                      height: '25px',
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
                  <p className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[7px] w-full font-medium text-red-500 text-center" style={{ color: '#EB1C24', fontFamily: '"Futura PT Medium", Futura, Futura, Inter, sans-serif' }}>
                    NONE
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE PROCESSING TIME NOTE */}
            <p
              className="font-futura text-[10px] md:text-xs text-center my-6 w-[95%] mx-auto uppercase"
              style={{ color: '#EB1C24', fontFamily: '"Futura PT Demi", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500', transform: 'translateY(-7px)' }}
            >
              PLEASE NOTE: EACH CUSTOM UNIT IS MADE TO ORDER. WE ENSURE ALL DETAILS ARE
              ACCURATE + PRECISE. EXPECT 2 - 4 WEEKS OF PROCESSING TIME FOR THIS UNIT.
            </p>

            {/* MOBILE TOTAL PRICE AND ADD TO BAG */}
            <div className="text-center">
              <p className="font-futura text-[10px] font-medium" style={{ color: '#909090' }}>
                TOTAL DUE
              </p>
              <p
                className="text-black font-medium mb-3 text-base"
                style={{ fontFamily: '"Futura PT", "Futura PT Medium", Futura, Futura, Inter, sans-serif', fontWeight: '500' }}
              >
                ${totalPrice} USD
              </p>
              <button
                onClick={handleAddToBag}
                disabled={addToBagState === 'adding'}
                className={`border border-black font-futura w-full max-w-[200px] text-center py-2 text-[10px] font-semibold ${
                  addToBagState === 'adding' ? 'bg-white cursor-not-allowed' : 'bg-white cursor-pointer hover:bg-gray-50'
                }`}
                style={{ borderWidth: '1.3px', color: '#EB1C24', backgroundColor: '#FFFFFF' }}
              >
                {addToBagState === 'idle' && 'ADD TO BAG'}
                {addToBagState === 'adding' && 'ADDING...'}
                {addToBagState === 'added' && (
                  <span className="flex items-center justify-center gap-1">
                     <img src="/assets/check.svg" alt="Check" width="5" height="5" />
                    <span style={{ color: '#909090' }}>IN THE BAG</span>
                  </span>
                )}
              </button>
              
              
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
