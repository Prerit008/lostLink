import React from "react";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/footer.js";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Layout;