import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Clock, History, User, Paperclip, Mic, Bot, Edit } from "lucide-react";

const MosaAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "mosa",
      text: "Hi there! I'm Mosa, your creative companion. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  // Mood options with emojis
  const moodOptions = [
    { emoji: "😊", text: "Happy" },
    { emoji: "😔", text: "Sad" },
    { emoji: "😌", text: "Calm" },
    { emoji: "😰", text: "Stressed" },
    { emoji: "😎", text: "Excited" },
    { emoji: "😴", text: "Tired" },
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    
    // Simulate AI response (this would be replaced with actual Gemini API call)
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "mosa",
        text: "Sorry you're stressed! Want to try something easy? How about drawing a little picture or listening to calm music? What do you think?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: `I'm super ${mood.toLowerCase()} right now.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newUserMessage]);
    
    // Simulate AI response based on mood (this would be replaced with actual Gemini API call)
    setTimeout(() => {
      let responseText = "";
      
      switch(mood.toLowerCase()) {
        case "happy":
          responseText = "That's wonderful to hear! Would you like to channel that positive energy into a creative activity?";
          break;
        case "sad":
          responseText = "I'm sorry to hear that. Would you like to talk about what's making you feel sad, or perhaps try an activity to lift your spirits?";
          break;
        case "calm":
          responseText = "It's great that you're feeling calm. Would you like to maintain this state with some mindful activities?";
          break;
        case "stressed":
          responseText = "Sorry you're stressed! Want to try something easy? How about drawing a little picture or listening to calm music? What do you think?";
          break;
        case "excited":
          responseText = "That's fantastic! What are you excited about? Would you like to channel that energy into something creative?";
          break;
        case "tired":
          responseText = "I understand. Would you like some gentle, low-energy activities that might help you relax?";
          break;
        default:
          responseText = "Thank you for sharing. How can I help you today?";
      }
      
      const aiResponse = {
        id: messages.length + 2,
        sender: "mosa",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full">
      <div className="bg-[#4ABABA] rounded-t-xl shadow-sm overflow-hidden">
        {/* Chat header with icons - using primary color background */}
        <div className="flex justify-between items-center p-5 border-b border-[#4ABABA]/20">
          <h2 className="text-3xl font-bold text-white font-['Lora']">Mosa AI</h2>
          <div className="flex gap-6">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-12 w-12">
              <Edit size={28} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-12 w-12">
              <History size={28} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-12 w-12">
              <User size={28} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chat messages area */}
      <div className="p-6 h-[550px] overflow-y-auto bg-white rounded-b-xl shadow-sm">
        <div className="flex flex-col space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "mosa" && (
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <Avatar className="bg-[#214B59] h-14 w-14 mt-1">
                    <AvatarImage src="/images/mosa-avatar.png" alt="Mosa AI" />
                    <AvatarFallback className="bg-[#214B59] text-white">
                      <Bot size={28} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-[#214B59] text-white p-4 rounded-2xl rounded-tl-none">
                    <p className="text-base">{message.text}</p>
                    <span className="text-xs text-gray-300 mt-2 block">{message.timestamp}</span>
                  </div>
                </div>
              )}
              
              {message.sender === "user" && (
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="bg-[#FF9999] text-white p-4 rounded-2xl rounded-tr-none">
                    <p className="text-base">{message.text}</p>
                    <span className="text-xs text-gray-100 mt-2 block">{message.timestamp}</span>
                  </div>
                  <Avatar className="bg-[#FF9999] h-14 w-14 mt-1">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback className="bg-[#FF9999] text-white">SM</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          ))}
          
          {/* Show mood options after first message if no other messages */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {moodOptions.map((mood, index) => (
                <Button
                  key={index}
                  onClick={() => handleMoodSelect(mood.text)}
                  className="bg-[#FF9999]/80 hover:bg-[#FF9999] text-white px-6 py-3 rounded-full flex items-center gap-2 h-auto"
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span>{mood.text}</span>
                </Button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input area - improved with attachment and voice buttons */}
      <div className="p-5 border-t border-gray-100 bg-white rounded-b-xl">
        <div className="flex items-center space-x-4 mx-auto">
          <Button variant="ghost" size="icon" className="text-gray-400 h-14 w-14 flex-shrink-0">
            <Paperclip size={24} />
          </Button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full p-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4ABABA]/50 pr-14 text-base"
            />
            <Button 
              variant="ghost"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
              </svg>
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="text-gray-400 h-14 w-14 flex-shrink-0">
            <Mic size={24} />
          </Button>
          
          <Button 
            onClick={handleSendMessage}
            className="bg-[#4ABABA] hover:bg-[#4ABABA]/90 text-white rounded-full p-4 h-14 w-14 flex items-center justify-center flex-shrink-0"
          >
            <Send size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MosaAI;