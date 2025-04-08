import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const Header = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  return (
    <header className="bg-white py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Good Morning, Sameesh</h2>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>
        
        <div className="flex items-center space-x-5">
          <div className="relative w-64">
            <Input 
              type="search" 
              placeholder="Search resources..." 
              className="pl-10 pr-4 py-2 rounded-md bg-white shadow-sm text-gray-600 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sameesh</span>
            <Avatar className="bg-[#4ABABA] h-9 w-9">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback className="text-white">SM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;