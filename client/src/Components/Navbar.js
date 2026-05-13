import React, { useState, useEffect, useRef } from 'react';
import { setConstraint } from "../constraints";
import { BsFillCaretDownFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const token = window.localStorage.getItem("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signout = () => {
    setConstraint(false);
    console.log("Signed out !");
    localStorage.clear();
    window.location.href = "/log-in";
  };

  const NavLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to={to} className="text-gray-800 font-semibold hover:text-primary transition-colors text-lg">
        {children}
      </Link>
    </motion.div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-2xl shadow-sm">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-200 transition-all duration-300 group-hover:scale-105">
              <span className="text-white text-2xl font-black">
                L
              </span>
            </div>

            <div className="flex flex-col leading-none">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Lostly
              </h1>
              <span className="text-xs text-slate-500 font-medium">
                Campus Lost & Found
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-slate-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              Home
            </Link>

            {/* DROPDOWN */}
            <div className="relative" ref={dropdownRef}>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
              >
                <span>Browse</span>

                <BsFillCaretDownFill
                  size={12}
                  className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </motion.button>

              {/* MENU */}
              {dropdownOpen && (
                <div className="absolute top-14 left-0 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden">

                  <Link
                    to={token ? "/LostItems" : "/log-in"}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-4 hover:bg-cyan-50 transition-all duration-300 group"
                  >
                    <span className="text-xl">🔍</span>

                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-cyan-700">
                        Lost Items
                      </p>

                      <p className="text-sm text-slate-500">
                        Search missing belongings
                      </p>
                    </div>
                  </Link>

                  <div className="border-t border-slate-100"></div>

                  <Link
                    to={token ? "/FoundItems" : "/log-in"}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-4 hover:bg-cyan-50 transition-all duration-300 group"
                  >
                    <span className="text-xl">📦</span>

                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-cyan-700">
                        Found Items
                      </p>

                      <p className="text-sm text-slate-500">
                        View recovered belongings
                      </p>
                    </div>
                  </Link>

                </div>
              )}
            </div>

            {token && (
              <>
                <Link
                  to="/postitem"
                  className="text-slate-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
                >
                  Post Item
                </Link>

                <Link
                  to="/mylistings"
                  className="text-slate-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
                >
                  My Listings
                </Link>
              </>
            )}
          </div>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex items-center gap-4">

            {token ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={signout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300"
              >
                Logout
              </motion.button>
            ) : (
              <>
                <Link
                  to="/log-in"
                  className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-all duration-300"
                >
                  Login
                </Link>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/sign-up"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl shadow-cyan-200 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
