"use client"
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs'


function Hero() {
  const {user, isSignedIn} = useUser();
  return (
    <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
    
    <div className="max-w-prose text-left">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        Manage your expenses and{" "}
        <strong className="text-primary">control</strong>{" "}
        your money
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
        TransactBud — A smarter way to track your expenses, manage your budget, and build better financial habits every day.
      </p>

      <div className="mt-4 flex gap-4 sm:mt-6">
        {isSignedIn ?
        ""
        :
        <a
          className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-green-600"
          href="/sign-in"
        >
          Get Started
        </a>}

        <a
          className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 768"
      className="mx-auto hidden max-w-md text-gray-900 md:block"
    >
      {
      <svg data-logo="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 41">
        <g id="logogram" transform="
    translate(0, 0)
    rotate(0 20.5 20.5)
    
  "><path d="M20.3018 10.27C20.3018 15.7928 15.8246 20.27 10.3018 20.27H0.301758V10.27C0.301758 4.74714 4.7789 0.269989 10.3018 0.269989C15.8246 0.269989 20.3018 4.74714 20.3018 10.27Z" fill="#17CF97"/><path d="M20.3018 30.27C20.3018 24.7471 24.7789 20.27 30.3018 20.27H40.3018V30.27C40.3018 35.7928 35.8246 40.27 30.3018 40.27C24.7789 40.27 20.3018 35.7928 20.3018 30.27Z" fill="#17CF97"/><path d="M0.301758 30.27C0.301758 35.7928 4.7789 40.27 10.3018 40.27H20.3018V30.27C20.3018 24.7471 15.8246 20.27 10.3018 20.27C4.7789 20.27 0.301758 24.7471 0.301758 30.27Z" fill="#17CF97"/><path d="M40.3018 10.27C40.3018 4.74714 35.8246 0.269989 30.3018 0.269989H20.3018V10.27C20.3018 15.7928 24.7789 20.27 30.3018 20.27C35.8246 20.27 40.3018 15.7928 40.3018 10.27Z" fill="#17CF97"/></g>
        <g id="logotype" transform=""></g>
        
      </svg>
    }
    </svg>
    
  </div>
  <Image src={'/dashboard.png'} 
  alt='dashboard' 
  width={1000} 
  height={700}
  className='mt-5 rounded-xl border-2'/>
</section>
  )
}

export default Hero