import React from 'react'
import '../css/app.css';
import { Link } from '@inertiajs/react'; 
import Button from '@/app/_components/button'
import Input from '@/app/_components/input'
import RegisterHeader from './sections/register-header';
import RegisterFormSection from './sections/register-form-section';

export default function RegistrationPage() {

  function submit_form(params) {

  }
  return (
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
          <RegisterHeader />
          <RegisterFormSection />

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>

          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
              <defs>
                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </svg>
            <span className="ml-4">Register with Google</span>
          </button>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>Already have an account?</p>
            <Link href="/" className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
              Log In
            </Link>
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
    </section>
  )
}
