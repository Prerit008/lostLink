import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import * as Yup from 'yup';

const LostItem = () => {
  const [progress, setProgress] = useState(0)
  const [loading, setloading] = useState(false);
  const usertoken = window.localStorage.getItem("token");
  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user._id : null;
  };

  const config = { headers: { token: usertoken } };

  const [image, setImage] = useState(null);

  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  const handleImageUpload = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map((err) => err.message);
      toast.error(errorMessages.join('\n'), {
        position: "bottom-right",
        autoClose: 1000,
      })
      return;
    }

    if (!image || image.length === 0) {
      toast.error('Please upload atleast one image', {
        position: "bottom-right",
        autoClose: 1000,
      })
      return;
    }

    setloading(true);
    const promises = [];

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      const storageRef = ref(storage, `/images/${img.name}`);
      const fileRef = ref(storageRef, img.name);
      const uploadTask = uploadBytesResumable(fileRef, img);
      const promise = new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const uploaded = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((imgUrl) => {
                resolve(imgUrl);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        );
      });

      promises.push(promise);
    }

    Promise.all(promises)
      .then((urls) => {
        const newItem = { ...values, img: urls };
        axios.post(`${process.env.REACT_APP_API_URL}/Items/newItem`, newItem, config)
          .then(() => {
            toast.success('Wohoo 🤩! Item listed successfully.', {
              position: "bottom-right",
              autoClose: 1000,
            })
            setloading(false);
            window.location.href = "/mylistings"
          })
          .catch((error) => {
            console.log("An error occurred:", error);
            toast.error('Oops 🙁! Something went wrong.', {
              position: "bottom-right",
              autoClose: 1000,
            })
            setloading(false);
          });
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        toast.error('Oops 🙁! Something went wrong.', {
          position: "bottom-right",
          autoClose: 1000,
        })
        setloading(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50 flex flex-col items-center py-12 px-6">

      {/* HEADER */}
      <div className="w-full max-w-7xl text-center mb-10">

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
          Post a Lost or Found Item
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Help your campus community by reporting lost or found belongings
        </p>

      </div>

      {/* MAIN LAYOUT */}
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-start">

        {/* FORM CARD */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-md p-8 md:p-10">

          <Formik
            initialValues={{
              name: "",
              userId: getUserId(),
              description: "",
              type: "",
              location: "",
              date: "",
              number: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, handleChange }) => (
              <Form className="flex flex-col gap-6">

                {/* IMAGE UPLOAD */}
                <div className="flex flex-col gap-3">

                  <h2 className="text-xl font-bold text-slate-900">
                    Upload Images
                  </h2>

                  <label className="w-full h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-cyan-200 bg-cyan-50 rounded-2xl cursor-pointer hover:bg-cyan-100 transition-all">

                    <span className="text-cyan-600 font-semibold">
                      Click to upload images
                    </span>

                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageUpload}
                    />

                  </label>

                  {image?.length > 0 && (
                    <p className="text-sm text-emerald-600 font-medium">
                      {image.length} image(s) selected
                    </p>
                  )}

                </div>

                {/* ITEM DETAILS */}
                <div className="border-t border-slate-100 pt-6">

                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Item Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">

                    {/* NAME */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Item Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. Blue Backpack"
                        value={values.name}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition"
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Description
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Color, brand, unique details..."
                        value={values.description}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 resize-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition"
                      />
                    </div>

                    {/* LOCATION */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Location
                      </label>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Library, Hostel, etc."
                        value={values.location}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition"
                      />
                    </div>

                    {/* DATE */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Date
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={values.date}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition"
                      />
                    </div>

                    {/* CONTACT */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Contact Number
                      </label>

                      <input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="+91 00000 00000"
                        value={values.number}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition"
                      />
                    </div>

                    {/* TYPE */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Type
                      </label>

                      <select
                        id="type"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition"
                      >
                        <option value="">Select Type</option>
                        <option value="Lost">Lost Item</option>
                        <option value="Found">Found Item</option>
                      </select>

                    </div>

                  </div>

                </div>

                {/* SUBMIT */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all disabled:opacity-60"
                >
                  {loading ? `Uploading... ${progress}%` : "Create Post"}
                </motion.button>

              </Form>
            )}
          </Formik>

        </div>

        {/* SIDE IMAGE */}
        <div className="hidden lg:flex justify-center sticky top-24">

          <img
            src="https://i.ibb.co/Q65DB0d/list-item.png"
            alt="Post Illustration"
            className="w-full max-w-md drop-shadow-2xl"
          />

        </div>

      </div>

    </div>
  );
};

export default LostItem;