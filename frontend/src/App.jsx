import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MosaAI from "./pages/MosaAI";
import CreativeSuite from "./pages/CreativeSuite";
import CommunityGallery from "./pages/CommunityGallery";
import Challenges from "./pages/Challenges";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/mosa-ai" element={<Layout><MosaAI /></Layout>} />
      <Route path="/creative-suite" element={<Layout><CreativeSuite /></Layout>} />
      <Route path="/community-gallery" element={<Layout><CommunityGallery /></Layout>} />
      <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
      <Route path="/resources" element={<Layout><Resources /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />
    </Routes>
  );
};

export default App;
