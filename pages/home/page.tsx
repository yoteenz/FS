
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();

  const pageCategories = {
    'Main Pages': [
      { name: 'Build-A-Wig', path: '/build-a-wig', description: 'Custom wig builder with all options' },
      { name: 'Product Page', path: '/product', description: 'Main product page with purchase options' },
      { name: 'Wishlist', path: '/wishlist', description: 'User\'s vacation list with saved items' },
      { name: 'Menu', path: '/menu', description: 'Navigation menu' }
    ],
    'Build-A-Wig Selection Pages': [
      { name: 'Cap Size Selection', path: '/build-a-wig/cap-size', description: 'Choose wig cap size' },
      { name: 'Length Selection', path: '/build-a-wig/length', description: 'Choose hair length' },
      { name: 'Density Selection', path: '/build-a-wig/density', description: 'Choose hair density' },
      { name: 'Lace Selection', path: '/build-a-wig/lace', description: 'Choose lace type' },
      { name: 'Texture Selection', path: '/build-a-wig/texture', description: 'Choose hair texture' },
      { name: 'Color Selection', path: '/build-a-wig/color', description: 'Choose hair color' },
      { name: 'Hairline Selection', path: '/build-a-wig/hairline', description: 'Choose hairline style' },
      { name: 'Styling Selection', path: '/build-a-wig/styling', description: 'Choose styling options' },
      { name: 'Add-ons Selection', path: '/build-a-wig/addons', description: 'Choose additional features' }
    ],
    'Admin Dashboard': [
      { name: 'Main Dashboard', path: '/admin/dashboard', description: 'Main dashboard with overview stats' },
      { name: 'System Overview', path: '/admin/overview', description: 'Visual guide and functionality preview' },
      { name: 'Clients Management', path: '/admin/clients', description: 'Manage client accounts' },
      { name: 'Client Account Details', path: '/admin/clients/account', description: 'Individual client account view' },
      { name: 'Meetings Scheduler', path: '/admin/meetings', description: 'Schedule and manage appointments' },
      { name: 'Revenue Tracking', path: '/admin/revenue', description: 'Financial analytics and reports' },
      { name: 'Visual Overview', path: '/admin/visual-overview', description: 'Visual dashboard overview' },
      { name: 'Reviews Management', path: '/admin/reviews', description: 'Customer reviews and feedback' },
      { name: 'Settings', path: '/admin/settings', description: 'System configuration' },
      { name: 'Preferences', path: '/admin/preferences', description: 'User preferences' },
      { name: 'Brand Settings', path: '/admin/brand', description: 'Brand customization' },
      { name: 'Product Editor', path: '/admin/product-editor', description: 'Edit product details' },
      { name: 'Pending Orders', path: '/admin/pending', description: 'Manage pending orders' }
    ],
    'Specialty Pages': [
      { name: 'Premium Membership', path: '/premium-membership', description: 'Membership upgrade page' },
      { name: 'Coming Soon', path: '/coming-soon', description: 'Coming soon placeholder' },
      { name: 'CSLP Page', path: '/cslp', description: 'Custom styling landing page' },
      { name: 'Finished Orders', path: '/finished', description: 'Completed orders page' },
      { name: 'Build-A-Wig Desktop', path: '/build-a-wig-desktop', description: 'Desktop version of wig builder' }
    ],
    'Test & Demo Pages': [
      { name: 'Readdy Agent Test', path: '/readdy-agent-test', description: 'AI assistant demo page' },
      { name: 'Wig Comparison Test', path: '/wig-comparison-test', description: 'Product comparison demo' },
      { name: 'Loading Animation Test', path: '/loading-test', description: 'Loading screen demo' }
    ]
  };

  const renderPageCategory = (categoryName: string, pages: typeof pageCategories['Main Pages']) => (
    <div key={categoryName} className="mb-8">
      <h3 className="text-red-500 font-bold text-base mb-4 tracking-wider border-b border-red-500 pb-2" style={{ color: '#EB1C24' }}>
        {categoryName}
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {pages.map((page, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-black text-sm">{page.name}</h4>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {page.path}
              </span>
            </div>
            <p className="text-gray-600 text-xs mb-3 leading-relaxed">{page.description}</p>
            <button 
              onClick={() => navigate(page.path)}
              className="w-full py-2 bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors rounded"
              style={{ backgroundColor: '#EB1C24' }}
            >
              VIEW PAGE
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // State placeholders for thumbnail view (actual data should be provided elsewhere)
  const [selectedView, setSelectedView] = useState(0);
  const thumbnailImages = [];

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
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

      {/* Scrollable Content */}
      <div className="relative z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
              logo
            </h1>
            <p className="text-gray-600 text-sm">Hair Brand Website - All Pages Preview</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border-2 border-black p-4 rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-red-500 font-bold text-lg mb-2 tracking-wider" style={{ color: '#EB1C24' }}>
                WEBSITE STRUCTURE
              </h2>
              <p className="text-xs text-gray-600">
                Browse all {Object.values(pageCategories).flat().length} pages organized by category
              </p>
            </div>
            
            {/* Render all categories */}
            {Object.entries(pageCategories).map(([categoryName, pages]) => 
              renderPageCategory(categoryName, pages)
            )}

            {/* Summary Statistics */}
            <div className="mt-8 p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200">
              <h3 className="font-bold text-black mb-3 text-center">Project Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-center">
                  <p className="font-bold text-lg text-red-500" style={{ color: '#EB1C24' }}>
                    {pageCategories['Main Pages'].length}
                  </p>
                  <p className="text-gray-600">Main Pages</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-red-500" style={{ color: '#EB1C24' }}>
                    {pageCategories['Build-A-Wig Selection Pages'].length}
                  </p>
                  <p className="text-gray-600">Builder Pages</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-red-500" style={{ color: '#EB1C24' }}>
                    {pageCategories['Admin Dashboard'].length}
                  </p>
                  <p className="text-gray-600">Admin Pages</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-red-500" style={{ color: '#EB1C24' }}>
                    {pageCategories['Specialty Pages'].length + pageCategories['Test & Demo Pages'].length}
                  </p>
                  <p className="text-gray-600">Other Pages</p>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex justify-center gap-3 mt-6">
              {thumbnailImages.map((thumb, index) => (
                <div
                  key={index}
                  className="relative w-20 h-24 cursor-pointer"
                  onClick={() => setSelectedView(index)}
                >
                  {/* Main thumbnail image */}
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  
                  {/* Leaf brick overlay with selection border */}
                  <div 
                    className={`absolute inset-0 rounded-lg pointer-events-none bg-[#f8f9fa] opacity-40`}
                    style={{
                      backgroundImage: `url('/assets/leaf-brick-1.svg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      border: selectedView === index ? '3px solid white' : '3px solid transparent',
                      boxShadow: selectedView === index ? '0 0 0 1.3px black' : 'none'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Key Features */}
            <div className="mt-6 p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200">
              <h3 className="font-bold text-black mb-2 text-center">Key Features</h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>• Custom Wig Builder</div>
                <div>• Wishlist Management</div>
                <div>• Admin Dashboard</div>
                <div>• Client Management</div>
                <div>• Revenue Tracking</div>
                <div>• Meeting Scheduler</div>
                <div>• Product Display</div>
                <div>• Review System</div>
                <div>• Brand Settings</div>
                <div>• AI Assistant</div>
                <div>• Loading Animations</div>
                <div>• Comparison Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
