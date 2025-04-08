import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Bookmark,
  BookOpen,
  Video,
  Headphones,
  Users,
  LayoutGrid,
} from "lucide-react";

const Resources = () => {
  // Add state for active category
  const [activeCategory, setActiveCategory] = useState("all");

  // Weekly highlight data
  const weeklyHighlight = {
    title: "Weekly Highlight: Mindfulness Meditation Series",
    description:
      "Join our expert-led meditation series designed to help you develop a consistent mindfulness practice. Learn techniques for stress reduction, emotional regulation, and improved focus.",
    readTime: "15 min read",
    image: "/images/meditation.jpg",
  };

  // Resource categories with Lucide icons - Changed All Resources icon to LayoutGrid
  const resourceCategories = [
    { id: "all", label: "All Resources", icon: <LayoutGrid size={18} /> },
    { id: "article", label: "Articles", icon: <BookOpen size={18} /> },
    { id: "video", label: "Videos", icon: <Video size={18} /> },
    { id: "podcast", label: "Podcasts", icon: <Headphones size={18} /> },
    {
      id: "professional",
      label: "Professional Help",
      icon: <Users size={18} />,
    },
  ];

  // Resource items
  const resourceItems = [
    {
      id: 1,
      type: "article",
      title: "Beginners Guide to Meditation",
      description:
        "Learn the fundamentals of meditation and how it can help improve your mental wellbeing.",
      image: "/images/meditation-guide.jpg",
      readTime: "15 min read",
    },
    {
      id: 2,
      type: "video",
      title: "Understanding Therapy",
      description:
        "Comprehensive guide to different types of therapy and how to choose the right one for you.",
      image: "/images/therapy.jpg",
      duration: "12 min video",
    },
    {
      id: 3,
      type: "podcast",
      title: "The Power of Journaling",
      description:
        "Discover how daily journaling can help process emotions and reduce anxiety.",
      image: "/images/journaling.jpg",
      duration: "40 min episode",
    },
    {
      id: 4,
      type: "article",
      title: "Managing Anxiety in Daily Life",
      description:
        "Practical strategies to manage anxiety symptoms and build resilience.",
      image: "/images/anxiety.jpg",
      readTime: "10 min read",
    },
    {
      id: 5,
      type: "professional",
      title: "Finding the Right Therapist",
      description:
        "How to search for and select a therapist that meets your specific needs.",
      image: "/images/therapist.jpg",
      readTime: "8 min read",
    },
    {
      id: 6,
      type: "video",
      title: "Guided Breathing Exercises",
      description:
        "Follow along with these breathing techniques to reduce stress instantly.",
      image: "/images/breathing.jpg",
      duration: "15 min video",
    },
  ];

  // Filter items based on active category
  const filteredItems = resourceItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.type === activeCategory;
  });

  // Default fallback image
  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EImage Not Available%3C/text%3E%3C/svg%3E";

  return (
    <div>
      {/* Header with title */}
      <h1 className="text-3xl font-bold mb-8">Resources</h1>

      {/* Weekly Highlights Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Weekly Highlights</h2>

        <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg overflow-hidden">
          <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
            <img
              src={weeklyHighlight.image || "/images/meditation.jpg"}
              alt="Meditation"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
          </div>

          <div className="w-full md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
            <div>
              {/* Made the tag bigger with more padding */}
              <div className="inline-block px-4 py-1.5 bg-[#214B59] text-white font-medium text-sm rounded-md mb-3">
                Article
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {weeklyHighlight.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {weeklyHighlight.description}
              </p>

              <div className="flex items-center text-gray-500 mb-4">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">{weeklyHighlight.readTime}</span>
              </div>
            </div>

            {/* Added more padding to the View Now button */}
            <Button className="bg-[#FF9999] hover:bg-[#FF9999]/90 text-white w-fit px-8 py-3 h-auto text-base font-medium shadow-md border border-[#FF9999]/20">
              View Now
            </Button>
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="flex flex-wrap gap-4 mb-8">
        {resourceCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`group flex items-center gap-2 px-5 py-2 h-12 ${
              activeCategory === category.id
                ? "bg-[#214B59] text-white hover:bg-[#214B59]/90"
                : "border-[#214B59] text-[#214B59] hover:bg-[#214B59] hover:text-white"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {/* Ensure icon turns white on hover */}
            <span
              className={
                activeCategory === category.id 
                  ? "text-white" 
                  : "text-[#214B59] group-hover:text-white"
              }
            >
              {category.icon}
            </span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Resource Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:border-[#4ABABA]/50"
              style={{ boxShadow: "0 4px 8px rgba(74, 186, 186, 0.1)" }}
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <div className="absolute top-3 left-3">
                  {/* Made the type tag bigger */}
                  <div className="px-4 py-1.5 bg-[#214B59] text-white font-medium text-sm rounded-md">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-[#4ABABA] rounded-full h-8 w-8"
                >
                  <Bookmark size={16} />
                </Button>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">
                      {item.readTime || item.duration}
                    </span>
                  </div>

                  {/* Made the bookmark icon and Save text bigger */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#4ABABA] hover:text-[#4ABABA]/80 p-0 text-base"
                  >
                    <Bookmark size={18} className="mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">
              No resources found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
