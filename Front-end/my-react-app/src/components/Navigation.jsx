import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", path: "/", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "About us", path: "/about", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "News", path: "/news", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "Contact", path: "/contact", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "Services", path: "/services", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" }
];

export default function Navigation() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav class="sticky top-0 left-0 w-full flex items-center justify-between flex-wrap bg-stone-100 p-3 shadow-md">
        <div class="flex items-center flex-shrink-0 text-black mr-6">
          <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span class="font-semibold text-xl tracking-tight">OceanWings</span>
        </div>
        <div class="flex items-center justify-center gap-8">
          <div class="text-sm lg:flex-grow">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.path} class={link.className}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Conditional render: Account vs Login/Register ── */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-gray-800">{user.name}</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Orders</a>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div class="flex gap-4">
            <button onClick={() => window.location.href = "/login"} class="bg-emerald-900 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-900 rounded">Login</button>
            <button onClick={() => window.location.href = "/register"} class="bg-emerald-900 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-900 rounded">Register</button>
          </div>
        )}
      </nav >
    </>
  )
}