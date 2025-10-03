import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TicketStep from "../components/TicketStep";

export default function TicketPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  
  const preSelectedTicketId = searchParams.get('ticketId');

  const handleTicketDataChange = useCallback((data) => {
    console.log("Data tiket:", data);
    setOrderData(data);
  }, []);

  const handleProceedToPayment = () => {
    if (!orderData || !orderData.session || orderData.quantity === 0) {
      alert("Mohon lengkapi semua data tiket (sesi dan jumlah tiket)!");
      return;
    }

    localStorage.setItem('ticketOrder', JSON.stringify(orderData));
    navigate("/payment");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 pt-24 pb-12">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <span>Home</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Events</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-red-600 font-semibold">Checkout</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your ticket purchase</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Ticket Selection */}
          <div className="flex-1">
            <TicketStep 
              onNext={handleTicketDataChange} 
              preSelectedTicketId={preSelectedTicketId}
            />
          </div>

          {/* Right Side - Order Summary */}
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
                      <div className="w-6 h-6 bg-white text-red-600 rounded-full flex items-center justify-center font-bold">1</div>
                      <span className="text-white font-semibold">Checkout</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-white/30 mx-2"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <span className="text-white/60">Payment</span>
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
                  {orderData ? (
                    <>
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
                            <p className="font-semibold text-gray-900">{orderData.session || '-'}</p>
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
                    </>
                  ) : (
                    /* Empty State */
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm font-medium mb-1">No ticket selected</p>
                      <p className="text-gray-400 text-xs">Choose your ticket, session,<br/>and quantity to see the summary</p>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={handleProceedToPayment}
                    disabled={!orderData || !orderData.session || orderData.quantity === 0}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                      orderData && orderData.session && orderData.quantity > 0
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-500/30 hover:scale-105 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {orderData && orderData.session && orderData.quantity > 0 ? (
                      <>
                        <span>Proceed to Payment</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Complete Details First</span>
                      </>
                    )}
                  </button>

                  {/* Warning Message */}
                  {orderData && (!orderData.session || orderData.quantity === 0) && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-2">
                      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold text-yellow-800 mb-1">Action Required</p>
                        <p className="text-xs text-yellow-700">Please complete all required fields on the left to continue</p>
                      </div>
                    </div>
                  )}

                  {/* Security Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="font-medium">Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 text-sm mb-1">Need Help?</p>
                    <p className="text-xs text-blue-700 mb-2">Our support team is ready to assist you</p>
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      Contact Support
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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