import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from 'framer-motion'

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('user'));

  const handleButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = "/postitem";
    } else {
      window.location.href = "/log-in";
    }
  };
  const handleButtonClickLost = () => {
    if (isLoggedIn) {
      window.location.href = "/lostItems";
    } else {
      window.location.href = "/log-in";
    }
  };
  const handleButtonClickFound = () => {
    if (isLoggedIn) {
      window.location.href = "/founditems";
    } else {
      window.location.href = "/log-in";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-cyan-50 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 py-20">

        {/* Background Blobs */}
        <div className="absolute top-10 left-0 w-72 h-72 bg-cyan-200 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full blur-[120px] opacity-50"></div>

        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-8">

            <div className="flex items-center gap-3 bg-white shadow-md border border-slate-100 px-5 py-2 rounded-full w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-sm text-slate-600 font-medium">
                Smart Campus Lost & Found Platform
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900">
              Lost Something
              <span className="block text-cyan-600">
                On Campus?
              </span>
            </h1>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl">
              Quickly report lost items, discover found belongings,
              and reconnect students with their valuables through a
              simple and modern campus platform.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleButtonClick}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300"
              >
                Explore Items
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleButtonClickLost}
                className="bg-white border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 text-slate-700 px-8 py-4 rounded-2xl text-lg font-semibold shadow-md transition-all duration-300"
              >
                Report Lost Item
              </motion.button>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-5 pt-10">

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100">
                <h2 className="text-3xl font-black text-cyan-600">2K+</h2>
                <p className="text-slate-500 mt-2 text-sm">
                  Items Recovered
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100">
                <h2 className="text-3xl font-black text-blue-600">500+</h2>
                <p className="text-slate-500 mt-2 text-sm">
                  Students Joined
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100">
                <h2 className="text-3xl font-black text-emerald-600">24/7</h2>
                <p className="text-slate-500 mt-2 text-sm">
                  Community Support
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">

            {/* MAIN CARD */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[40px] p-6 shadow-2xl max-w-lg w-full">

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Campus"
                className="rounded-[30px] h-[550px] w-full object-cover"
              />

              {/* FLOATING CARD 1 */}
              <div className="absolute top-10 -left-8 bg-white shadow-xl rounded-2xl px-5 py-4 border border-slate-100">
                <p className="text-sm text-slate-500">
                  Recently Found
                </p>
                <h3 className="font-bold text-slate-800">
                  Student Wallet
                </h3>
              </div>

              {/* FLOATING CARD 2 */}
              <div className="absolute bottom-10 -right-8 bg-cyan-600 text-white shadow-xl rounded-2xl px-5 py-4">
                <p className="font-semibold">
                  95% Recovery Rate
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-28 px-6 lg:px-16">

        <div className="max-w-7xl mx-auto">

          {/* HEADING */}
          <div className="text-center mb-20">

            <h2 className="text-4xl md:text-6xl font-black text-slate-900">
              How It Works
            </h2>

            <p className="text-slate-500 text-lg mt-5 max-w-2xl mx-auto">
              A fast and secure process designed to help students
              recover lost belongings without stress.
            </p>

          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-3xl mb-6">
                🔍
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Search Items
              </h3>

              <p className="text-slate-500 leading-relaxed">
                Browse recently reported lost and found items
                shared by students across campus.
              </p>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mb-6">
                📦
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Post Quickly
              </h3>

              <p className="text-slate-500 leading-relaxed">
                Upload photos and details of lost or found
                belongings in just a few seconds.
              </p>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl mb-6">
                🤝
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Reconnect Safely
              </h3>

              <p className="text-slate-500 leading-relaxed">
                Contact owners or finders securely and help
                valuable belongings return home.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
