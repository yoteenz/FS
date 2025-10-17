
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingTest() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    setTimeout(() => {
      setContentLoaded(true);
    }, 3000);

    // Force stop loading after 5 seconds maximum
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      setIsLoading(false);
    }
  }, [contentLoaded]);

  const simulateLoading = () => {
    setIsLoading(true);
    setContentLoaded(false);
    
    // Simulate content loading
    setTimeout(() => {
      setContentLoaded(true);
    }, 3000);

    // Force stop loading after 5 seconds maximum
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div 
          className="loading-container"
          style={{ width: '324px', height: '324px' }}
        >
          <img 
            src="https://www.dropbox.com/scl/fi/t6l4n4lwholsae1ub32jo/Ayoteenz-Ful-HD.gif?rlkey=rm46sa217e3orcyul9yerkq5l&st=mtbs0qjv&dl=1"
            alt="Loading..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800">Loading Animation</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* PREVIEW SECTION */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Loading Animation Preview</h2>
          
          {/* Animation Preview */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center" style={{ minHeight: '300px', minWidth: '300px' }}>
              {isLoading ? (
                <div 
                  className="loading-container"
                  style={{ width: '240px', height: '240px' }}
                >
                  <img
                    src="https://www.dropbox.com/scl/fi/t6l4n4lwholsae1ub32jo/Ayoteenz-Ful-HD.gif?rlkey=rm46sa217e3orcyul9yerkq5l&st=mtbs0qjv&dl=1"
                    alt="Loading..."
                  />
                </div>
              ) : (
                <div className="text-gray-500 text-center">
                  <p className="text-lg font-medium">Loading Complete</p>
                  <p className="text-sm">Click "Test Loading Screen" to see the animation</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Animation Display */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Custom Loading Animation
            </h3>
            <p className="text-sm text-gray-600">Ayoteenz HD Animation</p>
          </div>
          
          <div className="flex justify-center items-center h-48 bg-white rounded-lg border-2 border-gray-100">
            <div 
              className="loading-container"
              style={{ width: '259px', height: '259px' }}
            >
              <img 
                src="https://www.dropbox.com/scl/fi/t6l4n4lwholsae1ub32jo/Ayoteenz-Ful-HD.gif?rlkey=rm46sa217e3orcyul9yerkq5l&st=mtbs0qjv&dl=1"
                alt="Loading Animation"
              />
            </div>
          </div>
        </div>

        {/* Simulation Test */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Loading Simulation</h3>
          <button
            onClick={simulateLoading}
            className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all"
          >
            Test Loading Screen
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Animation plays for 5 seconds or until content loads
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Features</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Custom Ayoteenz HD animated GIF</p>
            <p>• Centered on white background</p>
            <p>• Auto-stops after 5 seconds maximum</p>
            <p>• Responsive and mobile optimized</p>
            <p>• Smooth loading transitions</p>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Implementation</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Pure white background for clean appearance</p>
            <p>• Animation stops when content loads OR after 5 seconds</p>
            <p>• Properly sized and centered animation</p>
            <p>• Fallback loading behavior included</p>
          </div>
        </div>
      </div>
    </div>
  );
}
