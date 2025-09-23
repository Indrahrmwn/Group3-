import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [photoTimestamp, setPhotoTimestamp] = useState(Date.now());
  const [imageError, setImageError] = useState(false);
  // Toast notification state
  const [toast, setToast] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    }

    setIsLoggedIn(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Profile response:", res.data);
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil profil", err);
        console.error("Error details:", err.response);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (profilePhotoPreview) {
        URL.revokeObjectURL(profilePhotoPreview);
      }
    };
  }, [profilePhotoPreview]);

  // Auto hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const refreshProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(response.data);
      }
      setPhotoTimestamp(Date.now());
      setImageError(false);
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  const handleEditPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          showToast("Ukuran file terlalu besar. Maksimal 2MB.", 'error');
          return;
        }

        if (!file.type.startsWith('image/')) {
          showToast("File harus berupa gambar.", 'error');
          return;
        }

        await uploadProfilePhoto(file);
      }
    };
    input.click();
  };

  const uploadProfilePhoto = async (file) => {
    setUploading(true);
    
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("photo", file);

      const previewUrl = URL.createObjectURL(file);
      setProfilePhotoPreview(previewUrl);

      console.log("=== UPLOAD DEBUG ===");
      console.log("File info:", {
        name: file.name,
        size: file.size,
        type: file.type
      });
      console.log("API URL:", `${import.meta.env.VITE_API_URL}/api/profile/photo`);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("=== RESPONSE DEBUG ===");
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("User from response:", response.data.user);
      console.log("Profile photo path:", response.data.user?.profile_photo);
      console.log("Debug info:", response.data.debug);

      if (response.data.status === "success") {
        URL.revokeObjectURL(previewUrl);
        setProfilePhotoPreview(null);
        
        setUser(response.data.user);
        setPhotoTimestamp(Date.now());
        setImageError(false);
        
        console.log("=== FINAL IMAGE URL ===");
        const imageUrl = response.data.user.profile_photo?.startsWith('http') 
          ? response.data.user.profile_photo 
          : `${import.meta.env.VITE_API_URL}/${response.data.user.profile_photo}`;
        console.log("Final image URL:", imageUrl);
        
        showToast("Foto profil berhasil diperbarui!", 'success');
        
        setTimeout(() => {
          refreshProfile();
        }, 500);
      } else {
        URL.revokeObjectURL(previewUrl);
        setProfilePhotoPreview(null);
        showToast("Gagal mengupload foto profil.", 'error');
      }
    } catch (error) {
      console.error("=== ERROR DEBUG ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      
      if (profilePhotoPreview) {
        URL.revokeObjectURL(profilePhotoPreview);
        setProfilePhotoPreview(null);
      }
      
      showToast("Gagal mengupload foto profil. Silakan coba lagi.", 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleImageError = () => {
    console.error("Image failed to load, showing default avatar");
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully");
    setImageError(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 mt-25">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 border border-gray-100">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.081 16.5c-.77.833.192 2.5 1.731 2.5z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Akses Ditolak</h2>
            <p className="text-gray-600">Anda belum login ke sistem</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              Silakan login terlebih dahulu untuk mengakses halaman profil
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>Mengalihkan ke halaman login...</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 mt-16">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 border border-gray-100">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Memuat Profil...
          </h2>
          <p className="text-gray-500">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 mt-25 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-500 ease-in-out ${
          toast ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
        }`}>
          <div className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 ${
            toast.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              toast.type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {toast.type === 'success' ? (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className={`flex-shrink-0 p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                toast.type === 'success' ? 'hover:bg-green-600' : 'hover:bg-red-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              {profilePhotoPreview ? (
                <img
                  src={profilePhotoPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (user.profile_photo && !imageError) ? (
                <img
                  src={user.profile_photo.startsWith('http') 
                    ? `${user.profile_photo}?t=${photoTimestamp}` 
                    : `${import.meta.env.VITE_API_URL}/${user.profile_photo}?t=${photoTimestamp}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              ) : (
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
              
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            <button
              onClick={handleEditPhoto}
              disabled={uploading}
              className={`absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-md border border-gray-200 transition duration-200 ${
                uploading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
              title={uploading ? "Sedang mengupload..." : "Edit foto profil"}
            >
              {uploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              )}
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Profil Saya</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Nama Lengkap
            </label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-gray-800 text-lg">{user.name}</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Alamat Email
            </label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Status Verifikasi
            </label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              {user.email_verified_at ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Terverifikasi</p>
                    <p className="text-sm text-gray-600">
                      {new Date(user.email_verified_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <p className="font-semibold text-gray-800">
                    Belum Diverifikasi
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md">
            Edit Profil
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}