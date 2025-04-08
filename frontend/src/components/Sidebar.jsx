import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Bot,
  Palette,
  Users,
  Trophy,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <div className="w-60 bg-[#4ABABA] text-white flex flex-col h-full shadow-md">
      <div className="p-5">
        <h1 className="text-2xl font-bold">MindMosaic</h1>
      </div>

      <nav className="flex-1">
        <ul className="mt-2">
          <SidebarItem icon={<Home size={20} />} label="Dashboard" to="/" />
          <SidebarItem icon={<Bot size={20} />} label="Mosa AI" to="/mosa-ai" />
          <SidebarItem
            icon={<Palette size={20} />}
            label="Creative Suite"
            to="/creative-suite"
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Community Gallery"
            to="/community-gallery"
          />
          <SidebarItem
            icon={<Trophy size={20} />}
            label="Challenges"
            to="/challenges"
          />
          <SidebarItem
            icon={<BookOpen size={20} />}
            label="Resources"
            to="/resources"
          />
        </ul>
      </nav>

      <div className="mt-auto mb-5">
        <ul>
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/settings"
          />
          <li className="mb-1">
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 transition-all font-medium w-full text-left text-white hover:bg-white hover:text-[#4ABABA]"
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 transition-all font-medium ${
            isActive
              ? "bg-white text-[#4ABABA]"
              : "text-white hover:bg-[#eff3f1] hover:text-[#4ABABA]"
          }`
        }
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
