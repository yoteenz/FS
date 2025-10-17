import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  isOnSale?: boolean;
}

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'STRAIGHT NOIR',
      image: 'https://readdy.ai/api/search-image?query=elegant%20black%20straight%20hair%20wig%20product%2C%20luxury%20hair%20extensions%2C%20premium%20quality%2C%20professional%20photography%2C%20clean%20white%20background%2C%20high-end%20beauty%20product&width=300&height=300&seq=wishlist-1&orientation=squarish',
      price: '$860',
      rating: 5,
    },
    {
      id: '2', 
      name: 'CURLY BLONDE',
      image: 'https://readdy.ai/api/search-image?query=beautiful%20blonde%20curly%20hair%20wig%2C%20voluminous%20curls%2C%20premium%20hair%20product%2C%20professional%20beauty%20photography%2C%20clean%20white%20background%2C%20luxury%20styling&width=300&height=300&seq=wishlist-2&orientation=squarish',
      price: '$920',
      originalPrice: '$1050',
      rating: 4,
      isOnSale: true,
    },
    {
      id: '3',
      name: 'WAVY BROWN',
      image: 'https://readdy.ai/api/search-image?query=chocolate%20brown%20wavy%20hair%20wig%2C%20natural%20waves%2C%20premium%20quality%20hair%2C%20beauty%20product%20photography%2C%20clean%20background%2C%20elegant%20styling&width=300&height=300&seq=wishlist-3&orientation=squarish',
      price: '$780',
      rating: 5,
    },
    {
      id: '4',
      name: 'STRAIGHT PLATINUM',
      image: 'https://readdy.ai/api/search-image?query=platinum%20blonde%20straight%20hair%20wig%2C%20luxury%20hair%20extensions%2C%20sleek%20style%2C%20premium%20beauty%20product%2C%20professional%20photography%2C%20white%20background&width=300&height=300&seq=wishlist-4&orientation=squarish',
      price: '$1120',
      rating: 5,
    },
    {
      id: '5',
      name: 'CURLY RED',
      image: 'https://readdy.ai/api/search-image?query=vibrant%20red%20curly%20hair%20wig%2C%20bouncy%20curls%2C%20premium%20hair%20product%2C%20luxury%20beauty%20item%2C%20professional%20photography%2C%20clean%20white%20background&width=300&height=300&seq=wishlist-5&orientation=squarish',
      price: '$890',
      originalPrice: '$960',
      rating: 4,
      isOnSale: true,
    },
    {
      id: '6',
      name: 'BODY WAVE BLACK',
      image: 'https://readdy.ai/api/search-image?query=jet%20black%20body%20wave%20hair%20wig%2C%20natural%20texture%2C%20premium%20quality%2C%20beauty%20product%20photography%2C%20elegant%20styling%2C%20clean%20background&width=300&height=300&seq=wishlist-6&orientation=squarish',
      price: '$840',
      rating: 5,
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveItem = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const handleAddToBag = (itemId: string) => {
    console.log('Adding to bag:', itemId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#EB1C24' : '#D1D5DB' }}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://www.dropbox.com/scl/fi/u4m42t2levejhysa3mnby/Marble-Floor.jpg?rlkey=j87posj7qo7fed7v6vihe09kr&st=uzmjl2p3&dl=1')`,
        backgroundSize: '500% auto',
        backgroundPosition: 'right 140%',
        backgroundRepeat: 'repeat-y'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-4 bg-white/60 backdrop-blur-sm border-b border-black" style={{ borderWidth: '1.3px' }}>
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8"
        >
          <img
            alt="Back"
            width="10"
            height="10"
            src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBACK.69550822.png&w=32&q=75"
          />
        </button>
        <h1 
          className="text-sm font-medium uppercase tracking-wider"
          style={{ 
            fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif', 
            fontWeight: '500',
            color: '#EB1C24'
          }}
        >
          VACATION LIST
        </h1>
        <button className="flex items-center justify-center w-8 h-8">
          <img
            alt="Search icon"
            width="16"
            height="15"
            src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsearch.713ec616.png&w=32&q=75"
          />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Items Count */}
        <div className="mb-6 text-center">
          <p 
            className="text-xs font-medium uppercase tracking-wider"
            style={{ 
              fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
              color: '#909090'
            }}
          >
            {wishlistItems.length} ITEMS IN YOUR VACATION LIST
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white border-2 border-black relative" style={{ borderWidth: '1.3px' }}>
              {/* Sale Badge */}
              {item.isOnSale && (
                <div 
                  className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 z-10 uppercase font-bold"
                  style={{ 
                    backgroundColor: '#EB1C24',
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontSize: '8px'
                  }}
                >
                  SALE
                </div>
              )}

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-white border border-black flex items-center justify-center z-10 hover:bg-gray-50"
                style={{ borderWidth: '1px' }}
              >
                <i className="ri-close-line text-sm"></i>
              </button>

              {/* Product Image */}
              <div className="aspect-square bg-white overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 
                  className="text-xs font-bold uppercase mb-1 text-center"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: '700',
                    color: '#000000',
                    letterSpacing: '0.5px'
                  }}
                >
                  {item.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-center mb-2">
                  <span 
                    className="text-sm font-bold"
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: '700',
                      color: '#000000'
                    }}
                  >
                    {item.price} USD
                  </span>
                  {item.originalPrice && (
                    <span 
                      className="text-xs text-gray-500 line-through ml-2"
                      style={{
                        fontFamily: 'Arial, sans-serif'
                      }}
                    >
                      {item.originalPrice} USD
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-3 text-xs">
                  {renderStars(item.rating)}
                </div>

                {/* Add to Bag Button */}
                <button 
                  onClick={() => handleAddToBag(item.id)}
                  className="w-full bg-red-500 text-white py-2 text-xs font-bold uppercase hover:bg-red-600 transition-colors"
                  style={{ 
                    backgroundColor: '#EB1C24',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Message (when no items) */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <i className="ri-heart-line text-6xl text-gray-300"></i>
            </div>
            <h3 
              className="text-lg font-bold uppercase mb-2"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: '700',
                color: '#000000',
                letterSpacing: '1px'
              }}
            >
              YOUR VACATION LIST IS EMPTY
            </h3>
            <p 
              className="text-sm text-gray-600 mb-6"
              style={{
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Start adding items to create your perfect vacation look
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="bg-red-500 text-white px-8 py-3 text-sm font-bold uppercase hover:bg-red-600 transition-colors"
              style={{ 
                backgroundColor: '#EB1C24',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              START SHOPPING
            </button>
          </div>
        )}

        {/* Clear All Button (when items exist) */}
        {wishlistItems.length > 0 && (
          <div className="text-center">
            <button 
              onClick={() => setWishlistItems([])}
              className="border-2 border-black text-black px-8 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
              style={{ 
                borderWidth: '1.3px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}
            >
              CLEAR ALL ITEMS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}