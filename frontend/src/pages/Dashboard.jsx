import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smile,
  Meh,
  Heart,
  Star,
  Frown,
  Palette,
  FileText,
  Brain,
  Phone,
  Heart as HeartIcon,
  PlusSquare,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 font-['Poppins']">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Affirmation */}
        <Card className="md:col-span-2 bg-white rounded-md shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Daily Affirmation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">
              "Every day is a new beginning, take a deep breath and start
              again."
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Remember to be kind to yourself
            </p>
          </CardContent>
        </Card>

        {/* Chat with Mosa */}
        <Card className="bg-[#4ABABA] text-white rounded-md shadow-sm border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                    fill="white"
                  />
                </svg>
              </div>
              <CardTitle className="text-lg font-medium text-white">
                Chat with Mosa
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">
              Need someone to talk to? I'm here to listen and support you.
            </p>
            <Button
              variant="outline"
              className="w-full mt-4 bg-white border-white text-[#4ABABA] hover:bg-gray-100 hover:text-[#4ABABA] text-sm"
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section with Mood Tracker, Creative Tools, and Community Gallery */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Mood Tracker and Creative Tools */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Mood Tracker */}
          <Card className="bg-[#D1E9E9] rounded-md shadow-sm border-0">
            <CardContent className="py-5">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium mb-4 font-serif">
                  How are you feeling today?
                </h3>
                <div className="flex justify-center space-x-8">
                  <MoodButton icon={<Smile size={28} />} label="Happy" />
                  <MoodButton icon={<Meh size={28} />} label="Neutral" />
                  <MoodButton icon={<Heart size={28} />} label="Loved" />
                  <MoodButton icon={<Star size={28} />} label="Excited" />
                  <MoodButton icon={<Frown size={28} />} label="Sad" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creative Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <Card className="bg-[#214B59] text-white rounded-md shadow-sm border-0 flex flex-col">
              <CardContent className="pt-5 pb-5 flex flex-col h-full justify-between">
                <div className="flex items-start">
                  <Palette className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="font-medium font-['Poppins']  text-lg">
                      Express through Art
                    </h3>
                    <p className="text-gray-200 mt-1 text-sm">
                      Let your creativity flow freely
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-auto bg-white border-white text-[#214B59] hover:bg-gray-100 hover:text-[#214B59] text-sm"
                >
                  Open Canvas
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#FF9999] text-white rounded-md shadow-sm border-0 flex flex-col">
              <CardContent className="pt-5 pb-5 flex flex-col h-full justify-between">
                <div className="flex items-start">
                  <FileText className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="font-medium text-lg">Write your Story</h3>
                    <p className="text-gray-100 mt-1 text-sm">
                      Document your journey
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-auto bg-white border-white text-[#FF9999] hover:bg-gray-100 hover:text-[#FF9999] text-sm"
                >
                  Open Journal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Community Gallery */}
        <Card className="md:w-1/3 bg-white rounded-md shadow-sm border-0 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Community Gallery
            </CardTitle>
            <Button variant="link" className="text-[#4ABABA] p-0 text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="grid grid-cols-3 gap-2 h-full">
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
                  alt="Nature"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
                  alt="Mountains"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Underwater"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Plants"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=626&q=80"
                  alt="Ocean"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                  alt="Lake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"
                  alt="Beach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceCard
          icon={<Brain size={22} />}
          title="Meditation"
          description="Find your inner peace"
        />
        <ResourceCard
          icon={<Phone size={22} />}
          title="Emergency Contacts"
          description="24/7 support available"
        />
        <ResourceCard
          icon={<HeartIcon size={22} />}
          title="Self-Care Tips"
          description="Daily wellness practices"
        />
        <ResourceCard
          icon={<PlusSquare size={22} />}
          title="Professional Help"
          description="Connect with experts"
        />
      </div>

      {/* Today's Challenge */}
      <Card className="bg-white rounded-md shadow-sm border-0">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Today's Challenge</h3>
              <p className="text-sm text-gray-700">Draw your mood today</p>
            </div>
            <Button className="bg-[#FF9999] hover:bg-[#ff8080] text-white text-sm">
              Start Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MoodButton = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center group">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md transition-shadow">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </button>
  );
};

const ResourceCard = ({ icon, title, description }) => {
  return (
    <Card className="bg-white rounded-md shadow-sm border-0 hover:shadow-md transition-shadow">
      <CardContent className="pt-5">
        <div className="flex items-center mb-2">
          <div className="mr-3 text-[#4ABABA]">{icon}</div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
