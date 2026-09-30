import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-8 animate-fade-in py-4">
      {/* Hero Banner Sinematik */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-8 md:p-12 shadow-2xl border border-white/10 text-white">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-purple-300">
            🎬 Admin Dashboard
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Selamat Datang di <br />
            <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Movie Management
            </span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Kelola katalog film, atur pengelompokan genre, dan pantau seluruh basis data hiburan Anda dengan cepat, aman, dan terintegrasi penuh.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link 
              to="/films" 
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Kelola Film</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              to="/genres" 
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all duration-200"
            >
              Kelola Genre
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Kartu Pintasan Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Film */}
        <div className="group relative bg-base-100 dark:bg-[#121622] rounded-2xl p-6 shadow-xl border border-base-300 dark:border-white/5 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-2xl font-bold">
              🎞️
            </div>
            <span className="badge badge-primary badge-outline text-xs">Modul Utama</span>
          </div>
          <h2 className="text-xl font-bold text-base-content group-hover:text-purple-500 transition-colors">
            Manajemen Data Film
          </h2>
          <p className="text-sm text-base-content/60 mt-2 mb-6">
            Tambah, sunting informasi detail, sutradara, tahun rilis, durasi, hingga menghapus film dari daftar katalog.
          </p>
          <Link to="/films" className="inline-flex items-center text-sm font-semibold text-purple-500 hover:text-purple-600">
            <span>Buka Daftar Film</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Card Genre */}
        <div className="group relative bg-base-100 dark:bg-[#121622] rounded-2xl p-6 shadow-xl border border-base-300 dark:border-white/5 hover:border-indigo-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-2xl font-bold">
              🏷️
            </div>
            <span className="badge badge-secondary badge-outline text-xs">Modul Kategori</span>
          </div>
          <h2 className="text-xl font-bold text-base-content group-hover:text-indigo-500 transition-colors">
            Manajemen Genre
          </h2>
          <p className="text-sm text-base-content/60 mt-2 mb-6">
            Atur pengelompokan kategori film secara terstruktur agar pencarian dan navigasi konten menjadi lebih tertib.
          </p>
          <Link to="/genres" className="inline-flex items-center text-sm font-semibold text-indigo-500 hover:text-indigo-600">
            <span>Buka Daftar Genre</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}