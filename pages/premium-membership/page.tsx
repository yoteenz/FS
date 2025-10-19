
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PremiumMembershipPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleBackToRewards = () => {
    navigate(-1);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleConfirmSubscription = () => {
    if (selectedPlan) {
      // Handle subscription confirmation
      console.log('Confirming subscription for:', selectedPlan);
    }
  };

  const plans = [
    {
      id: 'basic',
      title: 'BASIC',
      price: 'FREE',
      welcomeDiscount: '$5 OFF',
      features: {
        birthdayGift: true,
        reducedShipping: false,
        premiumBuildAWig: false,
        loungeAccess: false,
        vipSupport: false,
        priorityBooking: false,
        freeGiveaways: false,
        loyaltyPoints: false
      }
    },
    {
      id: '3months',
      title: '3 MONTHS PREMIUM',
      price: '$90 USD',
      welcomeDiscount: '$10 OFF',
      features: {
        birthdayGift: true,
        reducedShipping: 'REDUCED DOMESTIC STANDARD',
        premiumBuildAWig: true,
        loungeAccess: true,
        vipSupport: true,
        priorityBooking: false,
        freeGiveaways: false,
        loyaltyPoints: false
      }
    },
    {
      id: '6months',
      title: '6 MONTHS PREMIUM',
      price: '$160 USD',
      welcomeDiscount: '$15 OFF',
      features: {
        birthdayGift: true,
        reducedShipping: 'REDUCED DOMESTIC STANDARD & EXPRESS',
        premiumBuildAWig: true,
        loungeAccess: true,
        vipSupport: true,
        priorityBooking: true,
        freeGiveaways: false,
        loyaltyPoints: false
      }
    },
    {
      id: '12months',
      title: '12 MONTHS PREMIUM',
      price: '$300 USD',
      welcomeDiscount: '$20 OFF',
      features: {
        birthdayGift: true,
        reducedShipping: 'FREE DOMESTIC, REDUCED INTERNATIONAL',
        premiumBuildAWig: true,
        loungeAccess: true,
        vipSupport: true,
        priorityBooking: true,
        freeGiveaways: true,
        loyaltyPoints: true
      }
    }
  ];

  const renderCheckmark = (hasFeature: boolean | string) => {
    if (hasFeature) {
      return (
        <div className="text-center">
          <span className="text-red-500 text-lg">✓</span>
        </div>
      );
    }
    return (
      <div className="text-center">
        <span className="text-red-500 text-lg">✗</span>
      </div>
    );
  };

  const renderShippingCell = (shipping: boolean | string) => {
    if (typeof shipping === 'string') {
      return (
        <div className="text-center px-1">
          <div className="text-red-500 text-lg mb-1">✓</div>
          <div 
            className="text-xs leading-tight"
            style={{ 
              fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
              fontWeight: '500',
              color: '#000000'
            }}
          >
            {shipping}
          </div>
        </div>
      );
    }
    return renderCheckmark(shipping);
  };

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
      />

      {/* Scrollable Content */}
      <div className="relative z-10 px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToRewards}
            className="mb-6 text-gray-600 text-sm"
            style={{
              fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
              fontWeight: '500'
            }}
          >
            &lt; BACK TO REWARDS
          </button>

          {/* Main Content Container */}
          <div
            className="bg-white border border-black p-6"
            style={{ borderWidth: '2px' }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-2xl mb-2"
                style={{
                  fontFamily: '"Covered By Your Grace", cursive',
                  color: '#000000'
                }}
              >
                PREMIUM MEMBERSHIP
              </h1>
              <h2
                className="text-lg font-bold"
                style={{
                  fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                  fontWeight: '500',
                  color: '#EB1C24'
                }}
              >
                UPGRADE SUBSCRIPTION
              </h2>
            </div>

            {/* Subscription Table */}
            <div className="mb-8">
              {/* Table Header */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 text-center font-bold border-r border-black"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#EB1C24',
                    fontSize: '12px'
                  }}
                >
                  BENEFITS
                </div>
                <div
                  className="p-3 text-center font-bold border-r border-black"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#000000',
                    fontSize: '12px'
                  }}
                >
                  BASIC
                </div>
                <div
                  className="p-3 text-center font-bold border-r border-black"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '12px'
                  }}
                >
                  <div>3 MONTHS</div>
                  <div>PREMIUM</div>
                </div>
                <div
                  className="p-3 text-center font-bold border-r border-black"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '12px'
                  }}
                >
                  <div>6 MONTHS</div>
                  <div>PREMIUM</div>
                </div>
                <div
                  className="p-3 text-center font-bold"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '12px'
                  }}
                >
                  <div>12 MONTHS</div>
                  <div>PREMIUM</div>
                </div>
              </div>

              {/* Welcome Discount Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>WELCOME</div>
                  <div>DISCOUNT</div>
                </div>
                <div
                  className="p-3 border-r border-black text-center font-bold"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#000000',
                    fontSize: '12px'
                  }}
                >
                  $5 OFF
                </div>
                <div
                  className="p-3 border-r border-black text-center font-bold"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#000000',
                    fontSize: '12px'
                  }}
                >
                  $10 OFF
                </div>
                <div
                  className="p-3 border-r border-black text-center font-bold"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#000000',
                    fontSize: '12px'
                  }}
                >
                  $15 OFF
                </div>
                <div
                  className="p-3 text-center font-bold"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#000000',
                    fontSize: '12px'
                  }}
                >
                  $20 OFF
                </div>
              </div>

              {/* Birthday Gift Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>BIRTHDAY</div>
                  <div>GIFT</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.birthdayGift)}
                  </div>
                ))}
              </div>

              {/* Reduced Shipping Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>REDUCED</div>
                  <div>SHIPPING</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-2 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderShippingCell(plan.features.reducedShipping)}
                  </div>
                ))}
              </div>

              {/* Premium Build-A-Wig Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>PREMIUM</div>
                  <div>BUILD-A-WIG</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.premiumBuildAWig)}
                  </div>
                ))}
              </div>

              {/* Lounge Access Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>LOUNGE</div>
                  <div>ACCESS</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.loungeAccess)}
                  </div>
                ))}
              </div>

              {/* VIP Support Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>VIP</div>
                  <div>SUPPORT</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.vipSupport)}
                  </div>
                ))}
              </div>

              {/* Priority Booking Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>PRIORITY</div>
                  <div>BOOKING</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.priorityBooking)}
                  </div>
                ))}
              </div>

              {/* Free Giveaways Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>FREE</div>
                  <div>GIVEAWAYS</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.freeGiveaways)}
                  </div>
                ))}
              </div>

              {/* 2X Loyalty Points Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#909090',
                    fontSize: '11px'
                  }}
                >
                  <div>2X LOYALTY</div>
                  <div>POINTS</div>
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    {renderCheckmark(plan.features.loyaltyPoints)}
                  </div>
                ))}
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-5 border-b border-black">
                <div
                  className="p-3 border-r border-black text-center font-bold"
                  style={{
                    fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                    fontWeight: '500',
                    color: '#EB1C24',
                    fontSize: '12px'
                  }}
                >
                  PRICE
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-3 text-center ${index < 3 ? 'border-r border-black' : ''}`}
                  >
                    <div
                      className="font-bold mb-2"
                      style={{
                        fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                        fontWeight: '500',
                        color: '#000000',
                        fontSize: '12px'
                      }}
                    >
                      {plan.price}
                    </div>
                    {plan.id !== 'basic' && (
                      <button
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`px-3 py-1 border border-black text-xs ${
                          selectedPlan === plan.id
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        style={{
                          fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                          fontWeight: '500',
                          borderWidth: '1px'
                        }}
                      >
                        SELECT
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total Section */}
            <div className="text-center mb-6">
              <div
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                  fontWeight: '500',
                  color: '#EB1C24'
                }}
              >
                TOTAL DUE TODAY
              </div>
              <div
                className="text-xl font-bold"
                style={{
                  fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                  fontWeight: '500',
                  color: '#000000'
                }}
              >
                {selectedPlan ? 
                  plans.find(p => p.id === selectedPlan)?.price || '$0 USD' 
                  : '$0 USD'
                }
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmSubscription}
              disabled={!selectedPlan}
              className={`w-full py-4 border border-black text-center font-bold ${
                selectedPlan
                  ? 'bg-white text-black hover:bg-gray-50 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              style={{
                fontFamily: '"Futura PT Medium", futura-pt, Futura, Inter, sans-serif',
                fontWeight: '500',
                fontSize: '14px',
                borderWidth: '2px'
              }}
            >
              CONFIRM SUBSCRIPTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
