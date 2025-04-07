import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Send,
  Clock,
  History,
  User,
  Paperclip,
  Mic,
  Bot,
  Edit,
} from "lucide-react";
// Update the import to use @google/genai instead of @google/generative-ai
import { GoogleGenAI } from "@google/genai";

const MosaAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "mosa",
      text: "Hi there! I'm Mosa, your creative companion. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const aiClientRef = useRef(null);

  // Initialize Google GenAI
  useEffect(() => {
    const initializeGoogleAI = async () => {
      try {
        const apiKey = "AIzaSyCx6r3IAMfSGtcENirdrsmqG4WMCAAuvo4"; 
        const ai = new GoogleGenAI({ apiKey });
        aiClientRef.current = ai;
      } catch (error) {
        console.error("Error initializing Google AI:", error);
      }
    };

    initializeGoogleAI();
  }, []);

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
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;

    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Send message to Google AI
      if (aiClientRef.current) {
        const systemPrompt = `You are Mosa, an empathetic AI companion focused on mental wellbeing and creative expression. Your goal is to help users process their emotions, provide supportive feedback, and suggest creative activities.

When responding to users, follow this structure:

1. **Emotional Acknowledgment**:
   - Acknowledge the user's current emotional state
   - Show empathy and understanding

2. **Supportive Feedback**:
   - Provide a thoughtful response to what they've shared
   - Validate their feelings without judgment

3. **Creative Suggestion**:
   - Offer 1-2 specific activities that might help with their current mood
   - Keep suggestions brief, practical, and easy to implement

Format your response in this exact structure:
**Acknowledgment:** [Your acknowledgment of their feelings]
**Feedback:** [Your supportive response]
**Suggestion:** [Your creative activity suggestion]

Keep your tone warm, conversational, and supportive. Avoid clinical language. Limit your total response to 3-4 sentences per section.

USER INPUT: ${inputMessage}`;

        const response = await aiClientRef.current.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            { text: systemPrompt }
          ],
          generationConfig: {
            temperature: 2,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
          },
        });

        const responseText = response.text;
        
        // Format the response text to look better
        const formattedResponse = formatAIResponse(responseText);

        const aiResponse = {
          id: messages.length + 2,
          sender: "mosa",
          text: formattedResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiResponse]);
      } else {
        // Fallback if AI client isn't initialized
        const aiResponse = {
          id: messages.length + 2,
          sender: "mosa",
          text: "I'm having trouble connecting to my brain right now. Please try again later!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error("Error sending message to Google AI:", error);

      // Error message
      const errorResponse = {
        id: messages.length + 2,
        sender: "mosa",
        text: "I'm sorry, I encountered an error processing your message. Please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle mood selection
  const handleMoodSelect = async (mood) => {
    if (isLoading) return;

    const moodMessage = `I'm feeling ${mood.toLowerCase()} right now.`;
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: moodMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Send mood to Google AI
      if (aiClientRef.current) {
        const systemPrompt = `You are Mosa, an empathetic AI companion focused on mental wellbeing and creative expression. Your goal is to help users process their emotions, provide supportive feedback, and suggest creative activities.

When responding to users, follow this structure:

1. **Emotional Acknowledgment**:
   - Acknowledge the user's current emotional state
   - Show empathy and understanding

2. **Supportive Feedback**:
   - Provide a thoughtful response to what they've shared
   - Validate their feelings without judgment

3. **Creative Suggestion**:
   - Offer 1-2 specific activities that might help with their current mood
   - Keep suggestions brief, practical, and easy to implement

Format your response in this exact structure:
**Acknowledgment:** [Your acknowledgment of their feelings]
**Feedback:** [Your supportive response]
**Suggestion:** [Your creative activity suggestion]

Keep your tone warm, conversational, and supportive. Avoid clinical language. Limit your total response to 3-4 sentences per section.

USER INPUT: ${moodMessage}`;

        const response = await aiClientRef.current.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            { text: systemPrompt }
          ],
          generationConfig: {
            temperature: 2,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
          },
        });

        const responseText = response.text;
        
        // Format the response text to look better
        const formattedResponse = formatAIResponse(responseText);

        const aiResponse = {
          id: messages.length + 2,
          sender: "mosa",
          text: formattedResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiResponse]);
      } else {
        // Simple error message if AI client isn't initialized
        const aiResponse = {
          id: messages.length + 2,
          sender: "mosa",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error("Error sending mood to Google AI:", error);

      // Error message
      const errorResponse = {
        id: messages.length + 2,
        sender: "mosa",
        text: "I'm sorry, I encountered an error processing your mood. Please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper function to format AI responses with beautiful styling
  const formatAIResponse = (text) => {
    return text
      .replace(/\*\*Acknowledgment:\*\*/g, '<span class="text-[#FFD700] font-bold text-lg">Acknowledgment:</span>')
      .replace(/\*\*Feedback:\*\*/g, '<span class="text-[#98FB98] font-bold text-lg mt-3 block">Feedback:</span>')
      .replace(/\*\*Suggestion:\*\*/g, '<span class="text-[#87CEFA] font-bold text-lg mt-3 block">Suggestion:</span>');
  };

  return (
    <div className="h-full">
      <div className="bg-[#4ABABA] rounded-t-xl shadow-sm overflow-hidden">
        {/* Chat header with icons - using primary color background */}
        <div className="flex justify-between items-center p-5 border-b border-[#4ABABA]/20">
          <h2 className="text-3xl font-bold text-white font-['Lora']">
            Mosa AI
          </h2>
          <div className="flex gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-12 w-12"
            >
              <Edit size={28} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-12 w-12"
            >
              <History size={28} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-12 w-12"
            >
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
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "mosa" && (
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <Avatar className="bg-[#214B59] h-14 w-14 mt-1">
                    <AvatarImage src="/images/mosa-avatar.png" alt="Mosa AI" />
                    <AvatarFallback className="bg-[#214B59] text-white">
                      <Bot size={28} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-br from-[#214B59] to-[#1a3a45] text-white p-5 rounded-2xl rounded-tl-none shadow-md">
                    <p 
                      className="text-base leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: message.text }}
                    ></p>
                    <span className="text-xs text-gray-300 mt-3 block">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              )}

              {message.sender === "user" && (
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="bg-gradient-to-br from-[#FF9999] to-[#ff7575] text-white p-5 rounded-2xl rounded-tr-none shadow-md">
                    <p className="text-base leading-relaxed">{message.text}</p>
                    <span className="text-xs text-gray-100 mt-3 block">
                      {message.timestamp}
                    </span>
                  </div>
                  <Avatar className="bg-[#FF9999] h-14 w-14 mt-1 shadow-sm">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback className="bg-[#FF9999] text-white">
                      SM
                    </AvatarFallback>
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
                  className="bg-gradient-to-r from-[#FF9999] to-[#ff7575] hover:from-[#ff7575] hover:to-[#FF9999] text-white px-6 py-3 rounded-full flex items-center gap-2 h-auto shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  disabled={isLoading}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span>{mood.text}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Enhanced loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <Avatar className="bg-[#214B59] h-14 w-14 mt-1">
                  <AvatarFallback className="bg-[#214B59] text-white">
                    <Bot size={28} />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gradient-to-br from-[#214B59] to-[#1a3a45] text-white p-5 rounded-2xl rounded-tl-none shadow-md">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }}></div>
                      <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "200ms", animationDuration: "1s" }}></div>
                      <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "400ms", animationDuration: "1s" }}></div>
                    </div>
                    <span className="text-sm text-gray-300 mt-2 animate-pulse">Mosa is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input area - improved with attachment and voice buttons */}
      <div className="p-5 border-t border-gray-100 bg-white rounded-b-xl">
        <div className="flex items-center space-x-4 mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-[#4ABABA] h-14 w-14 flex-shrink-0 transition-colors duration-300"
          >
            <Paperclip size={24} />
          </Button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full p-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4ABABA]/50 pr-14 text-base shadow-sm transition-all duration-300"
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4ABABA] p-2 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
              </svg>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-[#4ABABA] h-14 w-14 flex-shrink-0 transition-colors duration-300"
          >
            <Mic size={24} />
          </Button>

          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-[#4ABABA] to-[#3a9999] hover:from-[#3a9999] hover:to-[#4ABABA] text-white rounded-full p-4 h-14 w-14 flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            disabled={isLoading || inputMessage.trim() === ""}
          >
            <Send size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MosaAI;
