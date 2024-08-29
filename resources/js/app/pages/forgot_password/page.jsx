import React, { useState } from 'react';
import '../css/app.css'; // Assuming your Tailwind and custom CSS are imported here
import ForgotPasswordHeader from './_sections/forgot-password-header';
import PhoneNumberSections from './_sections/phone-number-sections';

const ForgotPassword = () => {
    const [resetOption, setResetOption] = useState('email');

    const handleResetOptionChange = (e) => {
        setResetOption(e.target.value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 relative overflow-hidden">
            {/* Floating Bubbles */}
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>

            <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl z-10">
                <div className="w-full md:w-1/2 px-5">
                    <ForgotPasswordHeader />
                    <form className="mt-6" action="#" method="POST">
                        <div className="mb-4">
                            <label className="block text-gray-700">Reset via:</label>
                            <select
                                value={resetOption}
                                onChange={handleResetOptionChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone Number</option>
                            </select>
                        </div>

                        {resetOption === 'email' && (
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                        )}

                        {resetOption === 'phone' && (
                            // <PhoneNumberSections />
                            <div>
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required
                            />
                        </div>
                        )}

                        <button
                            type="submit"
                            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                        >
                            Reset Password
                        </button>
                    </form>

                    <div className="text-sm flex justify-between items-center mt-5">
                        <p>Remember your password?</p>
                        <a href="/" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
                            Log In
                        </a>
                    </div>


                </div>

                <div className="relative w-1/2 md:block hidden">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="logo-img mx-auto absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    />
                    <img
                        src="/images/empire.png"
                        className="rounded-2xl mt-12"
                        alt="Empire Image"
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
