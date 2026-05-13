import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Axios from "axios";

const Paginationn = ({ page, setPage, max }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 pt-14 pb-10">

      {/* FIRST */}
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
        className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Last
      </button>

    </div>
  );
};

export default function Feed() {
  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user : null;
  };
  const user_info = getUserId();
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
        const allitems = response.data.items.reverse().filter(i => i.userId === getUserId()?._id);
        const itemsPerPage = 9;
        const numItems = allitems.length;
        setMaxPages(numItems > 0 ? numItems / itemsPerPage : 1);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = allitems.slice(startIndex, endIndex);

        let items = data.map((item) => {
          let created_date = new Date(item.createdAt);
          let createdAt = `${created_date.getDate()}/${created_date.getMonth() + 1}/${created_date.getFullYear()} ${created_date.getHours()}:${created_date.getMinutes().toString().padStart(2, '0')}`;

          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              key={item._id}
            >
              <div className="w-[290px] h-[430px] bg-white border border-slate-200 rounded-[24px] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">

                {/* IMAGE SECTION */}
                <div className="h-[200px] bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-6">

                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col gap-3 flex-1">

                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {item.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <div className="flex items-start gap-3">

                    <span className="text-cyan-600 mt-1">📝</span>

                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-3">

                    <span className="text-amber-500">⏰</span>

                    <p className="text-slate-500 text-sm font-medium">
                      {createdAt}
                    </p>

                  </div>

                  {/* FOOTER */}
                  <div className="mt-auto flex items-center justify-between pt-3">

                    <Link
                      to={`/${item.name}?cid=${item._id}&type=${item.type}/true`}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      View Details
                    </Link>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${item.type === "Lost"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}
                    >
                      {item.type}
                    </span>

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
  }, [page, user_info?._id]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50 flex flex-col items-center pb-16">

      {/* HEADER */}
      <div className="w-full max-w-7xl px-6 mt-6">

        <div className="relative bg-white border border-slate-200 rounded-[28px] shadow-md overflow-hidden p-8">

          {/* decorative blur */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-200/40 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-40px] right-[20%] w-40 h-40 bg-blue-200/40 blur-[90px] rounded-full"></div>

          <div className="relative z-10">

            <h2 className="text-lg text-slate-500 font-medium">
              Hello <span className="text-cyan-600 font-semibold">{user_info?.nickname}</span> 👋
            </h2>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
              Your Posted Items
            </h1>

            <p className="text-slate-500 mt-3">
              Manage all lost and found items you’ve posted on the platform.
            </p>

          </div>

        </div>
      </div>

      {/* ITEMS */}
      <div className="w-full max-w-7xl px-6 mt-10">

        {itemsList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsList}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">

            <div className="text-6xl">📌</div>

            <p className="text-slate-500 text-lg mt-4">
              You haven't posted any items yet.
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
