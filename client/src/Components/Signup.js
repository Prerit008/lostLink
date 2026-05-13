import { motion } from "framer-motion";
import React, { useState } from "react";
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'

function Signup() {
    const [info, setInfo] = useState("");
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    function handleSubmit(values) {
        setLoading(true);
        const { nickname, fullname, email, password } = values;

        const uploadImage = async () => {
            if (image) {
                const storageRef = ref(storage, `/images/${image.name}`);
                const fileRef = ref(storageRef, image.name);
                const uploadTask = uploadBytesResumable(fileRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const uploaded = Math.floor(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(uploaded);
                    },
                    (error) => {
                        console.log(error);
                        setLoading(false);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (imgUrl) => {
                            const payload = { nickname, fullname, email, password, img: imgUrl };
                            await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, payload)
                                .then((response) => {
                                    setInfo(response.data);
                                    if (response.data === "Done") {
                                        toast.success('You are now successfully Signed up!', {
                                            position: "bottom-right",
                                            autoClose: 800,
                                        });
                                        window.location.href = "/log-in";
                                    }
                                    else {
                                        toast.error('Something is missing!', {
                                            position: "bottom-right",
                                            autoClose: 1000,
                                        });
                                        setLoading(false);
                                    }
                                })
                                .catch(() => {
                                    console.log("Error occurred");
                                    setLoading(false);
                                });
                        });
                    });
            } else {
                const payload = { nickname, fullname, email, password };
                await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, payload)
                    .then((response) => {
                        setInfo(response.data);
                        if (response.data === "Done") {
                            toast.success('You are now successfully Signed up!', {
                                position: "bottom-right",
                                autoClose: 800,
                            });
                            window.location.href = "/log-in";
                        }
                        else {
                            toast.error('Something is missing!', {
                                position: "bottom-right",
                                autoClose: 1000,
                            });
                            setLoading(false);
                        }
                    })
                    .catch(() => {
                        console.log("Error occured");
                        setLoading(false);
                    });
            }
        };
        uploadImage();
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-cyan-50 flex items-center justify-center px-6 py-16 overflow-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-200/40 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/40 blur-[120px] rounded-full"></div>

            <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">

                {/* LEFT SIDE */}
                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-cyan-600 to-blue-700 p-14 relative overflow-hidden">

                    {/* DECORATION */}
                    <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-[-120px] left-[-80px] w-[420px] h-[420px] bg-white/10 rounded-full"></div>

                    <div className="relative z-10">

                        {/* LOGO */}
                        <div className="flex items-center gap-3 mb-10">

                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl">
                                <span className="text-cyan-600 text-2xl font-black">
                                    L
                                </span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black text-white">
                                    Lostly
                                </h2>

                                <p className="text-cyan-100 text-sm">
                                    Campus Lost & Found
                                </p>
                            </div>

                        </div>

                        {/* TEXT */}
                        <h1 className="text-5xl font-black text-white leading-tight">
                            Join The
                            <span className="block">
                                Community 🚀
                            </span>
                        </h1>

                        <p className="text-cyan-100 text-lg leading-relaxed mt-6 max-w-md">
                            Create your account to report lost belongings,
                            connect with students, and help items return home faster.
                        </p>

                    </div>

                    {/* IMAGE */}
                    <div className="relative z-10 flex justify-center mt-10">

                        <img
                            src="https://i.ibb.co/G2k63ys/login-1.png"
                            alt="Signup Illustration"
                            className="w-full max-w-md object-contain drop-shadow-2xl"
                        />

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-center bg-white p-8 md:p-14">

                    <div className="w-full max-w-lg">

                        {/* HEADER */}
                        <div className="mb-10">

                            <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                                Create Account
                            </div>

                            <h2 className="text-4xl font-black text-slate-900">
                                Sign Up
                            </h2>

                            <p className="text-slate-500 mt-3 text-lg">
                                Start your journey with Lostly today.
                            </p>

                        </div>

                        {/* FORM */}
                        <Formik
                            initialValues={{
                                nickname: "",
                                fullname: "",
                                email: "",
                                password: "",
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ values, handleChange }) => (
                                <Form className="flex flex-col gap-6">

                                    {/* PROFILE IMAGE */}
                                    <div className="flex flex-col items-center gap-4 mb-2">

                                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-100 bg-slate-50 shadow-inner">

                                            {image ? (
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="Profile Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <svg
                                                        className="w-14 h-14"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7
                          9a7 7 0 1114 0H3z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            )}

                                        </div>

                                        <label className="cursor-pointer bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300">

                                            Upload Profile Photo

                                            <input
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={handleImageUpload}
                                            />

                                        </label>

                                    </div>

                                    {/* NICKNAME */}
                                    <div className="flex flex-col gap-2">

                                        <label
                                            htmlFor="nickname"
                                            className="text-sm font-bold text-slate-700"
                                        >
                                            Nickname
                                        </label>

                                        <input
                                            required
                                            id="nickname"
                                            type="text"
                                            name="nickname"
                                            placeholder="johndoe"
                                            value={values.nickname}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all text-slate-700"
                                        />

                                    </div>

                                    {/* FULL NAME */}
                                    <div className="flex flex-col gap-2">

                                        <label
                                            htmlFor="fullname"
                                            className="text-sm font-bold text-slate-700"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            required
                                            id="fullname"
                                            type="text"
                                            name="fullname"
                                            placeholder="John Doe"
                                            value={values.fullname}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all text-slate-700"
                                        />

                                    </div>

                                    {/* EMAIL */}
                                    <div className="flex flex-col gap-2">

                                        <label
                                            htmlFor="email"
                                            className="text-sm font-bold text-slate-700"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            required
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all text-slate-700"
                                        />

                                    </div>

                                    {/* PASSWORD */}
                                    <div className="flex flex-col gap-2">

                                        <label
                                            htmlFor="password"
                                            className="text-sm font-bold text-slate-700"
                                        >
                                            Password
                                        </label>

                                        <input
                                            required
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            value={values.password}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all text-slate-700"
                                        />

                                    </div>

                                    {/* BUTTON */}
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-200 transition-all duration-300 disabled:opacity-70"
                                    >
                                        {loading ? "Creating Account..." : "Create Account"}
                                    </motion.button>

                                </Form>
                            )}
                        </Formik>

                        {/* DIVIDER */}
                        <div className="flex items-center gap-4 my-10">

                            <div className="flex-1 h-px bg-slate-200"></div>

                            <span className="text-slate-400 text-sm font-medium">
                                OR
                            </span>

                            <div className="flex-1 h-px bg-slate-200"></div>

                        </div>

                        {/* LOGIN LINK */}
                        <div className="text-center">

                            <p className="text-slate-600">
                                Already have an account?
                            </p>

                            <Link
                                to="/log-in"
                                className="inline-block mt-3 text-cyan-600 hover:text-cyan-700 font-bold text-lg transition-colors"
                            >
                                Login Instead
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
