import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const location = useLocation();
  const ticketOrder = location.state?.ticketOrder;
  

  useEffect(() => {
  // Get order data from navigation state
  if (ticketOrder) {
    setOrderData(ticketOrder);
  } else {
    // Redirect back if no order data
    navigate('/ticket');
  }
}, [ticketOrder, navigate]);

  // Countdown timer for QR payment
  useEffect(() => {
    if (showQR && countdown > 0 && !paymentConfirmed) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showQR, countdown, paymentConfirmed]);

  const paymentMethods = [
    {
      id: 'qris',
      name: 'QRIS',
      description: 'Scan QR code with any e-wallet',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      description: 'Pay with GoPay e-wallet',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'ovo',
      name: 'OVO',
      description: 'Pay with OVO e-wallet',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">O</text>
        </svg>
      ),
      color: 'from-purple-600 to-purple-700'
    },
    {
      id: 'dana',
      name: 'DANA',
      description: 'Pay with DANA e-wallet',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setShowQR(true);
    setCountdown(600);
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    setTimeout(() => {
      navigate('/ticket-user', { state: { orderData } });
    }, 1500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 pt-24 pb-12">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <span>Home</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Checkout</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-red-600 font-semibold">Payment</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
            <p className="text-gray-600">Select your payment method</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Payment Selection or QR */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                <h2 className="text-2xl font-bold text-white">
                  {showQR ? 'Complete Payment' : 'Select Payment Method'}
                </h2>
                <p className="text-red-100 text-sm mt-1">
                  {showQR ? 'Scan QR code to complete payment' : 'Choose your preferred payment method'}
                </p>
              </div>

              <div className="p-6">
                {!showQR ? (
                  /* Payment Method Selection */
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentSelect(method)}
                        className="p-5 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* QR Code Display */
                  <div className="space-y-6">
                    {!paymentConfirmed ? (
                      <>
                        {/* Timer */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Payment expires in</p>
                                <p className={`text-2xl font-bold ${countdown < 60 ? 'text-red-600' : 'text-gray-900'}`}>
                                  {formatTime(countdown)}
                                </p>
                              </div>
                            </div>
                            {countdown < 60 && (
                              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                                Hurry!
                              </span>
                            )}
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200">
                          <div className="text-center mb-6">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${selectedPayment?.color} rounded-full text-white font-bold mb-4`}>
                              <div className="w-6 h-6">
                                {selectedPayment?.icon}
                              </div>
                              <span>{selectedPayment?.name}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Scan QR Code</h3>
                            <p className="text-sm text-gray-600">Use your {selectedPayment?.name} app to scan this QR code</p>
                          </div>

                          {/* Mock QR Code */}
                          <div className="bg-white p-6 rounded-2xl border-4 border-gray-300 mx-auto w-fit shadow-xl">
                            <div className="w-64 h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                              <div className="w-56 h-56 bg-white rounded-lg grid grid-cols-8 gap-1 p-2">
                                {[...Array(64)].map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                            <p className="text-3xl font-bold text-red-600">{formatPrice(orderData.total)}</p>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900 text-sm mb-2">How to pay:</p>
                              <ol className="space-y-1 text-xs text-blue-700">
                                <li>1. Open your {selectedPayment?.name} app</li>
                                <li>2. Scan the QR code above</li>
                                <li>3. Confirm the payment amount</li>
                                <li>4. Complete the transaction</li>
                              </ol>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setShowQR(false);
                              setSelectedPayment(null);
                            }}
                            className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                          >
                            Change Method
                          </button>
                          <button
                            onClick={handleConfirmPayment}
                            className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all hover:shadow-lg"
                          >
                            I've Paid
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Payment Success */
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Confirmed!</h3>
                        <p className="text-gray-600">Redirecting to confirmation page...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary (Same as TicketPage) */}
          <div className="lg:w-96">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Order Summary</h2>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                      <span className="text-white/60">Checkout</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-white/30 mx-2"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white text-red-600 rounded-full flex items-center justify-center font-bold">2</div>
                      <span className="text-white font-semibold">Payment</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-white/30 mx-2"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <span className="text-white/60">Done</span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {/* Ticket Name */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-red-600 font-semibold uppercase mb-1">Ticket Name</p>
                          <p className="font-bold text-gray-900 text-lg">{orderData.ticketName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Session */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Session</p>
                        <p className="font-semibold text-gray-900">{orderData.session}</p>
                        {orderData.sessionDate && (
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(orderData.sessionDate).toLocaleDateString('id-ID', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                            {orderData.sessionTime && ` • ${orderData.sessionTime}`}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Quantity</p>
                        <p className="font-semibold text-gray-900">{orderData.quantity} ticket{orderData.quantity > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    {/* Price per Ticket */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Price per Ticket</p>
                        <p className="font-semibold text-gray-900">{formatPrice(orderData.price)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Section */}
                  <div className="border-t border-b border-gray-200 py-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                        <p className="text-xs text-gray-500">Include all taxes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{formatPrice(orderData.total)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="font-medium">Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}