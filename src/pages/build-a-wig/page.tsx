import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/base/LoadingScreen';
import DynamicCartIcon from '../../components/DynamicCartIcon';

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

export default function BuildAWigPage() {
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
        density: item.density || '200%',
        lace: item.lace || '13X6',
        texture: item.texture || 'SILKY',
        color: item.color || 'OFF BLACK',
        hairline: item.hairline || 'NATURAL',
        styling: item.styling || 'NONE',
        addOns: item.addOns || [],
      };
    }
    // Default values
    return {
      capSize: 'M',
      length: '24"',
      density: '200%',
      lace: '13X6',
      texture: 'SILKY',
      color: 'OFF BLACK',
      hairline: 'NATURAL',
      styling: 'NONE',
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

  // Load editing item data into localStorage when in editing mode
  useEffect(() => {
    if (isEditingMode) {
      const editingCartItem = localStorage.getItem('editingCartItem');
      console.log('Editing cart item:', editingCartItem);
      if (editingCartItem) {
        const item = JSON.parse(editingCartItem);
        console.log('Parsed item:', item);
        
        // Store the original item for comparison
        setOriginalItem(item);
        
        // Set all the localStorage values that the option pages use
        localStorage.setItem('selectedCapSize', item.capSize || 'M');
        localStorage.setItem('selectedLength', item.length || '24"');
        localStorage.setItem('selectedDensity', item.density || '200%');
        localStorage.setItem('selectedColor', item.color || 'OFF BLACK');
        localStorage.setItem('selectedTexture', item.texture || 'SILKY');
        localStorage.setItem('selectedLace', item.lace || '13X6');
        localStorage.setItem('selectedHairline', item.hairline || 'NATURAL');
        localStorage.setItem('selectedPartSelection', item.partSelection || 'MIDDLE');
        localStorage.setItem('selectedStyling', item.styling || 'NONE');
        localStorage.setItem('selectedAddOns', JSON.stringify(item.addOns || []));
        
        console.log('Set localStorage values:', {
          capSize: item.capSize,
          length: item.length,
          density: item.density,
          color: item.color,
          texture: item.texture,
          lace: item.lace,
          hairline: item.hairline,
          partSelection: item.partSelection,
          styling: item.styling,
          addOns: item.addOns
        });
        
        // Trigger a refresh to update the UI
        setRefreshTrigger(prev => prev + 1);
        
        // Manually trigger storage change to sync customization state
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('customStorageChange'));
        }, 100);
      }
    }
  }, [isEditingMode]);

  // Sync customization state with localStorage when in editing mode
  useEffect(() => {
    if (isEditingMode) {
      const editingCartItem = localStorage.getItem('editingCartItem');
      console.log('Syncing customization state, editingCartItem:', editingCartItem);
      if (editingCartItem) {
        const item = JSON.parse(editingCartItem);
        const newCustomization = {
          capSize: item.capSize || 'M',
          length: item.length || '24"',
          density: item.density || '200%',
          lace: item.lace || '13X6',
          texture: item.texture || 'SILKY',
          color: item.color || 'OFF BLACK',
          hairline: item.hairline || 'NATURAL',
          styling: item.styling || 'NONE',
          addOns: item.addOns || [],
        };
        console.log('Setting customization to:', newCustomization);
        setCustomization(newCustomization);
      }
    }
  }, [isEditingMode, refreshTrigger]);

  // Force sync customization state from localStorage when in edit mode
  useEffect(() => {
    if (isEditingMode) {
      const syncFromLocalStorage = () => {
        const savedCapSize = localStorage.getItem('selectedCapSize');
        const savedLength = localStorage.getItem('selectedLength');
        const savedDensity = localStorage.getItem('selectedDensity');
        const savedLace = localStorage.getItem('selectedLace');
        const savedTexture = localStorage.getItem('selectedTexture');
        const savedColor = localStorage.getItem('selectedColor');
        const savedHairline = localStorage.getItem('selectedHairline');
        const savedStyling = localStorage.getItem('selectedStyling');
        const savedAddOns = localStorage.getItem('selectedAddOns');

        console.log('Edit mode sync - localStorage values:', {
          capSize: savedCapSize,
          length: savedLength,
          density: savedDensity,
          lace: savedLace,
          texture: savedTexture,
          color: savedColor,
          hairline: savedHairline,
          styling: savedStyling,
          addOns: savedAddOns
        });

        setCustomization(prev => {
          const newCustomization = {
            ...prev,
            capSize: savedCapSize || prev.capSize,
            length: savedLength || prev.length,
            density: savedDensity || prev.density,
            lace: savedLace || prev.lace,
            texture: savedTexture || prev.texture,
            color: savedColor || prev.color,
            hairline: savedHairline || prev.hairline,
            styling: savedStyling || prev.styling,
            addOns: savedAddOns ? JSON.parse(savedAddOns) : prev.addOns,
          };
          
          console.log('Edit mode sync - updating customization from', prev, 'to', newCustomization);
          return newCustomization;
        });
      };

      // Sync immediately
      syncFromLocalStorage();

      // Listen for custom events
      const handleCustomChange = () => {
        console.log('Main page - Custom change event received, syncing...');
        syncFromLocalStorage();
      };

      window.addEventListener('customStorageChange', handleCustomChange);
      
      // Also add a periodic sync as backup
      const intervalId = setInterval(() => {
        if (isEditingMode) {
          console.log('Periodic sync running...');
          syncFromLocalStorage();
        }
      }, 500); // Reduced to 500ms for more responsive updates
      
      return () => {
        window.removeEventListener('customStorageChange', handleCustomChange);
        clearInterval(intervalId);
      };
    }
  }, [isEditingMode]);

  // Detect changes when in editing mode
  useEffect(() => {
    if (isEditingMode && originalItem) {
      const currentAddOns = JSON.parse(localStorage.getItem('selectedAddOns') || '[]');
      const currentPartSelection = localStorage.getItem('selectedPartSelection') || 'MIDDLE';
      
      const hasChanges = 
        customization.capSize !== originalItem.capSize ||
        customization.length !== originalItem.length ||
        customization.density !== originalItem.density ||
        customization.color !== originalItem.color ||
        customization.texture !== originalItem.texture ||
        customization.lace !== originalItem.lace ||
        customization.hairline !== originalItem.hairline ||
        customization.styling !== originalItem.styling ||
        currentPartSelection !== originalItem.partSelection ||
        JSON.stringify(customization.addOns) !== JSON.stringify(originalItem.addOns);
      
      console.log('Main page - Change detection:', {
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
        },
        currentPartSelection,
        originalPartSelection: originalItem.partSelection
      });
      
      setHasChanges(hasChanges);
    }
  }, [customization, originalItem, isEditingMode, refreshTrigger]);
  const [processingTimeText, setProcessingTimeText] = useState('EXPECT 6 - 8 WEEKS OF PROCESSING TIME FOR THIS UNIT.');
  
  // Add to bag button states: 'idle', 'adding', 'added'
  const [addToBagState, setAddToBagState] = useState<'idle' | 'adding' | 'added'>('idle');
  const [currentConfiguration, setCurrentConfiguration] = useState<string>('');
  
  // Cart count state
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem('cartCount') || '0');
  });

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
          setAddToBagState('idle');
          localStorage.removeItem('addToBagButtonState');
          localStorage.removeItem('lastAddedItemId');
          return;
        }
        
        // Check if the specific item that was added is still in cart
        const lastAddedItemId = localStorage.getItem('lastAddedItemId');
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        // If no lastAddedItemId, don't reset (item was just added)
        if (!lastAddedItemId) {
          return;
        }
        
        // Check if the specific item ID exists in cart items
        const itemStillInCart = cartItems.some((item: any) => item.id === lastAddedItemId);
        
        // Only reset if the specific item is not in cart AND we have a valid lastAddedItemId
        if (!itemStillInCart && lastAddedItemId) {
          setAddToBagState('idle');
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

  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  // Mobile menu state
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuActiveTab, setMobileMenuActiveTab] = useState('SHOP');
  const [mobileMenuExpandedItems, setMobileMenuExpandedItems] = useState<string[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Currency exchange rates (same as CartDropdown)
  const currencyRates = React.useMemo(() => ({
    USD: { symbol: '&#36;', rate: 1.0, name: 'US Dollar' },
    EUR: { symbol: '&euro;', rate: 0.85, name: 'Euro' },
    GBP: { symbol: '&pound;', rate: 0.73, name: 'British Pound' },
    CAD: { symbol: 'C&#36;', rate: 1.25, name: 'Canadian Dollar' },
    AUD: { symbol: 'A&#36;', rate: 1.35, name: 'Australian Dollar' },
    JPY: { symbol: '&yen;', rate: 110.0, name: 'Japanese Yen' },
    CNY: { symbol: '&yen;', rate: 6.45, name: 'Chinese Yuan' },
    INR: { symbol: '&#8377;', rate: 75.0, name: 'Indian Rupee' },
    BRL: { symbol: 'R&#36;', rate: 5.2, name: 'Brazilian Real' },
    MXN: { symbol: '&#36;', rate: 20.0, name: 'Mexican Peso' }
  }), []);

  const generateConfigurationString = () => {
    return `${customization.capSize}-${customization.length}-${customization.density}-${customization.color}-${customization.texture}-${customization.lace}-${customization.hairline}-${customization.styling}-${JSON.stringify(customization.addOns || [])}`;
  };

  const forceResetButtonState = () => {
    console.log('Main - RESET BUTTON CLICKED!');
    console.log('Main - Before reset:', {
      addToBagState,
      isEditingMode,
      hasChanges,
      cartCount
    });
    console.log('Main - Stack trace:', new Error().stack);
    
    // Visual debug for mobile
    document.title = 'RESET CALLED - ' + new Date().toLocaleTimeString();
    
    // Add visible debug indicator
    const debugDiv = document.createElement('div');
    debugDiv.style.cssText = 'position:fixed;top:50px;left:10px;background:red;color:white;padding:10px;z-index:9999;font-size:12px;';
    debugDiv.textContent = 'RESET CALLED: ' + new Date().toLocaleTimeString();
    document.body.appendChild(debugDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (debugDiv.parentNode) {
        debugDiv.parentNode.removeChild(debugDiv);
      }
    }, 3000);
    
    setAddToBagState('idle');
    setIsEditingMode(false);
    setHasChanges(false);
    setOriginalItem(null);
    localStorage.removeItem('addToBagButtonState');
    localStorage.removeItem('lastAddedConfiguration');
    localStorage.removeItem('editingCartItem');
    localStorage.removeItem('editingCartItemId');
    
    console.log('Main - After reset - state should be updated');
  };

  // Helper functions to get correct icons based on selections
  const getCapSizeIcon = () => {
    const selectedCapSize = localStorage.getItem('selectedCapSize') || 'M';
    return '/assets/cap size-icon.svg'; // All cap sizes use the same icon
  };

  const getLengthIcon = () => {
    const selectedLength = localStorage.getItem('selectedLength') || '24"';
    if (['16"', '18"', '20"', '22"'].includes(selectedLength)) {
      return '/assets/back length-icon.svg';
    } else if (['24"', '26"', '28"', '30"'].includes(selectedLength)) {
      return '/assets/b length thumb.png';
    } else {
      return '/assets/thigh length thumb.png';
    }
  };

  const getLengthThumbnailSize = () => {
    const selectedLength = localStorage.getItem('selectedLength') || '24"';
    // First row (16", 18", 20", 22") uses 72px, others use 42px (reduced by 5px)
    if (['16"', '18"', '20"', '22"'].includes(selectedLength)) {
      return '72px';
    } else {
      return '42px';
    }
  };

  const getLengthThumbnailTopPosition = () => {
    const selectedLength = localStorage.getItem('selectedLength') || '24"';
    // First row (16", 18", 20", 22") uses 50%, others use calc(58% - 1px)
    if (['16"', '18"', '20"', '22"'].includes(selectedLength)) {
      return '50%';
    } else {
      return 'calc(58% - 1px)';
    }
  };

  const getDensityIcon = () => {
    return '/assets/density.png'; // All densities use the same icon
  };

  const getLaceIcon = () => {
    return '/assets/lace-icon.svg'; // All lace types use the same icon
  };

  const getTextureIcon = () => {
    return '/assets/Texture-icon.svg'; // All textures use the same icon
  };

  const getColorIcon = () => {
    return '/assets/none-icon.svg'; // Color uses a custom color circle, not an icon
  };

  const getHairlineIcon = () => {
    const selectedHairline = localStorage.getItem('selectedHairline') || 'NATURAL';
    
    // Handle comma-separated values (multiple selections)
    const hairlineArray = selectedHairline.split(',');
    const correctOrder = ['NATURAL', 'LAGOS', 'PEAK'];
    
    // Sort selections according to the correct order and get the first one
    const sortedSelections = hairlineArray.sort((a, b) => {
      const indexA = correctOrder.indexOf(a);
      const indexB = correctOrder.indexOf(b);
      return indexA - indexB;
    });
    
    const firstHairline = sortedSelections[0];
    
    switch (firstHairline) {
      case 'NATURAL':
        return '/assets/Natural Hairline-icon.svg';
      case 'LAGOS':
        return '/assets/Lagos Hairline-icon.svg';
      case 'PEAK':
        return '/assets/Peak Hairline-icon.svg';
      default:
        return '/assets/Natural Hairline-icon.svg';
    }
  };

  const getHairlineDisplayText = () => {
    const selectedHairline = localStorage.getItem('selectedHairline') || 'NATURAL';
    
    // Handle comma-separated values (multiple selections)
    const hairlineArray = selectedHairline.split(',');
    const correctOrder = ['NATURAL', 'LAGOS', 'PEAK'];
    
    // Sort selections according to the correct order
    const sortedSelections = hairlineArray.sort((a, b) => {
      const indexA = correctOrder.indexOf(a);
      const indexB = correctOrder.indexOf(b);
      return indexA - indexB;
    });
    
    const firstHairline = sortedSelections[0];
    const additionalCount = sortedSelections.length - 1;
    
    if (additionalCount > 0) {
      return `${firstHairline} +${additionalCount}`;
    } else {
      return firstHairline;
    }
  };

  const getStylingIcon = () => {
    const selectedHairStyling = localStorage.getItem('selectedHairStyling');
    
    // If hair styling is selected, show the first one's icon
    if (selectedHairStyling) {
      const hairStylingIconMap: { [key: string]: string } = {
        'BANGS': '/assets/Bangs-icon.svg',
        'CRIMPS': '/assets/Crimps-icon.svg',
        'FLAT IRON': '/assets/Flat iron-icon.svg',
        'LAYERS': '/assets/Layers-icon.svg'
      };
      
      // Handle comma-separated values (multiple selections)
      const stylingArray = selectedHairStyling.split(',');
      const correctOrder = ['BANGS', 'CRIMPS', 'FLAT IRON', 'LAYERS'];
      
      // Sort selections according to the correct order and get the first one
      const sortedSelections = stylingArray.sort((a, b) => {
        const indexA = correctOrder.indexOf(a);
        const indexB = correctOrder.indexOf(b);
        return indexA - indexB;
      });
      
      const firstStyling = sortedSelections[0];
      return firstStyling ? hairStylingIconMap[firstStyling] || '/assets/none-icon.svg' : '/assets/none-icon.svg';
    }
    
    // If no hair styling is selected, show none icon
    return '/assets/none-icon.svg';
  };

  const getStylingIconSize = () => {
    const selectedHairStyling = localStorage.getItem('selectedHairStyling');
    
    // If no hair styling is selected, return smaller size for none icon
    if (!selectedHairStyling) {
      return '35px'; // Reduced by 45px from default 80px
    }
    
    // Return default size for selected styling icons
    return '80px';
  };

  const getStylingIconTopPosition = () => {
    const selectedHairStyling = localStorage.getItem('selectedHairStyling');
    
    // If no hair styling is selected, return original position for none icon
    if (!selectedHairStyling) {
      return '55%'; // Original position for none icon
    }
    
    // Return moved-up position for selected styling icons
    return '52.5%'; // Moved up 2px (2.5% of 80px container)
  };

  const getStylingDisplayText = () => {
    const selectedHairStyling = localStorage.getItem('selectedHairStyling');
    
    // If hair styling is selected, show the first one + count
    if (selectedHairStyling) {
      const stylingArray = selectedHairStyling.split(',');
      const correctOrder = ['BANGS', 'CRIMPS', 'FLAT IRON', 'LAYERS'];
      
      // Sort selections according to the correct order
      const sortedSelections = stylingArray.sort((a, b) => {
        const indexA = correctOrder.indexOf(a);
        const indexB = correctOrder.indexOf(b);
        return indexA - indexB;
      });
      
      const firstStyling = sortedSelections[0];
      const additionalCount = sortedSelections.length - 1;
      
      if (additionalCount > 0) {
        return `${firstStyling} +${additionalCount}`;
      } else {
        return firstStyling;
      }
    }
    
    // If no hair styling is selected, show NONE
    return 'NONE';
  };

  const getAddOnsIcon = () => {
    const selectedAddOns = localStorage.getItem('selectedAddOns');
    if (selectedAddOns && JSON.parse(selectedAddOns).length > 0) {
      const addOns = JSON.parse(selectedAddOns);
      
      // Addon icon mapping based on the addon sub page
      const addOnIconMap: { [key: string]: string } = {
        'BLEACH': '/assets/Bleach-icon.svg',
        'PLUCK': '/assets/Pluck-icon.svg',
        'BLUNT CUT': '/assets/clip ends-icon.svg'
      };
      
      // Show the first selected addon icon
      const firstAddOn = addOns[0];
      return addOnIconMap[firstAddOn] || '/assets/none-icon.svg';
    } else {
      return '/assets/none-icon.svg';
    }
  };

  const getAddOnsIconSize = () => {
    const selectedAddOns = localStorage.getItem('selectedAddOns');
    
    // If no add-ons are selected, return smaller size for none icon
    if (!selectedAddOns || JSON.parse(selectedAddOns).length === 0) {
      return '35px'; // Reduced by 45px from default 80px
    }
    
    // Return default size for selected add-on icons
    return '80px';
  };

  const getAddOnsThumbnailTopPosition = () => {
    const selectedAddOns = localStorage.getItem('selectedAddOns');
    
    // If no add-ons are selected, return original position for none icon
    if (!selectedAddOns || JSON.parse(selectedAddOns).length === 0) {
      return '55%'; // Original position for none icon
    }
    
    const addOns = JSON.parse(selectedAddOns);
    const hasBleach = addOns.includes('BLEACH');
    const hasOnlyBleach = addOns.length === 1 && hasBleach;
    
    // Only move up if ONLY bleach is selected (not in combination with other add-ons)
    if (hasOnlyBleach) {
      return '52.5%'; // Moved up 2px for bleach only
    }
    
    // Return original position for all other cases (none, other add-ons, combinations)
    return '55%';
  };

  const getAddOnsDisplayText = () => {
    const selectedAddOns = localStorage.getItem('selectedAddOns');
    if (selectedAddOns && JSON.parse(selectedAddOns).length > 0) {
      const addOns = JSON.parse(selectedAddOns);
      const firstAddOn = addOns[0];
      const additionalCount = addOns.length - 1;
      
      if (additionalCount > 0) {
        return `${firstAddOn} +${additionalCount}`;
      } else {
        return firstAddOn;
      }
    } else {
      return 'NONE';
    }
  };

  const getSelectedColorCode = () => {
    const selectedColor = localStorage.getItem('selectedColor') || 'OFF BLACK';
    
    // Color mapping based on the color sub page
    const colorMap: { [key: string]: string } = {
      'JET BLACK': '#000000',
      'OFF BLACK': '#2A2424',
      'ESPRESSO': '#3B1301',
      'CHESTNUT': '#6C2D11',
      'HONEY': '#C58628',
      'AUBURN': '#9C5617',
      'COPPER': '#802F02',
      'GINGER': '#F64F07',
      'SANGRIA': '#7E0A1E',
      'CHERRY': '#D70808',
      'RASPBERRY': '#EF0461',
      'PLUM': '#640E82',
      'COBALT': '#290481',
      'TEAL': '#46EBCA',
      'SLIME': '#03D92A',
      'CITRINE': '#E2E91C'
    };
    
    return colorMap[selectedColor] || '#2A2424'; // Default to OFF BLACK if not found
  };

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

  const wigViews = getWigViews();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Load saved selections from localStorage
  useEffect(() => {
    const savedCapSize = localStorage.getItem('selectedCapSize');
    const savedLength = localStorage.getItem('selectedLength');
    const savedDensity = localStorage.getItem('selectedDensity');
    const savedLace = localStorage.getItem('selectedLace');
    const savedTexture = localStorage.getItem('selectedTexture');
    const savedColor = localStorage.getItem('selectedColor');
    const savedHairline = localStorage.getItem('selectedHairline');
    const savedStyling = localStorage.getItem('selectedStyling');
    const savedAddOns = localStorage.getItem('selectedAddOns');

    if (savedCapSize || savedLength || savedDensity || savedLace || savedTexture || savedColor || savedHairline || savedStyling || savedAddOns) {
      setCustomization(prev => ({
        ...prev,
        capSize: savedCapSize || prev.capSize,
        length: savedLength || prev.length,
        density: savedDensity || prev.density,
        lace: savedLace || prev.lace,
        texture: savedTexture || prev.texture,
        color: savedColor || prev.color,
        hairline: savedHairline || prev.hairline,
        styling: savedStyling || prev.styling,
        addOns: savedAddOns ? JSON.parse(savedAddOns) : prev.addOns,
      }));
    }
  }, []);

  // Listen for storage changes to update in real-time (debounced for performance)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleStorageChange = () => {
      // Skip if in edit mode - let edit mode handle its own sync
      if (isEditingMode) {
        console.log('Skipping general storage change - edit mode is handling sync');
        return;
      }
      
      // Debounce storage changes to prevent excessive re-renders
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const savedCapSize = localStorage.getItem('selectedCapSize');
        const savedLength = localStorage.getItem('selectedLength');
        const savedDensity = localStorage.getItem('selectedDensity');
        const savedLace = localStorage.getItem('selectedLace');
        const savedTexture = localStorage.getItem('selectedTexture');
        const savedColor = localStorage.getItem('selectedColor');
        const savedHairline = localStorage.getItem('selectedHairline');
        const savedStyling = localStorage.getItem('selectedStyling');
        const savedPartSelection = localStorage.getItem('selectedPartSelection');
        const savedAddOns = localStorage.getItem('selectedAddOns');

        setCustomization(prev => ({
          ...prev,
          capSize: savedCapSize || prev.capSize,
          length: savedLength || prev.length,
          density: savedDensity || prev.density,
          lace: savedLace || prev.lace,
          texture: savedTexture || prev.texture,
          color: savedColor || prev.color,
          hairline: savedHairline || prev.hairline,
          styling: savedStyling || prev.styling,
          addOns: savedAddOns ? JSON.parse(savedAddOns) : prev.addOns,
        }));
        
        console.log('Storage change detected, updating customization:', {
          capSize: savedCapSize,
          length: savedLength,
          density: savedDensity,
          lace: savedLace,
          texture: savedTexture,
          color: savedColor,
          hairline: savedHairline,
          styling: savedStyling,
          partSelection: savedPartSelection,
          addOns: savedAddOns
        });
        
        // Trigger a refresh to update icons
        setRefreshTrigger(prev => prev + 1);
      }, 200); // Increased debounce to 200ms for better performance
    };

    // Listen for both storage events and custom events
    const handleCustomStorageChange = () => {
      console.log('Custom storage change event received');
      handleStorageChange();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('customStorageChange', handleCustomStorageChange);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customStorageChange', handleCustomStorageChange);
    };
  }, [isEditingMode]); // Added isEditingMode dependency

  // Memoize price calculation to prevent unnecessary recalculations
  useEffect(() => {
    const calculatePrice = () => {
      let total = basePrice;
      
      // Get actual prices from localStorage
      const capSizePrice = parseFloat(localStorage.getItem('selectedCapSizePrice') || '0');
      const colorPrice = parseFloat(localStorage.getItem('selectedColorPrice') || '0');
      const lengthPrice = parseFloat(localStorage.getItem('selectedLengthPrice') || '0');
      const densityPrice = parseFloat(localStorage.getItem('selectedDensityPrice') || '0');
      const lacePrice = parseFloat(localStorage.getItem('selectedLacePrice') || '0');
      const texturePrice = parseFloat(localStorage.getItem('selectedTexturePrice') || '0');
      const hairlinePrice = parseFloat(localStorage.getItem('selectedHairlinePrice') || '0');
      const stylingPrice = parseFloat(localStorage.getItem('selectedStylingPrice') || '0');
      const addOnsPrice = parseFloat(localStorage.getItem('selectedAddOnsPrice') || '0');
      
      // Add all the actual prices
      total += capSizePrice + colorPrice + lengthPrice + densityPrice + lacePrice + texturePrice + hairlinePrice + stylingPrice + addOnsPrice;
      
      setTotalPrice(total);
    };

    // Debounce price calculation to prevent excessive updates
    const timeoutId = setTimeout(calculatePrice, 100);
    return () => clearTimeout(timeoutId);
  }, [customization, basePrice]);

  // Load selected currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && currencyRates[savedCurrency as keyof typeof currencyRates]) {
      setSelectedCurrency(savedCurrency);
    }
  }, [currencyRates]);

  // Save selected currency to localStorage
  useEffect(() => {
    localStorage.setItem('selectedCurrency', selectedCurrency);
  }, [selectedCurrency]);

  // Listen for currency changes from cart dropdown
  useEffect(() => {
    const handleCurrencyChange = () => {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency && currencyRates[savedCurrency as keyof typeof currencyRates]) {
        setSelectedCurrency(savedCurrency);
      }
    };

    window.addEventListener('storage', handleCurrencyChange);
    return () => window.removeEventListener('storage', handleCurrencyChange);
  }, [currencyRates]);

  // Format price with currency
  const formatPrice = React.useCallback((price: number) => {
    const currency = currencyRates[selectedCurrency as keyof typeof currencyRates];
    const convertedPrice = price * currency.rate;
    return {
      __html: currency.symbol + convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    };
  }, [currencyRates, selectedCurrency]);

  const handleOptionSelect = (category: string, optionId: string) => {
    console.log(`Selected ${category}: ${optionId}`);
    if (category === 'capSize') {
      navigate('/build-a-wig/cap-size');
      return;
    }
    if (category === 'texture') {
      navigate('/build-a-wig/texture');
      return;
    }
    if (category === 'length') {
      navigate('/build-a-wig/length');
      return;
    }
    if (category === 'density') {
      navigate('/build-a-wig/density');
      return;
    }
    if (category === 'lace') {
      navigate('/build-a-wig/lace');
      return;
    }
    if (category === 'color') {
      navigate('/build-a-wig/color');
      return;
    }
    if (category === 'hairline') {
      navigate('/build-a-wig/hairline');
      return;
    }
    if (category === 'styling') {
      navigate('/build-a-wig/styling');
      return;
    }
    if (category === 'addOns') {
      navigate('/build-a-wig/addons');
      return;
    }
    setCustomization((prev) => ({
      ...prev,
      [category]: optionId,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };


  // Check if configuration has changed
  useEffect(() => {
    const newConfig = generateConfigurationString();
    if (currentConfiguration && newConfig !== currentConfiguration) {
      // Only reset button if it's not in 'added' state
      const currentButtonState = localStorage.getItem('addToBagButtonState');
      if (currentButtonState !== 'added') {
        setAddToBagState('idle'); // Reset to idle when configuration changes
        localStorage.removeItem('addToBagButtonState'); // Clear saved button state
        localStorage.removeItem('lastAddedItemId'); // Clear saved item ID
      }
    }
    setCurrentConfiguration(newConfig);
  }, [refreshTrigger]); // Removed selectedView dependency to reduce re-renders

  // Initialize button state from localStorage on page load
  useEffect(() => {
    const savedButtonState = localStorage.getItem('addToBagButtonState');
    const lastAddedItemId = localStorage.getItem('lastAddedItemId');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    if (savedButtonState === 'added' && lastAddedItemId) {
      // Check if the item is still in cart
      const itemStillInCart = cartItems.some((item: any) => item.id === lastAddedItemId);
      if (itemStillInCart) {
        setAddToBagState('added');
      } else {
        // Item was removed, clean up
        localStorage.removeItem('addToBagButtonState');
        localStorage.removeItem('lastAddedItemId');
      }
    }
  }, []);

  const handleAddToBag = async () => {
    if (addToBagState === 'adding' || addToBagState === 'added') return;
    
    setAddToBagState('adding');
    
    // Simulate adding to bag process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (isEditingMode) {
      // Update existing cart item
      const editingCartItemId = localStorage.getItem('editingCartItemId');
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      const updatedCartItems = existingCartItems.map((item: any) => {
        if (item.id === editingCartItemId) {
          return {
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
            partSelection: localStorage.getItem('selectedPartSelection') || 'MIDDLE',
            addOns: customization.addOns
          };
        }
        return item;
      });
      
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
      // Clear editing mode
      localStorage.removeItem('editingCartItem');
      localStorage.removeItem('editingCartItemId');
      setIsEditingMode(false);
      setHasChanges(false);
      setOriginalItem(null);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } else {
      // Create new cart item
      const cartItem = {
        id: `build-a-wig-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: 'NOIR',
        price: totalPrice, // Use the calculated total price
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
        partSelection: localStorage.getItem('selectedPartSelection') || 'MIDDLE',
        addOns: customization.addOns
      };

      // Get existing cart items and add new item
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = [...existingCartItems, cartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Increment cart count when item is successfully added
      const newCartCount = cartCount + 1;
      setCartCount(newCartCount);
      localStorage.setItem('cartCount', newCartCount.toString());
      
    }
    
    // Save button state and the specific item ID that was added
    setAddToBagState('added');
    localStorage.setItem('addToBagButtonState', 'added');
    localStorage.setItem('lastAddedItemId', cartItem.id); // Track the specific item ID
    
    // Small delay to ensure cart item is fully saved before any cart update events
    setTimeout(() => {
      // Dispatch both events after a small delay
      window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: newCartCount }));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: JSON.parse(localStorage.getItem('cartItems') || '[]'), count: newCartCount } }));
    }, 100);
    
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

  // Update processing time text when localStorage changes (debounced for performance)
  useEffect(() => {
    // Update processing time when refreshTrigger changes
    setProcessingTimeText(getProcessingTimeText());
  }, [refreshTrigger]);

  // Get dynamic processing time text based on selected options
  const getProcessingTimeText = () => {
    let additionalWeekCount = 0;
    
    // Check length options (30" and above have additional week)
    const selectedLength = localStorage.getItem('selectedLength');
    const longLengths = ['30"', '32"', '34"', '36"', '40"'];
    if (selectedLength && longLengths.includes(selectedLength)) {
      additionalWeekCount++;
    }
    
    // Check density options (all densities except 130% and 150% have additional week)
    const selectedDensity = localStorage.getItem('selectedDensity');
    const additionalWeekDensities = ['180%', '200%', '250%', '300%', '350%', '400%'];
    if (selectedDensity && additionalWeekDensities.includes(selectedDensity)) {
      additionalWeekCount++;
    }
    
    // Check lace options (360 and FULL LACE have additional week)
    const selectedLace = localStorage.getItem('selectedLace');
    const additionalWeekLaces = ['360', 'FULL'];
    if (selectedLace && additionalWeekLaces.includes(selectedLace)) {
      additionalWeekCount++;
    }
    
    // Check texture options (KINKY and YAKI have additional week)
    const selectedTexture = localStorage.getItem('selectedTexture');
    const additionalWeekTextures = ['KINKY', 'YAKI'];
    if (selectedTexture && additionalWeekTextures.includes(selectedTexture)) {
      additionalWeekCount++;
    }
    
    // Check color options (all colors except OFF BLACK have additional week)
    const selectedColor = localStorage.getItem('selectedColor');
    if (selectedColor && selectedColor !== 'OFF BLACK') {
      additionalWeekCount++;
    }
    
    // Check hairline options (PEAK and LAGOS have additional week, but not when combined)
    const selectedHairline = localStorage.getItem('selectedHairline');
    if (selectedHairline) {
      const hairlineArray = selectedHairline.split(',');
      if (hairlineArray.includes('PEAK') && hairlineArray.includes('LAGOS')) {
        // Lagos + Peak combination counts as 1 additional week
        additionalWeekCount++;
      } else if (hairlineArray.includes('PEAK') || hairlineArray.includes('LAGOS')) {
        // Individual Peak or Lagos counts as 1 additional week
        additionalWeekCount++;
      }
    }
    
    // Check styling options (CRIMPS, FLAT IRON, LAYERS, and all bangs combinations have additional week)
    const selectedStyling = localStorage.getItem('selectedHairStyling');
    if (selectedStyling) {
      const stylingArray = selectedStyling.split(',');
      const hasBangs = stylingArray.includes('BANGS');
      const hasOtherStyling = stylingArray.some(styling => styling !== 'BANGS');
      
      if (hasBangs && hasOtherStyling) {
        // Bangs + other styling combination has additional week
        additionalWeekCount++;
      } else if (stylingArray.includes('CRIMPS') || stylingArray.includes('FLAT IRON') || stylingArray.includes('LAYERS')) {
        // Individual crimps, flat iron, or layers have additional week
        additionalWeekCount++;
      }
    }
    
    // Check add-ons options (BLEACH, PLUCK, and combinations have additional week)
    const selectedAddOns = localStorage.getItem('selectedAddOns');
    if (selectedAddOns) {
      const addOnsArray = JSON.parse(selectedAddOns);
      const hasBleach = addOnsArray.includes('BLEACH');
      const hasPluck = addOnsArray.includes('PLUCK');
      
      if (hasBleach || hasPluck) {
        // Any combination with bleach or pluck has additional week
        additionalWeekCount++;
      }
    }
    
    // Return appropriate processing time text
    if (additionalWeekCount >= 5) {
      return 'EXPECT 8 - 10 WEEKS OF PROCESSING TIME FOR THIS UNIT.';
    } else {
      return 'EXPECT 6 - 8 WEEKS OF PROCESSING TIME FOR THIS UNIT.';
    }
  };

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

        {/* BUILD AREA */}
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
                        className="relative bg-cover bg-center flex items-center justify-center"
                        style={{
                          width: '72px',
                          height: '95px',
                          position: 'relative',
                          zIndex: 1,
                          ...(index === 1 && { transform: 'translateX(-2px)' }),
                          ...(index === 2 && { transform: 'translateX(-4px)' })
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

            {/* CUSTOMIZATION OPTIONS */}
            <div className="w-full flex flex-col">
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
                        src={getCapSizeIcon()}
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
                      width: getLengthThumbnailSize(),
                      height: getLengthThumbnailSize(),
                      overflow: 'visible',
                      top: getLengthThumbnailTopPosition(),
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                        src={getLengthIcon()}
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
                  onClick={() => handleOptionSelect('density', '200%')}
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
                      src={getDensityIcon()}
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
                        src={getLaceIcon()}
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
                      width: '83px',
                      height: '83px',
                      overflow: 'visible',
                      top: 'calc(50% + 2px)',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                        src={getTextureIcon()}
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
                      style={{
                        width: '100%',
                        height: '100%',
                          backgroundColor: '#909090',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            width: '81%',
                            height: '81%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div
                            style={{
                              width: '76%',
                              height: '76%',
                              backgroundColor: getSelectedColorCode(),
                              borderRadius: '50%'
                      }}
                    />
                  </div>
                      </div>
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
                      width: '75px',
                      height: '75px',
                      overflow: 'visible',
                        top: '50%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="Card image"
                        src={getHairlineIcon()}
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
                    {getHairlineDisplayText()}
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
                  onClick={() => handleOptionSelect('styling', 'NONE')}
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
                        width: getStylingIconSize(),
                        height: getStylingIconSize(),
                      overflow: 'visible',
                      top: getStylingIconTopPosition(),
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="None icon"
                      src={getStylingIcon()}
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
                    {getStylingDisplayText()}
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
                        width: getAddOnsIconSize(),
                        height: getAddOnsIconSize(),
                      overflow: 'visible',
                      top: getAddOnsThumbnailTopPosition(),
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  >
                    <img
                      alt="None icon"
                      src={getAddOnsIcon()}
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
                    {getAddOnsDisplayText()}
                  </p>
                </div>
              </div>
            </div>

            {/* DYNAMIC PROCESSING TIME NOTE */}
            <p
              className="font-futura text-[10px] md:text-xs text-center my-6 w-[95%] mx-auto uppercase"
              style={{ color: '#EB1C24', fontFamily: '"Futura PT Demi", futuristic-pt, Futura, Inter, sans-serif', fontWeight: '500', transform: 'translateY(-7px)' }}
            >
        PLEASE NOTE: EACH CUSTOM UNIT IS MADE TO ORDER.<br />
        WE ENSURE ALL DETAILS ARE ACCURATE + PRECISE.<br />
        {processingTimeText}
            </p>

            {/* TOTAL PRICE */}
            <div className="text-center">
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
        </div>

        {/* ADD TO BAG BUTTON */}
        <div className="px-0 md:px-0" style={{ marginTop: '2px' }}>
              <button
                onClick={handleAddToBag}
            disabled={addToBagState === 'adding'}
            className={`border border-black font-futura w-full md:max-w-sm lg:max-w-md text-center py-2 md:py-3 lg:py-4 text-[12px] md:text-sm lg:text-base font-semibold ${
              addToBagState === 'adding' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer hover:bg-gray-50'
            }`}
            style={{ 
              borderWidth: '1.3px', 
              color: addToBagState === 'adding' ? '#EB1C24' : '#EB1C24', 
              fontFamily: '"Futura PT Medium", futuristic-pt, Futura, Inter, sans-serif' 
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
    </>
  );
}