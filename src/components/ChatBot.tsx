
import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your Resume Assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot thinking...
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('resume') && (lowerMessage.includes('scan') || lowerMessage.includes('optimize'))) {
      return 'To scan your resume, go to the dashboard and upload your resume file. We support PDF and DOCX formats.';
    } else if (lowerMessage.includes('template') || lowerMessage.includes('sample')) {
      return 'Check out our Templates section for sample resumes and cover letters. We have 15+ templates in various styles.';
    } else if (lowerMessage.includes('ats') || lowerMessage.includes('applicant tracking')) {
      return 'Our scanner analyzes your resume against Applicant Tracking Systems (ATS) and provides an optimization score along with suggestions for improvement.';
    } else if (lowerMessage.includes('help')) {
      return 'I can help you with resume scanning, formatting tips, and navigating our site. What specifically do you need assistance with?';
    } else if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
      return 'You can login using the button in the top-right corner of the page. If you don\'t have an account yet, you can register for free.';
    } else {
      return 'I\'m not sure I understand. Could you rephrase your question? I can help with resume scanning, templates, or general site navigation.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-xl z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-brand-blue mr-2" />
              <h3 className="font-medium">Resume Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-grow p-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-brand-lightGray mr-auto' 
                      : 'bg-brand-blue text-white ml-auto'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <Input 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-grow"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <Button 
        onClick={toggleChat} 
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatBot;
