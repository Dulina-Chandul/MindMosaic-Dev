import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import RouteGuard from './components/RouteGuard';
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MosaAI from "./pages/MosaAI";
import CreativeSuite from "./pages/CreativeSuite";
import CommunityGallery from "./pages/CommunityGallery";
import Challenges from "./pages/Challenges";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/auth/Unauthorized";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              <RouteGuard requireAuth={false}>
                <Login />
              </RouteGuard>
            } 
          />
          <Route 
            path="/register" 
            element={
              <RouteGuard requireAuth={false}>
                <Register />
              </RouteGuard>
            } 
          />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <RouteGuard>
                <Layout><Dashboard /></Layout>
              </RouteGuard>
            } 
          />
          <Route 
            path="/mosa-ai" 
            element={
              <RouteGuard>
                <Layout><MosaAI /></Layout>
              </RouteGuard>
            } 
          />
          <Route 
            path="/creative-suite" 
            element={
              <RouteGuard>
                <Layout><CreativeSuite /></Layout>
              </RouteGuard>
            } 
          />
          <Route 
            path="/community-gallery" 
            element={
              <RouteGuard>
                <Layout><CommunityGallery /></Layout>
              </RouteGuard>
            } 
          />
          <Route 
            path="/challenges" 
            element={
              <RouteGuard>
                <Layout><Challenges /></Layout>
              </RouteGuard>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <RouteGuard>
                <Layout><Resources /></Layout>
              </RouteGuard>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <RouteGuard>
                <Layout><Settings /></Layout>
              </RouteGuard>
            } 
          />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
