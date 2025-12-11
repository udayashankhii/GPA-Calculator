import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import CallRoundedIcon from "@mui/icons-material/CallRounded"; // MUI phone icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#streams", label: "Streams" },
    { href: "#faq", label: "FAQ" },
    { href: "#grading", label: "Grading" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Pokhara University
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-indigo-600">
            GPA
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA + Login */}
        <div className="hidden md:flex items-center gap-4">
          {/* Phone Icon Button */}
          <a
            href="tel:+9779800000000"
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <CallRoundedIcon fontSize="small" />
            <span className="text-sm font-medium">Contact</span>
          </a>

          {/* Login Button */}
          <a
            href="/login"
            className="rounded-full border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Login
          </a>

          {/* GPA Button */}
          <a
            href="#grading"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Check GPA
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden border-b border-slate-200 bg-white transition-[max-height,opacity] duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}

          {/* Contact (Phone) */}
          <a
            href="tel:+9779800000000"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
            onClick={() => setIsOpen(false)}
          >
            <CallRoundedIcon fontSize="small" /> Contact
          </a>

          {/* Login */}
          <a
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-indigo-600 border border-indigo-600 text-center"
          >
            Login
          </a>

          {/* GPA Button */}
          <a
            href="#grading"
            onClick={() => setIsOpen(false)}
            className="mt-2 block rounded-full bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
          >
            Check GPA
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
