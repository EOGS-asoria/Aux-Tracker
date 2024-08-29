import React from 'react';
import { Link } from '@inertiajs/react';
import '../css/App.css';
import LoginHeaderSection from './_sections/login-header-section';
import LoginWithGoogleSection from './_sections/login-with-google-section';
import LoginFormSection from './_sections/login-form-section';

const LoginPage = () => {


  return (
    <div className="max-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 min-h-screen flex items-center justify-center">
        {/* Floating Bubbles */}
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>

        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl relative z-10">
          <div className="md:w-1/2 px-5">
            <LoginHeaderSection />

            <LoginFormSection />




          </div>

          <div className="relative w-1/2 md:block hidden">

            <img src="/images/empire.png" className="rounded-2xl mt-30" alt="Empire Image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
