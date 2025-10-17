
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    lowInventoryAlert: 5,
    autoBackup: true,
    securityMode: 'high',
    timezone: 'EST'
  });

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
        <AdminHeader title="SETTINGS" showBack onBack={() => window.history.back()} />
        
        <div className="pb-6 px-4">
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white/60 backdrop-blur-sm border border-black p-4" style={{ borderWidth: '1.4px' }}>
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}>
                SYSTEM SETTINGS
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-futura">NOTIFICATIONS</label>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                    className="w-4 h-4"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm font-futura">EMAIL ALERTS</label>
                  <input 
                    type="checkbox" 
                    checked={settings.emailAlerts}
                    onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})}
                    className="w-4 h-4"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm font-futura">LOW INVENTORY THRESHOLD</label>
                  <input 
                    type="number" 
                    value={settings.lowInventoryAlert}
                    onChange={(e) => setSettings({...settings, lowInventoryAlert: parseInt(e.target.value)})}
                    className="w-16 p-1 text-sm border border-gray-300"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm font-futura">AUTO BACKUP</label>
                  <input 
                    type="checkbox" 
                    checked={settings.autoBackup}
                    onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-black p-4" style={{ borderWidth: '1.4px' }}>
              <h3 className="text-sm font-bold mb-2 font-futura" style={{ color: '#EB1C24' }}>SECURITY</h3>
              <select 
                value={settings.securityMode}
                onChange={(e) => setSettings({...settings, securityMode: e.target.value})}
                className="w-full p-2 text-sm border border-gray-300 font-futura"
              >
                <option value="low">LOW</option>
                <option value="medium">MEDIUM</option>
                <option value="high">HIGH</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
