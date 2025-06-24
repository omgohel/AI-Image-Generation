import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  Search,
  Sparkles,
  Image,
  Filter,
  Grid,
  List,
  Menu,
  Bell,
  User,
  Plus,
  Heart,
  Bookmark,
  Zap,
} from "lucide-react";
import { logo } from "./assets";
import { Home, CreatePost } from "./page";
import HomePage from "./page/HomePage";
import CreateImage from "./page/CreateImage";

const App = () => (
  <BrowserRouter>
    {/* <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <Link
        to="/create-post"
        className="font-inter font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md"
      >
        Create
      </Link>
    </header> */}
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Link to="/">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </Link>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                OG
              </h1>
              <p className="text-xs text-gray-500 font-medium -mt-1">
                Community
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Create Button */}
            <Link
              to="/create-post"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Create
            </Link>
          </div>
        </div>
      </div>
    </header>
    <main className="w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<CreateImage />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
