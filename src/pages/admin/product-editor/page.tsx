
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';

export default function AdminProductEditor() {
  const [products] = useState([
    {
      id: 1,
      name: 'SOFT WAVE',
      category: 'WIGS',
      price: 450,
      stock: 8,
      status: 'active',
      lastUpdated: '2/6/2025'
    },
    {
      id: 2,
      name: 'NOIR',
      category: 'WIGS',
      price: 520,
      stock: 5,
      status: 'low_stock',
      lastUpdated: '2/5/2025'
    },
    {
      id: 3,
      name: 'CURLY TEXTURE',
      category: 'WIGS',
      price: 480,
      stock: 12,
      status: 'active',
      lastUpdated: '2/4/2025'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'low_stock': return '#f59e0b';
      case 'out_of_stock': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ACTIVE';
      case 'low_stock': return 'LOW STOCK';
      case 'out_of_stock': return 'OUT OF STOCK';
      default: return 'UNKNOWN';
    }
  };

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
      {/* Fixed Background Layer */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('/assets/Marble Floor.jpg')`,
          backgroundSize: '500% auto',
          backgroundPosition: 'right 140%',
          backgroundRepeat: 'repeat-y'
        }}
      ></div>
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        <AdminHeader title="PRODUCT EDITOR" showBack onBack={() => window.history.back()} />
        
        <div className="pb-6 px-4">
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white/60 backdrop-blur-sm border border-black p-4" style={{ borderWidth: '1.4px' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}>
                  PRODUCT INVENTORY
                </h2>
                <button className="px-3 py-1 bg-red-500 text-white text-xs font-futura hover:bg-red-600" style={{ backgroundColor: '#EB1C24' }}>
                  ADD PRODUCT
                </button>
              </div>
              
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-sm font-futura">{product.name}</h3>
                        <p className="text-xs text-gray-600 font-futura">{product.category}</p>
                      </div>
                      <span 
                        className="text-xs font-futura px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: getStatusColor(product.status) + '20',
                          color: getStatusColor(product.status)
                        }}
                      >
                        {getStatusText(product.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs font-futura">
                      <div>
                        <span className="text-gray-600">PRICE:</span>
                        <div>${product.price}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">STOCK:</span>
                        <div style={{ color: product.stock <= 10 ? '#EB1C24' : '#000' }}>
                          {product.stock}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">UPDATED:</span>
                        <div>{product.lastUpdated}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-3">
                      <button className="text-xs font-futura text-blue-600 hover:text-blue-800">
                        EDIT
                      </button>
                      <button className="text-xs font-futura hover:opacity-80" style={{ color: '#EB1C24' }}>
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
