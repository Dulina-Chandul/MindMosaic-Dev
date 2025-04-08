import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Share2, Filter } from "lucide-react";

const CommunityGallery = () => {
  // Add state for active tab
  const [activeTab, setActiveTab] = useState("community");

  const galleryItems = [
    {
      id: 1,
      title: "Ocean of calm",
      description: "Finding peace in the waves of life.",
      image: "/images/ocean.jpg",
      tags: ["calm", "ocean", "blue"],
      author: {
        name: "ArtisticSoul",
        avatar: "/avatars/artist1.jpg",
        initials: "AS",
      },
      likes: 24,
      shares: 24,
    },
    {
      id: 2,
      title: "Vibrant Emotions",
      description: "Expressing the full spectrum of feelings through color.",
      image: "/images/abstract.jpg",
      tags: ["colorful", "emotions", "abstract"],
      author: {
        name: "ColorExplorer",
        avatar: "/avatars/artist2.jpg",
        initials: "CE",
      },
      likes: 10,
      shares: 2,
    },
    {
      id: 3,
      title: "Growth Mindset",
      description: "Reflections on personal growth and transformation.",
      image: "/images/growth.jpg",
      tags: ["growth", "mindfulness", "journal"],
      author: {
        name: "ColorExplorer",
        avatar: "/avatars/artist2.jpg",
        initials: "CE",
      },
      likes: 33,
      shares: 9,
    },
    {
      id: 4,
      title: "Sunset Reflections",
      description: "Finding beauty in the ending of each day.",
      image: "/images/sunset.jpg",
      tags: ["sunset", "reflection", "peace"],
      author: {
        name: "PeacefulMind",
        avatar: "/avatars/artist3.jpg",
        initials: "PM",
      },
      likes: 16,
      shares: 0,
    },
    {
      id: 5,
      title: "Anxiety Expressed",
      description: "Visualizing anxiety to better understand and manage it.",
      image: "/images/anxiety.jpg",
      tags: ["anxiety", "healing", "expression"],
      author: {
        name: "HealingArtist",
        avatar: "/avatars/artist4.jpg",
        initials: "HA",
      },
      likes: 29,
      shares: 8,
    },
    {
      id: 6,
      title: "Dear Future Self",
      description: "A letter to my future self about hopes and dreams.",
      image: "/images/future.jpg",
      tags: ["future", "letter", "journal"],
      author: {
        name: "TimeTraveler",
        avatar: "/avatars/artist5.jpg",
        initials: "TT",
      },
      likes: 33,
      shares: 9,
    },
  ];

  // Filter items based on active tab
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "community") return true;
    if (activeTab === "yours") return item.author.name === "ColorExplorer"; // Example: assume these are user's creations
    if (activeTab === "saved") return item.likes > 20; // Example: assume items with >20 likes are saved
    return true;
  });

  // Default fallback image - using a data URI instead of an external service
  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EImage Not Available%3C/text%3E%3C/svg%3E";

  return (
    <div>
      {/* Header with title and share button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Gallery</h1>
        <Button className="bg-[#FF9999] hover:bg-[#FF9999]/90 text-white shadow-md px-6 py-2 h-12 text-base font-medium rounded-md">
          Share Your Creation
        </Button>
      </div>

      {/* Search and filter section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex gap-3">
          <div className="w-full">
            <Input
              type="text"
              placeholder="Search gallery..."
              className="w-full h-12 text-base rounded-lg border-gray-200"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#4ABABA] text-[#4ABABA] h-12 px-5 text-base font-medium rounded-lg"
          >
            <Filter size={18} />
            Filter
          </Button>
        </div>

        {/* Tabs section */}
        <div className="flex space-x-6 mt-6 border-b border-gray-200">
          <Button
            variant="ghost"
            className={`${
              activeTab === "community"
                ? "text-[#4ABABA] border-b-2 border-[#4ABABA]"
                : "text-gray-500 hover:text-[#4ABABA]"
            } rounded-none pb-3 px-1 text-base font-medium`}
            onClick={() => setActiveTab("community")}
          >
            Community Gallery
          </Button>
          <Button
            variant="ghost"
            className={`${
              activeTab === "yours"
                ? "text-[#4ABABA] border-b-2 border-[#4ABABA]"
                : "text-gray-500 hover:text-[#4ABABA]"
            } rounded-none pb-3 px-1 text-base font-medium`}
            onClick={() => setActiveTab("yours")}
          >
            Your Creations
          </Button>
          <Button
            variant="ghost"
            className={`${
              activeTab === "saved"
                ? "text-[#4ABABA] border-b-2 border-[#4ABABA]"
                : "text-gray-500 hover:text-[#4ABABA]"
            } rounded-none pb-3 px-1 text-base font-medium`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Items
          </Button>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:border-[#4ABABA]/50 group"
            style={{ boxShadow: "0 4px 8px rgba(74, 186, 186, 0.1)" }}
          >
            <div className="h-52 bg-gray-200 relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
            </div>
            <CardContent className="p-5 transition-colors duration-300 group-hover:bg-gray-50">
              <h3 className="font-bold text-xl mb-2 transition-colors duration-300 group-hover:text-[#4ABABA]">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#4ABABA]/10 px-3 py-1 rounded-full text-[#4ABABA] font-medium transition-all duration-300 group-hover:bg-[#4ABABA]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 p-4 flex items-center justify-between transition-colors duration-300 group-hover:bg-gray-50 group-hover:border-[#4ABABA]/30">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7 transition-transform duration-300 group-hover:scale-110">
                  <AvatarImage
                    src={item.author.avatar}
                    alt={item.author.name}
                  />
                  <AvatarFallback className="bg-[#4ABABA] text-white text-xs">
                    {item.author.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{item.author.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-[#4ABABA] transition-transform duration-300 group-hover:scale-110"
                  >
                    <Heart size={16} className="text-gray-500 group-hover:text-[#4ABABA]" />
                  </Button>
                  <span className="text-sm text-gray-500">{item.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-[#4ABABA] transition-transform duration-300 group-hover:scale-110"
                  >
                    <Share2 size={16} className="text-gray-500 group-hover:text-[#4ABABA]" />
                  </Button>
                  <span className="text-sm text-gray-500">{item.shares}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityGallery;
