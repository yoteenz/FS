
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardComparison() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
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
              DASHBOARD COMPARISON
            </span>
          </p>
          <div className="w-4"></div>
        </div>

        {/* Dashboard Screenshots Comparison */}
        <div className="border border-black flex flex-col pt-6 pb-4 px-5 bg-white/60 backdrop-blur-sm" style={{ borderWidth: '1.3px' }}>
          <h2 className="text-center text-xl font-bold mb-6" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}>
            Dashboard Screenshots: Version Comparison
          </h2>
          
          {/* Version 1047 Screenshot */}
          <div className="mb-6">
            <h3 className="font-bold text-center text-sm mb-3 bg-blue-100 py-2 px-3 border border-blue-300">
              VERSION 1047 (Original)
            </h3>
            <div className="bg-white border border-gray-200 p-2">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20admin%20dashboard%20interface%20screenshot%2C%20complex%20grid%20layout%20with%20multiple%20data%20cards%2C%20statistics%20panels%2C%20client%20tier%20tracking%2C%20revenue%20analytics%2C%20meeting%20scheduling%20interface%2C%20notification%20system%2C%20activity%20feed%2C%20dark%20marble%20background%2C%20Supabase%20database%20integration%2C%20advanced%20admin%20controls%2C%20comprehensive%20business%20management%20interface%2C%20professional%20UI%2FUX%20design&width=350&height=600&seq=admin-v1047&orientation=portrait"
                alt="Version 1047 Dashboard Screenshot"
                className="w-full h-auto object-cover rounded border"
              />
            </div>
            <p className="text-xs text-center mt-2 text-blue-800 font-medium">
              Complex grid-based layout with Supabase integration, real-time data, and advanced analytics
            </p>
          </div>

          {/* Current Version Screenshot */}
          <div className="mb-6">
            <h3 className="font-bold text-center text-sm mb-3 bg-green-100 py-2 px-3 border border-green-300">
              CURRENT VERSION
            </h3>
            <div className="bg-white border border-gray-200 p-2">
              <img 
                src="https://readdy.ai/api/search-image?query=Simple%20clean%20admin%20dashboard%20interface%20screenshot%2C%20minimal%20card%20layout%20with%20basic%20stats%20display%2C%20quick%20action%20buttons%2C%20recent%20orders%20list%2C%20performance%20charts%20placeholder%2C%20clean%20white%20cards%20on%20marble%20background%2C%20streamlined%20interface%2C%20essential%20admin%20functions%2C%20modern%20minimalist%20design%2C%20mobile-friendly%20layout&width=350&height=600&seq=admin-current&orientation=portrait"
                alt="Current Version Dashboard Screenshot"
                className="w-full h-auto object-cover rounded border"
              />
            </div>
            <p className="text-xs text-center mt-2 text-green-800 font-medium">
              Clean minimal design with quick action buttons and essential admin functions
            </p>
          </div>

          {/* Side by Side Comparison */}
          <div className="mb-6">
            <h3 className="font-bold text-center text-sm mb-3">SIDE-BY-SIDE COMPARISON</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                <div className="bg-blue-50 border border-blue-200 p-2">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Advanced%20admin%20dashboard%20with%20complex%20data%20grid%2C%20multiple%20statistics%20cards%2C%20client%20management%20interface%2C%20revenue%20tracking%20charts%2C%20meeting%20scheduler%2C%20notification%20panels%2C%20professional%20business%20analytics%2C%20comprehensive%20database%20integration&width=160&height=280&seq=v1047-mini&orientation=portrait"
                    alt="Version 1047 Mini"
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
                <p className="text-xs font-bold text-blue-800 mt-2">VERSION 1047</p>
                <p className="text-xs text-blue-600">Advanced Features</p>
              </div>
              <div className="text-center">
                <div className="bg-green-50 border border-green-200 p-2">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Simple%20modern%20admin%20dashboard%20with%20clean%20cards%2C%20basic%20statistics%20display%2C%20quick%20navigation%20buttons%2C%20minimal%20interface%20design%2C%20streamlined%20user%20experience%2C%20essential%20business%20functions&width=160&height=280&seq=current-mini&orientation=portrait"
                    alt="Current Version Mini"
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
                <p className="text-xs font-bold text-green-800 mt-2">CURRENT</p>
                <p className="text-xs text-green-600">Simplified Design</p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 p-3">
              <h4 className="font-bold text-xs mb-2 text-blue-800">V1047 HIGHLIGHTS</h4>
              <ul className="text-xs space-y-1">
                <li>• Real-time Supabase data</li>
                <li>• Complex analytics grid</li>
                <li>• Client tier management</li>
                <li>• Advanced notifications</li>
                <li>• 13+ admin pages</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 p-3">
              <h4 className="font-bold text-xs mb-2 text-green-800">CURRENT HIGHLIGHTS</h4>
              <ul className="text-xs space-y-1">
                <li>• Fast loading interface</li>
                <li>• Clean card layout</li>
                <li>• Essential functions</li>
                <li>• Intuitive navigation</li>
                <li>• Mobile optimized</li>
              </ul>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="space-y-3">
            <h3 className="font-bold text-center text-sm mb-3">EXPERIENCE BOTH VERSIONS</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="py-3 px-4 bg-green-500 text-white font-bold text-xs hover:bg-green-600 transition-colors"
              >
                VIEW CURRENT DASHBOARD
              </button>
              <button
                onClick={() => window.open('https://readdy.ai/version/1047/admin/dashboard', '_blank')}
                className="py-3 px-4 bg-blue-500 text-white font-bold text-xs hover:bg-blue-600 transition-colors"
              >
                VIEW VERSION 1047
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
