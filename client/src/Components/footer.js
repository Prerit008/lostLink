import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div className="flex flex-col gap-4">

          <h2 className="text-2xl font-black text-slate-900">
            Lostly
          </h2>

          <p className="text-slate-500 leading-relaxed">
            A simple campus platform to report, find, and recover lost items quickly and safely.
          </p>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Lostly. All rights reserved.
          </p>

        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col gap-3">

          <h3 className="text-lg font-bold text-slate-800">
            Quick Links
          </h3>

          <Link to="/" className="text-slate-500 hover:text-cyan-600 transition-colors">
            Home
          </Link>

          <Link to="/LostItems" className="text-slate-500 hover:text-cyan-600 transition-colors">
            Lost Items
          </Link>

          <Link to="/FoundItems" className="text-slate-500 hover:text-cyan-600 transition-colors">
            Found Items
          </Link>

          <Link to="/postitem" className="text-slate-500 hover:text-cyan-600 transition-colors">
            Post Item
          </Link>

        </div>

        {/* CONTACT / INFO */}
        <div className="flex flex-col gap-3">

          <h3 className="text-lg font-bold text-slate-800">
            Contact
          </h3>

          <p className="text-slate-500">
            Email: support@lostly.com
          </p>

          <p className="text-slate-500">
            Campus Support: 24/7
          </p>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-200 py-4 text-center text-slate-400 text-sm">
        Made with ❤️ for students
      </div>

    </footer>
  );
}