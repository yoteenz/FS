import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    'https://hair-saloon-one.vercel.app/_next/static/media/imagehair1.4294b5da.svg',
    'https://hair-saloon-one.vercel.app/_next/static/media/imagehair2.e3043982.svg',
    'https://hair-saloon-one.vercel.app/_next/static/media/imagehair3.aa7b3f6f.svg'
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    alert('Redirecting to checkout...');
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('https://www.dropbox.com/scl/fi/u4m42t2levejhysa3mnby/Marble-Floor.jpg?rlkey=j87posj7qo7fed7v6vihe09kr&st=uzmjl2p3&dl=1')`,
      backgroundSize: '500% auto',
      backgroundPosition: 'right 140%',
      backgroundRepeat: 'repeat-y',
    }}>
      <div className="flex flex-col py-5 px-4">
        {/* Header */}
        <div className="border border-black flex justify-between items-center py-3 w-full mb-5 px-5 bg-white/60 backdrop-blur-sm" style={{ borderWidth: '1.3px' }}>
          <button onClick={handleBack} className="cursor-pointer">
            <img alt="Back" width="10" height="10" src="https://hair-saloon-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBACK.69550822.png&w=32&q=75" />
          </button>
          <p className="font-futura text-sm">
            <span style={{ fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif', fontWeight: '500' }}>
              PRODUCT DETAILS
            </span>
          </p>
          <div className="gap-5 flex">
            <img alt="Cart" width="25" height="25" className="cursor-pointer" src="https://hair-saloon-one.vercel.app/_next/static/media/cart.d97f4b5d.svg" />
          </div>
        </div>

        {/* Product Content */}
        <div className="border border-black flex flex-col pt-6 pb-4 px-5 mb-2 bg-white/60 backdrop-blur-sm" style={{ borderWidth: '1.3px' }}>
          {/* Product Images */}
          <div className="w-full flex items-center flex-col mb-6">
            <div className="relative w-[250px] h-[350px] bg-cover bg-center flex items-center justify-center" style={{
              backgroundImage: `url('https://www.dropbox.com/scl/fi/nxm1rim6ylpoizlru4v17/Leaf-Brick-1.svg?rlkey=0692qmc3fmsf242z8ioojq0v4&st=zuold8ys&dl=1'), url('https://hair-saloon-one.vercel.app/_next/static/media/Background.14bfe077.png?w=640&q=75')`,
              backgroundSize: 'cover, cover',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat',
              backgroundBlendMode: 'overlay'
            }}>
              <p className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-5xl sm:text-6xl z-20" style={{
                fontFamily: '"Covered By Your Grace", cursive',
                color: '#EB1C24',
              }}>
                NOIR
              </p>
              <img src={productImages[selectedImage]} alt="Product" className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 z-10" />
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center space-x-2 mb-3 mt-2">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`border p-1 cursor-pointer ${selectedImage === index ? 'border-black' : 'border-transparent'}`}
                  style={{ borderWidth: selectedImage === index ? '1.3px' : '1px' }}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="relative w-[64px] h-[84px] bg-cover bg-center flex items-center justify-center" style={{
                    backgroundImage: `url('https://www.dropbox.com/scl/fi/nxm1rim6ylpoizlru4v17/Leaf-Brick-1.svg?rlkey=0692qmc3fmsf242z8ioojq0v4&st=zuold8ys&dl=1'), url('https://hair-saloon-one.vercel.app/_next/static/media/Background.14bfe077.png?w=640&q=75')`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundBlendMode: 'overlay'
                  }}>
                    <img alt={`Thumbnail ${index + 1}`} width="60" height="80" src={image} className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}>
              Premium NOIR Wig
            </h1>
            <p className="text-lg font-bold mb-4" style={{ color: '#EB1C24' }}>$860.00 USD</p>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cap Size:</span>
                <span className="font-medium">Medium (M)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-medium">24 inches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Density:</span>
                <span className="font-medium">200%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lace:</span>
                <span className="font-medium">13x6 Frontal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Texture:</span>
                <span className="font-medium">Silky Straight</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">Off Black</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="w-8 h-8 border border-gray-300 flex items-center justify-center"
              >
                -
              </button>
              <span className="font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="w-8 h-8 border border-gray-300 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Product Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium quality human hair wig with natural hairline and professional styling. 
              Each unit is carefully crafted to order with attention to detail and precision. 
              Perfect for everyday wear or special occasions.
            </p>
          </div>

          {/* Processing Time */}
          <p className="font-futura text-[9px] md:text-xs text-center font-semibold my-6 w-[80%] mx-auto uppercase" style={{ color: '#EB1C24' }}>
            PLEASE NOTE: EACH CUSTOM UNIT IS MADE TO ORDER. WE ENSURE ALL DETAILS ARE
            ACCURATE + PRECISE. EXPECT 6 - 8 WEEKS OF PROCESSING TIME FOR THIS UNIT.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            className="border border-black font-futura w-full text-center py-1 text-[10px] text-[#EB1C24] cursor-pointer font-medium bg-white"
            style={{ borderWidth: '1.3px', fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif', fontWeight: '500' }}
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="border border-black font-futura w-full text-center py-1 text-[10px] text-white cursor-pointer font-medium"
            style={{ borderWidth: '1.3px', backgroundColor: '#EB1C24', fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif', fontWeight: '500' }}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}