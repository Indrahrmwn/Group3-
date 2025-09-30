import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // Di sini panggil loginRequest(email, password)
  };

  const handleCancel = () => {
    console.log("Cancel - Navigate to home");
  };

  const handleRegister = () => {
    console.log("Navigate to register");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 grid grid-cols-1 lg:grid-cols-2 w-screen h-screen overflow-hidden">
      {/* Panel kiri - Form Login */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex flex-col justify-center px-8 md:px-16 lg:px-20 relative overflow-hidden">
        {/* Decorative animated circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold mb-2">Selamat Datang</h1>
          <p className="text-red-100 mb-8 text-lg">Masuk ke akun Anda</p>

          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block font-semibold text-white text-sm mb-2">
                Email
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-white/95 backdrop-blur-sm rounded-xl px-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-lg transition-all"
                  placeholder="nama@email.com"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block font-semibold text-white text-sm mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-white/95 backdrop-blur-sm rounded-xl px-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-lg transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-white/90 hover:text-white text-sm font-medium underline-offset-2 hover:underline transition-all"
              >
                Lupa password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full h-12 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
            >
              Masuk
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-4 text-white/90 text-sm font-medium">atau</span>
              <div className="flex-1 border-t border-white/30"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full h-12 gap-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Masuk dengan Google</span>
            </button>

            {/* Register Link */}
            <div className="flex items-center justify-center gap-2 text-white font-medium text-sm pt-2">
              <span className="text-white/90">Belum punya akun?</span>
              <button
                type="button"
                onClick={handleRegister}
                className="font-bold hover:underline underline-offset-2 transition-all"
              >
                Daftar Sekarang
              </button>
            </div>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="w-full h-12 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all border border-white/30"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>

      {/* Panel kanan - Illustration */}
      <div className="hidden lg:flex items-center justify-center relative bg-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-40 blur-2xl animate-pulse" />
        <div 
          className="absolute bottom-10 left-10 w-56 h-56 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-30 blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-600 to-red-700 rounded-bl-full shadow-2xl" />

        {/* Illustration */}
        <div className="relative z-10">
          <img
            src="https://illustrations.popsy.co/amber/person-with-laptop.svg"
            className="w-96 h-auto object-contain drop-shadow-2xl animate-pulse"
            alt="Ilustrasi"
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-20 w-16 h-16 bg-red-100 rounded-xl shadow-lg animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-red-200 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>
    </div>
  );
}