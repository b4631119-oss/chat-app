"use client";
import { auth } from "../lib/auth";
import { signOut } from "firebase/auth";
import MessageList from "./MessageList";
import InputForm from "./InputForm";
import {  LogOut, MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";

export default function ChatInterface() {
  const user = auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-10">
        <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-md">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dev-Chat
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              )}
            </button>

            <div className="hidden lg:flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 md:gap-3 bg-gray-50/80 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200/50 shadow-sm">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-xs md:text-sm shadow-md">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-700 max-w-[200px] truncate">
                  {user?.email || "Пользователь"}
                </span>
              </div>
              
              <button 
                onClick={() => signOut(auth)}
                className="group flex items-center gap-1.5 md:gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md border border-red-200/50 text-xs md:text-sm"
              >
                <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Выйти</span>
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-gray-200/50 animate-slideDown">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-gray-50/80 px-4 py-2.5 rounded-xl border border-gray-200/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user?.email?.split('@')[0] || "Пользователь"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "email@example.com"}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => signOut(auth)}
                  className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-all duration-200 border border-red-200/50 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 relative">
        <div className="max-w-4xl mx-auto h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl pointer-events-none" />
          
          <MessageList />
        </div>
      </div>
      
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-md border-t border-white/20 shadow-lg">
        <div className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 max-w-4xl mx-auto">
          <InputForm />
        </div>
      </div>

      
    </main>
  );
}