import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";

const Challenges = () => {
  // Available challenges data
  const availableChallenges = [
    {
      id: 1,
      title: "Draw Your Mood",
      description: "Express your current emotional state through art",
      image: "/images/mood-drawing.jpg",
      duration: "15 mins",
      participants: 137,
    },
    {
      id: 2,
      title: "Color Journey",
      description: "Create a palette that represents your day",
      image: "/images/color-palette.jpg",
      duration: "20 mins",
      participants: 54,
    },
    {
      id: 3,
      title: "Mindful Photography",
      description: "Capture moments of peace and tranquility in your daily...",
      image: "/images/mindful-photography.jpg",
      duration: "10 mins",
      participants: 21,
    },
    {
      id: 4,
      title: "Gratitude Journal",
      description: "Write and illustrate three things you're grateful for today. Build...",
      image: "/images/gratitude-journal.jpg",
      duration: "15 mins",
      participants: 33,
    },
  ];

  // Active challenges data
  const activeChallenges = [
    {
      id: 1,
      title: "Mindful Sketching",
      daysLeft: 2,
      progress: 70, // Added progress percentage
    },
    {
      id: 2,
      title: "Gratitude Collage",
      daysLeft: 3,
      progress: 40, // Added progress percentage
    },
  ];

  // Achievements data
  const achievements = [
    {
      id: 1,
      title: "Creative Explorer",
      icon: "/images/creative-explorer.svg",
      color: "bg-[#FF9999]",
    },
    {
      id: 2,
      title: "Mindful Artist",
      icon: "/images/mindful-artist.svg",
      color: "bg-[#FF9999]",
    },
    {
      id: 3,
      title: "Emotion Master",
      icon: "/images/emotion-master.svg",
      color: "bg-[#FF9999]",
    },
    {
      id: 4,
      title: "Nature Observer",
      icon: "/images/nature-observer.svg",
      color: "bg-[#FF9999]",
    },
    {
      id: 5,
      title: "Daily Creator",
      icon: "/images/daily-creator.svg",
      color: "bg-[#FF9999]",
    },
  ];

  // Default fallback image
  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EImage Not Available%3C/text%3E%3C/svg%3E";

  return (
    <div>
      {/* Header with title */}
      <h1 className="text-3xl font-bold mb-8">Available Challenges</h1>

      {/* Main content with two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Available Challenges */}
        <div className="w-full lg:w-2/3">
          {/* Changed to grid with 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="overflow-hidden border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:border-[#4ABABA]/50"
                style={{ boxShadow: "0 4px 8px rgba(74, 186, 186, 0.1)" }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                  </div>

                  <div className="w-full p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-bold text-xl mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

                      <div className="flex items-center gap-4 text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          <span className="text-sm">{challenge.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2" />
                          <span className="text-sm">{challenge.participants}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-[#FF9999] hover:bg-[#FF9999]/90 text-white w-full px-4 py-2 h-auto text-base font-medium shadow-sm">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right column - Active Challenges and Achievements */}
        <div className="w-full lg:w-1/3 space-y-8">
          {/* Active Challenges Section */}
          <Card className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
            <h2 className="text-xl font-bold mb-4">Active Challenges</h2>
            
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <span className="text-sm text-gray-500">{challenge.daysLeft} days left</span>
                </div>
                
                {/* Added progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div 
                    className="bg-[#4ABABA] h-2.5 rounded-full" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                
                <Button className="bg-[#214B59] hover:bg-[#214B59]/90 text-white w-full px-4 py-2 h-auto text-base font-medium shadow-sm">
                  Submit Work
                </Button>
              </div>
            ))}
          </Card>

          {/* Achievements Section */}
          <Card className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
            <h2 className="text-xl font-bold mb-4">Achievements</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex flex-col items-center">
                  <div className={`${achievement.color} w-16 h-16 rounded-full flex items-center justify-center mb-2`}>
                    <img
                      src={achievement.icon}
                      alt={achievement.title}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <span className="text-xs text-center">{achievement.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Challenges;