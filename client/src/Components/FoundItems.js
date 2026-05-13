import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { FcAbout } from 'react-icons/fc';
import { FcOvertime } from 'react-icons/fc';
import { Link } from 'react-router-dom'
import { setConstraint } from "../constraints";
import Axios from "axios";

const Paginationn = ({ page, setPage, max }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 pt-14 pb-10">

      {/* FIRST */}
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        First
      </button>

      {/* PREV */}
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-5 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* PAGE INFO */}
      <div className="px-5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-700 font-medium">
        Page <span className="text-cyan-600 font-bold">{page}</span> of{" "}
        <span className="font-bold">{Math.max(1, Math.ceil(max))}</span>
      </div>

      {/* NEXT */}
      <button
        onClick={() => setPage(Math.min(Math.ceil(max), page + 1))}
        disabled={page >= Math.ceil(max)}
        className="px-5 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>

      {/* LAST */}
      <button
        onClick={() => setPage(Math.ceil(max))}
        disabled={page >= Math.ceil(max)}
        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Last
      </button>

    </div>
  );
};

export default function FoundItems() {
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  setConstraint(true);

  const [itemsList, setItemsList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    Axios({
      url: `${process.env.REACT_APP_API_URL}/items`,
      method: "GET",
    })
      .then((response) => {
        const allitems = response.data.items.reverse().filter(i => i.type === "Found");
        const itemsPerPage = 9;
        const numItems = allitems.length;
        setMaxPages(numItems > 0 ? numItems / itemsPerPage : 1);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = allitems.slice(startIndex, endIndex);

        let items = data.map((item) => {
          let created_date = new Date(item.createdAt);
          let createdAt = `${created_date.getDate()}/${created_date.getMonth() + 1}/${created_date.getFullYear()} ${created_date.getHours()}:${created_date.getMinutes().toString().padStart(2, '0')}`;
          let user = item.userId === user_info._id;

          return (
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }} key={item._id}>
              <div className="w-[280px] h-[420px] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden group">
                <div className="w-full h-[200px] bg-blue-100/50 flex items-center justify-center p-4">
                  <img src={item.img} alt={item.name} className="w-32 h-32 object-cover rounded-full shadow-md group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{item.name}</h3>
                  <div className="flex items-start gap-3">
                    <FcAbout size={24} className="flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <FcOvertime size={24} className="flex-shrink-0" />
                    <p className="text-gray-600 text-sm font-medium">{createdAt}</p>
                  </div>
                  <div className="mt-auto">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Link
                        to={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
                        className="inline-block bg-primary text-white text-sm font-medium py-2.5 px-6 rounded-lg hover:bg-secondary transition-colors"
                      >
                        More Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        });
        setItemsList(items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [page, user_info._id]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50 flex flex-col items-center pb-16">

      {/* HEADER */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-6">

        <div className="relative bg-white border border-slate-200 rounded-[28px] shadow-md overflow-hidden p-8">

          {/* Background decoration */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-cyan-200/40 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-40px] right-[20%] w-40 h-40 bg-blue-200/40 blur-[80px] rounded-full"></div>

          <div className="relative z-10">

            <h2 className="text-lg md:text-xl text-slate-600 font-medium">
              Welcome <span className="text-cyan-600 font-semibold">{user_info.nickname}</span> 👋
            </h2>

            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mt-2">
              Found Items Near You
            </h1>

            <p className="text-slate-500 mt-3 max-w-2xl">
              Browse items that students have recently found on campus and help return them to their owners.
            </p>

          </div>

        </div>
      </div>

      {/* ITEMS GRID */}
      <div className="w-full max-w-7xl px-6 mt-10">

        {itemsList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsList}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl">📦</div>
            <p className="text-slate-500 text-lg mt-4">
              No found items available right now.
            </p>
          </div>
        )}

      </div>

      {/* PAGINATION */}
      {itemsList.length > 0 && (
        <div className="mt-12">
          <Paginationn page={page} setPage={setPage} max={maxPages} />
        </div>
      )}

    </div>
  );
}
