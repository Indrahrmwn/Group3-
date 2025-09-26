import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing, success, error

  useEffect(() => {
    const processAuth = async () => {
      // Delay biar animasi loading keliatan
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const token = searchParams.get("token");
      const userEncoded = searchParams.get("user");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        await Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Terjadi kesalahan saat login dengan Google",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Coba Lagi",
        });
        navigate("/login");
        return;
      }

      if (token && userEncoded) {
        try {
          const user = JSON.parse(atob(userEncoded));

          // ✅ Simpan token dan user data ke localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          setStatus("success");

          // SweetAlert2 untuk success
          await Swal.fire({
            icon: "success",
            title: "Login Berhasil!",
            html: `Selamat datang, <strong>${user.name}</strong>`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          navigate("/");
        } catch (e) {
          console.error("Error parsing user data:", e);
          setStatus("error");
          await Swal.fire({
            icon: "error",
            title: "Kesalahan Data",
            text: "Terjadi kesalahan saat memproses data pengguna",
            confirmButtonColor: "#3085d6",
          });
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    processAuth();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 border border-gray-100">
        {status === "processing" && (
          <>
            {/* Loading Animation */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Outer spinning circle */}
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                {/* Inner pulsing circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse opacity-75"></div>
                </div>
              </div>
            </div>

            {/* Loading Text with Animation */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Memproses Login Google
              </h2>

              {/* Animated dots */}
              <div className="flex justify-center items-center space-x-1">
                <span className="text-gray-600">Mohon tunggu</span>
                <div className="flex space-x-1">
                  <div
                    className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>

              {/* Progress bar animation */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse"
                  style={{
                    animation: "progressBar 2s ease-in-out infinite",
                    width: "60%",
                  }}
                ></div>
              </div>
            </div>

            {/* Google logo */}
            <div className="flex justify-center items-center space-x-2 text-gray-500">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm">Mengautentikasi dengan Google</span>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-green-800">
                Login Berhasil!
              </h2>
              <p className="text-green-600">Mengalihkan ke dashboard...</p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-red-800">
                Login Gagal
              </h2>
              <p className="text-red-600">Terjadi kesalahan, coba lagi...</p>
            </div>
          </>
        )}
      </div>

      {/* pakai style biasa, bukan style jsx */}
      <style>{`
        @keyframes progressBar {
          0% { width: 10%; }
          50% { width: 60%; }
          100% { width: 10%; }
        }
      `}</style>
    </div>
  );
}
