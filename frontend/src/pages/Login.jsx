import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#07090e] overflow-hidden px-4 py-8">
      
      {/* Efek Cahaya Gradien Abstrak di Latar Belakang (Cinematic Glow) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Kontainer Utama Split-Screen (Glassmorphism Premium) */}
      <div className="relative z-10 w-full max-w-5xl bg-[#121622]/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Sisi Kiri: Branding Sinematik (5 Kolom) */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-transparent border-r border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 text-white font-bold text-xl">
              🎬
            </div>
            <span className="text-white font-bold tracking-wider text-sm uppercase">CineAdmin</span>
          </div>

          <div className="my-auto py-8">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Kelola Film <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Tanpa Batas.
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Platform manajemen data film profesional dengan kendali penuh atas katalog, genre, dan sistem keamanan admin.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Movie Management System.
          </div>
        </div>

        {/* Sisi Kanan: Form Login Interaktif (7 Kolom) */}
        <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center bg-[#0e121d]/50">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Selamat Datang Kembali</h2>
            <p className="text-sm text-slate-400 mt-1.5">
              Masukkan kredensial akun administrator Anda untuk melanjutkan
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center space-x-3 animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Alamat Email
              </label>
              <input
                type="email"
                placeholder="admin@movie.com"
                className="w-full px-4 py-3.5 rounded-xl bg-[#171d2e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Input Password dengan Posisi Tombol Mata yang Presisi di Tengah */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[#171d2e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-white focus:outline-none transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Aksi Login */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Masuk ke Sistem</span>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}