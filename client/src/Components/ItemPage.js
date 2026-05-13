import React, { useState, useEffect } from "react";
import { setConstraint } from "../constraints";
import { toast } from 'react-toastify';
import axios from "axios";
import { Carousel } from 'react-carousel-minimal'

function ItemPage() {
  const [item, setItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [slides, setSlides] = useState([]);

  setConstraint(true);
  const queryParams = new URLSearchParams(window.location.search);
  const item_id = queryParams.get('cid');
  const current_user = queryParams.get('type')?.split("/")[1];

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/items/${item_id}`,
      method: "GET",
    })
      .then((response) => {
        const data = response.data.item;
        let imageSlides = data.img.map((imgUrl) => ({ image: imgUrl }));
        setSlides(imageSlides);
        setItem(data);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [item_id]);

  const delete_item = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/items/delete/${item_id}`,
      method: "DELETE",
    })
      .then(() => {
        setShowDelete(false);
        toast.success('Item kicked to 🗑️ successfully!', {
          position: "bottom-right",
          autoClose: 1000,
        });
        window.location.href = "/mylistings";
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50 flex flex-col items-center pb-16">

      {/* HEADER */}
      <div className="w-full max-w-7xl px-6 mt-6">

        <div className="relative bg-white border border-slate-200 rounded-[28px] shadow-md overflow-hidden p-8 text-center">

          {/* decorations */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-200/40 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-40px] right-[20%] w-40 h-40 bg-blue-200/40 blur-[90px] rounded-full"></div>

          <div className="relative z-10">

            <h2 className="text-lg font-medium text-slate-500">
              {item?.type} Item
            </h2>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
              {item?.type === "Lost" ? "Someone Lost" : "Someone Found"}{" "}
              <span className="text-cyan-600">{item?.name}</span>
            </h1>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {item && (
        <div className="w-full max-w-7xl px-6 mt-10 flex flex-col gap-10">

          <div className="grid lg:grid-cols-5 gap-10">

            {/* IMAGE / CAROUSEL */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-[28px] shadow-md p-4">

              {slides.length > 0 && (
                <div className="rounded-2xl overflow-hidden">
                  <Carousel
                    data={slides}
                    time={4000}
                    width="100%"
                    height="420px"
                    radius="16px"
                    slideNumber={false}
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    slideBackgroundColor="transparent"
                    slideImageFit="contain"
                    thumbnails={false}
                  />
                </div>
              )}

            </div>

            {/* USER CARD */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[28px] shadow-md p-6 flex flex-col gap-6">

              {/* USER INFO */}
              <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-2xl border border-cyan-100">

                <img
                  src={item.userId?.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="user"
                  className="w-16 h-16 rounded-full object-cover border border-white shadow"
                />

                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-semibold uppercase">
                    Posted By
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 truncate">
                    {item.userId?.fullname}
                  </h3>
                </div>

              </div>

              {/* ACTION BUTTON */}
              {current_user === "true" ? (
                <button
                  onClick={() => setShowDelete(true)}
                  className="w-full bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold py-4 rounded-2xl transition-all shadow-sm"
                >
                  Delete Post
                </button>
              ) : (
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                >
                  Contact Owner
                </button>
              )}

            </div>
          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white border border-slate-200 rounded-[28px] shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Description
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="space-y-6">

              {/* DATE */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  📅
                </div>

                <div>
                  <p className="text-sm text-slate-500 font-semibold uppercase">
                    Date {item.type}
                  </p>

                  <p className="text-lg font-bold text-slate-900">
                    {item.date}
                  </p>
                </div>

              </div>

              {/* LOCATION */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  📍
                </div>

                <div>
                  <p className="text-sm text-slate-500 font-semibold uppercase">
                    Location
                  </p>

                  <p className="text-lg font-bold text-slate-900">
                    {item.location}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl">

            <h3 className="text-2xl font-black text-slate-900 text-center">
              Delete Post?
            </h3>

            <p className="text-slate-500 text-center mt-3">
              This action cannot be undone.
            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => setShowDelete(false)}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={delete_item}
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl text-center">

            <div className="text-4xl mb-4">📞</div>

            <h3 className="text-2xl font-black text-slate-900">
              Contact Owner
            </h3>

            <p className="text-slate-500 mt-2">
              {item?.userId?.fullname}
            </p>

            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl py-4 font-bold text-xl text-cyan-600">
              {item?.number}
            </div>

            <button
              onClick={() => setShowContact(false)}
              className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default ItemPage;
