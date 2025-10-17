import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

export default function VisualOverview() {
  const navigate = useNavigate();
  
  const [adminPages] = useState([
    {
      title: 'DASHBOARD',
      path: '/admin/dashboard',
      description: 'MAIN OVERVIEW WITH STATS CARDS AND RECENT ACTIVITY',
      features: ['CLIENT METRICS', 'REVENUE TRACKING', 'APPOINTMENT ALERTS', 'PERFORMANCE STATS'],
      color: '#D83731'
    },
    {
      title: 'CLIENTS',
      path: '/admin/clients',
      description: 'CLIENT MANAGEMENT AND ACCOUNT DETAILS',
      features: ['CLIENT SEARCH', 'TIER FILTERING', 'ACCOUNT PROFILES', 'SERVICE HISTORY'],
      color: '#2563EB'
    },
    {
      title: 'REVENUE',
      path: '/admin/revenue',
      description: 'FINANCIAL TRACKING AND TRANSACTION HISTORY',
      features: ['REVENUE ANALYTICS', 'TRANSACTION LOGS', 'PAYMENT METHODS', 'GROWTH METRICS'],
      color: '#059669'
    },
    {
      title: 'MEETINGS',
      path: '/admin/meetings',
      description: 'APPOINTMENT SCHEDULING AND CALENDAR MANAGEMENT',
      features: ['DAILY SCHEDULE', 'BOOKING MANAGEMENT', 'CLIENT REMINDERS', 'TIME SLOTS'],
      color: '#7C3AED'
    },
    {
      title: 'PENDING',
      path: '/admin/pending',
      description: 'MANAGE PENDING PAYMENTS, ORDERS, AND APPOINTMENTS',
      features: ['PAYMENT TRACKING', 'ORDER STATUS', 'APPOINTMENT REQUESTS', 'URGENT ALERTS'],
      color: '#EA580C'
    },
    {
      title: 'REVIEWS',
      path: '/admin/reviews',
      description: 'CLIENT FEEDBACK AND RATING MANAGEMENT',
      features: ['RATING ANALYTICS', 'REVIEW RESPONSES', 'CLIENT SATISFACTION', 'FEEDBACK INSIGHTS'],
      color: '#DC2626'
    },
    {
      title: 'BRAND',
      path: '/admin/brand',
      description: 'BRAND IDENTITY AND PERFORMANCE METRICS',
      features: ['BRAND ANALYTICS', 'PERFORMANCE GOALS', 'CLIENT RETENTION', 'GROWTH TRACKING'],
      color: '#1F2937'
    },
    {
      title: 'PREFERENCES',
      path: '/admin/preferences',
      description: 'USER PREFERENCES AND NOTIFICATION SETTINGS',
      features: ['NOTIFICATION CONTROLS', 'PRIVACY SETTINGS', 'APPEARANCE OPTIONS', 'SYSTEM PREFERENCES'],
      color: '#6B7280'
    },
    {
      title: 'SETTINGS',
      path: '/admin/settings',
      description: 'BUSINESS SETTINGS AND SYSTEM CONFIGURATION',
      features: ['BUSINESS INFO', 'SERVICE MANAGEMENT', 'INTEGRATIONS', 'ACCOUNT SETTINGS'],
      color: '#374151'
    }
  ]);

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen" style={{
      position: 'relative'
    }}>
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
        <AdminHeader title="SYSTEM OVERVIEW" showBack={true} onBack={handleBack} />
        
        <div className="pb-6 px-4">
          <div className="max-w-md mx-auto space-y-4">
            
            {/* Introduction */}
            <div className="bg-white/60 backdrop-blur-sm border border-black p-6 text-center" style={{ borderWidth: '1.4px' }}>
              <h2 className="text-xl font-futura font-bold text-red-500 mb-3" style={{ fontWeight: '500', color: '#D83731' }}>
                HAIR BRAND ADMIN SYSTEM
              </h2>
              <p className="text-sm font-futura leading-relaxed" style={{ fontWeight: '500', color: '#909090' }}>
                COMPREHENSIVE MANAGEMENT SYSTEM FOR HAIR BUSINESS OPERATIONS. 
                NAVIGATE THROUGH DIFFERENT SECTIONS TO MANAGE CLIENTS, TRACK REVENUE, 
                SCHEDULE MEETINGS, AND MONITOR BUSINESS PERFORMANCE.
              </p>
            </div>

            {/* System Features */}
            <div className="bg-white/60 backdrop-blur-sm border border-black p-4" style={{ borderWidth: '1.4px' }}>
              <h3 className="text-red-500 font-bold text-base mb-3 tracking-wider" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#D83731' }}>
                SYSTEM CAPABILITIES
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white/40 border border-gray-200">
                  <i className="ri-group-line text-2xl mb-1" style={{ color: '#D83731' }}></i>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    CLIENT MANAGEMENT
                  </p>
                </div>
                
                <div className="text-center p-3 bg-white/40 border border-gray-200">
                  <i className="ri-money-dollar-circle-line text-2xl mb-1" style={{ color: '#D83731' }}></i>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    REVENUE TRACKING
                  </p>
                </div>
                
                <div className="text-center p-3 bg-white/40 border border-gray-200">
                  <i className="ri-calendar-event-line text-2xl mb-1" style={{ color: '#D83731' }}></i>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    APPOINTMENT SYSTEM
                  </p>
                </div>
                
                <div className="text-center p-3 bg-white/40 border border-gray-200">
                  <i className="ri-star-line text-2xl mb-1" style={{ color: '#D83731' }}></i>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    REVIEW MANAGEMENT
                  </p>
                </div>
              </div>
            </div>

            {/* Page Navigation */}
            <div className="space-y-3">
              <h3 className="text-red-500 font-bold text-base tracking-wider" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#D83731' }}>
                ADMIN PAGES
              </h3>
              
              {adminPages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(page.path)}
                  className="w-full bg-white/60 backdrop-blur-sm border border-black p-4 text-left hover:bg-white/70 transition-colors"
                  style={{ borderWidth: '1.4px' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-futura font-bold uppercase" style={{ fontWeight: '500', color: page.color }}>
                      {page.title}
                    </h4>
                    <i className="ri-arrow-right-line text-xl" style={{ color: '#909090' }}></i>
                  </div>
                  
                  <p className="text-sm font-futura mb-3 leading-relaxed" style={{ fontWeight: '500', color: '#909090' }}>
                    {page.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {page.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        <span className="text-xs font-futura uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white/60 backdrop-blur-sm border border-black p-4" style={{ borderWidth: '1.4px' }}>
              <h3 className="text-red-500 font-bold text-base mb-3 tracking-wider" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#D83731' }}>
                SYSTEM STATUS
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-futura font-bold text-green-500" style={{ fontWeight: '500' }}>
                    100%
                  </p>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    SYSTEM UPTIME
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-futura font-bold text-blue-500" style={{ fontWeight: '500' }}>
                    9
                  </p>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    ACTIVE MODULES
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-futura font-bold text-purple-500" style={{ fontWeight: '500' }}>
                    24/7
                  </p>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    MONITORING
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-futura font-bold text-orange-500" style={{ fontWeight: '500' }}>
                    LIVE
                  </p>
                  <p className="text-xs font-futura font-medium uppercase" style={{ fontWeight: '500', color: '#909090' }}>
                    STATUS
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}