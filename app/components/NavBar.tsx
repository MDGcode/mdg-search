"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
export default function NavBar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <div className="rounded-div flex items-center justify-between h-20 font-bold w-full bg-slate-900 ">
        <Link href="/" className=" no-underline">
          <h1 className="text-2xl">
            MDG <span className="text-blue-500">Search</span>
          </h1>
        </Link>
        <div className=" hidden md:block">
          <Link
            href="/SignIn"
            className=" p-4 hover:text-cyan-600 no-underline"
          >
            {" "}
            Sign In
          </Link>
          <Link
            href="/SignUp"
            className=" no-underline bg-blue-500 p-4 hover:text-cyan-500 px-5 py-2 ml-2 rounded-2xl shaodw-lg hover:shadow-2xl"
          >
            {" "}
            Sign Up
          </Link>
        </div>
        <div
          onClick={handleNav}
          className="block md:hidden cursor-pointer z-10"
        >
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-slate-800 ease-in duration-300 z-10"
              : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-400"
          }
        >
          <ul className="w-full p-4 ">
            <li className=" py-6 border-b">
              <Link href="/">Home</Link>
            </li>
            <li className=" py-6 border-b">
              <Link href="/">Account</Link>
            </li>
          </ul>
          <div className="flex flex-col w-full p-4">
            <Link href="SignIn" className="no-underline">
              <button className="w-full my-2 p-3 border border-white rounded-2xl">
                <p>Sign In</p>
              </button>
            </Link>
            <Link href="SignUp" className="no-underline">
              <button className="w-full my-2 p-3 border  border-white rounded-2xl bg-cyan-600">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
