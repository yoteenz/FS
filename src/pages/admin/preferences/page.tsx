
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';

export default function AdminPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'english',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    defaultView: 'dashboard',
    autoSave: true
  });

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
      {/* Fixed Background Layer */}  
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('https://www.dropbox.com/scl/fi/u4m42t2levejhysa3mnby/Marble-Floor.jpg?rlkey=j87posj7qo7fed7v6vihe09kr&st=uzmjl2p3&dl=1')`,
          backgroundSize: '500% auto',
          backgroundPosition: 'right 140%',
          backgroundRepeat: 'repeat-y'
        }}
      ></div>
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        <AdminHeader title="PREFERENCES" showBack onBack={() => window.history.back()} />
        
        <div className="pb-6 px-4">
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white/60 backdrop-blur-sm border border-black p-4" style={{ borderWidth: '1.4px' }}>
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: '"Covered By Your Grace", cursive', color: '#EB1C24' }}>
                USER PREFERENCES
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-futura mb-1">THEME</label>
                  <select 
                    value={preferences.theme}
                    onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 font-futura"
                  >
                    <option value="light">LIGHT</option>
                    <option value="dark">DARK</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-futura mb-1">LANGUAGE</label>
                  <select 
                    value={preferences.language}
                    onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 font-futura"
                  >
                    <option value="english">ENGLISH</option>
                    <option value="spanish">SPANISH</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-futura mb-1">CURRENCY</label>
                  <select 
                    value={preferences.currency}
                    onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 font-futura"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-futura mb-1">DATE FORMAT</label>
                  <select 
                    value={preferences.dateFormat}
                    onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 font-futura"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm font-futura">AUTO SAVE</label>
                  <input 
                    type="checkbox" 
                    checked={preferences.autoSave}
                    onChange={(e) => setPreferences({...preferences, autoSave: e.target.checked})}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
