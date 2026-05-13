import { motion } from "framer-motion";
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function Login() {
    const [loading, setloading] = useState(false);
    let [info, setinfo] = useState("");
    const [user_info, setuser_info] = useState("");

    function login(values) {
        setloading(true);
        var payload = {
            email: values.email,
            password: values.password,
        };
        axios({
            url: `${process.env.REACT_APP_API_URL}/users/login`,
            method: "POST",
            data: payload,
        })
            .then((response) => {
                if (response.data.user) {
                    toast.success('Logged In Successfully!', {
                        position: "bottom-right",
                        autoClose: 1000,
                    });
                    setuser_info(response.data.user);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.location.href = "/";
                } else {
                    setinfo(response.data);
                    setloading(false);
                    toast.error('Oops 🙁! Email or Password is incorrect!', {
                        position: "bottom-right",
                        autoClose: 1000,
                    });
                }
            })
            .catch((error) => {
                setloading(false);
                toast.error('Oops 🙁! Error occured.', {
                    position: "bottom-right",
                    autoClose: 1000,
                });
            });
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-cyan-50 flex items-center justify-center px-6 py-16 overflow-hidden">

            {/* BACKGROUND BLOBS */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-200 opacity-40 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 opacity-40 blur-[120px] rounded-full"></div>

            <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">

                {/* LEFT SIDE */}
                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-cyan-600 to-blue-700 p-14 relative overflow-hidden">

                    {/* Decorative Circles */}
                    <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-[-120px] left-[-50px] w-96 h-96 bg-white/10 rounded-full"></div>

                    <div className="relative z-10">

                        <div className="flex items-center gap-3 mb-10">

                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
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

                        <h1 className="text-5xl font-black text-white leading-tight">
                            Welcome
                            <span className="block">
                                Back 👋
                            </span>
                        </h1>

                        <p className="text-cyan-100 text-lg leading-relaxed mt-6 max-w-md">
                            Log in to reconnect with lost belongings,
                            manage your posts, and help students across campus.
                        </p>

                    </div>

                    {/* IMAGE */}
                    <div className="relative z-10 flex justify-center mt-10">

                        <img
                            src="https://i.ibb.co/G2k63ys/login-1.png"
                            alt="Login Illustration"
                            className="w-full max-w-md object-contain drop-shadow-2xl"
                        />

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-center p-8 md:p-14 bg-white">

                    <div className="w-full max-w-md">

                        {/* HEADER */}
                        <div className="mb-10">

                            <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                                Secure Login
                            </div>

                            <h2 className="text-4xl font-black text-slate-900">
                                Log In
                            </h2>

                            <p className="text-slate-500 mt-3 text-lg">
                                Enter your credentials to continue.
                            </p>

                        </div>

                        {/* FORM */}
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={(values) => login(values)}
                        >
                            {({ values, handleChange }) => (
                                <Form className="flex flex-col gap-6">

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
                                        {loading ? "Logging in..." : "Login"}
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

                        {/* SIGNUP */}
                        <div className="text-center">

                            <p className="text-slate-600">
                                Don't have an account?
                            </p>

                            <Link
                                to="/sign-up"
                                className="inline-block mt-3 text-cyan-600 hover:text-cyan-700 font-bold text-lg transition-colors"
                            >
                                Create New Account
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
