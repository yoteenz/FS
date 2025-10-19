import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import StatsCard from '../components/StatsCard';

export default function AdminOverview() {
  const navigate = useNavigate();
  
  const systemStats = [
    {
      title: 'SYSTEM STATUS',
      count: '100%',
      items: [
        { label: 'ORDER MANAGEMENT', value: 'Active', color: 'text-gray-500' },
        { label: 'CLIENT DATABASE', value: 'Active', color: 'text-red-500' },
        { label: 'REVENUE ANALYTICS', value: 'Active', color: 'text-red-500' },
        { label: 'MEETING SCHEDULER', value: 'Active', color: 'text-gray-500' }
      ],
      highlight: 'ALL SYSTEMS OPERATIONAL - EXCELLENT PERFORMANCE',
      tiers: [
        { label: 'API', value: '100%', color: 'text-red-500' },
        { label: 'DB', value: '100%', color: 'text-red-500' },
        { label: 'CACHE', value: '100%', color: 'text-gray-500' }
      ]
    },
    {
      title: 'FEATURES',
      count: '12',
      items: [
        { label: 'ORDER TRACKING', value: 'Active', color: 'text-gray-500' },
        { label: 'CLIENT MANAGEMENT', value: 'Active', color: 'text-red-500' },
        { label: 'FINANCIAL REPORTS', value: 'Active', color: 'text-red-500' },
        { label: 'APPOINTMENT BOOKING', value: 'Active', color: 'text-gray-500' }
      ],
      activity: 'ALL FEATURES FUNCTIONAL - NO ISSUES DETECTED'
    },
    {
      title: 'SECURITY',
      count: 'A+',
      items: [
        { label: 'SSL CERTIFICATE', value: 'Valid', color: 'text-gray-500' },
        { label: 'DATA ENCRYPTION', value: 'AES-256', color: 'text-red-500' },
        { label: 'BACKUP STATUS', value: 'Current', color: 'text-red-500' },
        { label: 'ACCESS LOGS', value: 'Monitored', color: 'text-gray-500' }
      ],
      highlight: 'SECURITY STATUS EXCELLENT - ALL PROTECTIONS ACTIVE'
    },
    {
      title: 'PERFORMANCE',
      count: '98%',
      items: [
        { label: 'UPTIME', value: '99.9%', color: 'text-gray-500' },
        { label: 'RESPONSE TIME', value: '0.2s', color: 'text-red-500' },
        { label: 'LOAD TIME', value: '1.1s', color: 'text-red-500' },
        { label: 'ERROR RATE', value: '0.01%', color: 'text-gray-500' }
      ],
      activity: 'PERFORMANCE OPTIMAL - SYSTEM RUNNING SMOOTHLY'
    },
    {
      title: 'INTEGRATIONS',
      count: '8',
      items: [
        { label: 'PAYMENT GATEWAY', value: 'Connected', color: 'text-gray-500' },
        { label: 'EMAIL SERVICE', value: 'Active', color: 'text-red-500' },
        { label: 'SMS NOTIFICATIONS', value: 'Active', color: 'text-red-500' },
        { label: 'ANALYTICS TRACKING', value: 'Active', color: 'text-gray-500' }
      ],
      highlight: 'ALL INTEGRATIONS WORKING - SEAMLESS CONNECTIVITY'
    },
    {
      title: 'MAINTENANCE',
      count: 'Current',
      items: [
        { label: 'LAST BACKUP', value: '2 hours ago', color: 'text-gray-500' },
        { label: 'SYSTEM UPDATE', value: 'Current', color: 'text-gray-500' },
        { label: 'SECURITY PATCH', value: 'Latest', color: 'text-gray-500' },
        { label: 'NEXT MAINTENANCE', value: 'Sunday 2AM', color: 'text-gray-500' }
      ],
      activity: 'MAINTENANCE UP TO DATE - NO ACTION REQUIRED'
    }
  ];

  // Handle card click navigation
  const handleCardClick = (cardTitle: string) => {
    switch (cardTitle) {
      case 'SYSTEM STATUS':
        navigate('/admin/settings');
        break;
      case 'FEATURES':
        navigate('/admin/preferences');
        break;
      case 'SECURITY':
        navigate('/admin/settings');
        break;
      case 'PERFORMANCE':
        navigate('/admin/visual-overview');
        break;
      case 'INTEGRATIONS':
        navigate('/admin/settings');
        break;
      case 'MAINTENANCE':
        navigate('/admin/settings');
        break;
      default:
        break;
    }
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
        <AdminHeader title="SYSTEM OVERVIEW" showBack onBack={() => window.history.back()} />
        
        <div className="pb-6 px-4">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {systemStats.map((stat, index) => (
                <StatsCard key={index} data={stat} onCardClick={handleCardClick} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}