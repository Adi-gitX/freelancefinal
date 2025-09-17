import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, LogIn } from "lucide-react";
import HeaderLogo from "../../pages/headerlogo2.png";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "Materials", path: "/materials" },
    { name: "Samples", path: "/samples" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800 relative z-50">
        {/* Trust badges strip */}
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                Hand-engraved
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                Secure payments
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                Worldwide shipping
              </span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={HeaderLogo}
                alt="Header Logo"
                className="object-contain h-72 w-auto drop-shadow-2xl"
                style={{ maxHeight: 340, maxWidth: 1200 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                    isActive(item.path)
                      ? "text-amber-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
              </button>

              {/* User menu */}
              <div className="hidden md:flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* CTA Button */}
              <Link
                to="/create"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-2 rounded-lg font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
              >
                Create Memorial
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900 border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Search mobile */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-gray-400">
                  <Search className="w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-white flex-1 outline-none"
                  />
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-2 text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? "text-amber-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* User actions mobile */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart (0)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Header background texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-50 pointer-events-none" />
    </>
  );
};
