import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isDarkMode: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('سطحة') || input.includes('نقل')) {
      return 'نقدم خدمة سطحة هيدروليك متاحة 24/7. يمكننا نقل سيارتك بأمان وسرعة. هل تحتاج المساعدة الآن؟';
    }
    if (input.includes('سعر') || input.includes('تكلفة')) {
      return 'أسعارنا تنافسية وتعتمد على المسافة ونوع الخدمة. اتصل بنا على +966503269219 للحصول على عرض سعر دقيق.';
    }
    if (input.includes('وقت') || input.includes('سرعة')) {
      return 'نصل إليك في أسرع وقت ممكن، عادة خلال 15-30 دقيقة حسب موقعك. نحن متاحون 24 ساعة يومياً.';
    }
    if (input.includes('موقع') || input.includes('منطقة')) {
      return 'نخدم جميع مناطق المملكة العربية السعودية. أينما كنت، سنصل إليك.';
    }
    
    return 'شكراً لسؤالك. للحصول على مساعدة فورية، يرجى الاتصال بنا على +966503269219 أو راسلنا عبر الواتساب.';
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-20 left-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            isDarkMode 
              ? "bg-blue-600 hover:bg-blue-500 text-white" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          )}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={cn(
          "fixed bottom-36 left-4 w-80 h-96 rounded-xl shadow-2xl transition-all duration-300 z-50",
          isDarkMode 
            ? "bg-slate-800 border border-slate-700" 
            : "bg-white border border-gray-200"
        )}>
          {/* Header */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-t-xl",
            isDarkMode ? "bg-slate-700" : "bg-blue-600 text-white"
          )}>
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">المساعد الذكي</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.isBot ? "justify-start" : "justify-end"
                )}
              >
                {message.isBot && (
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    isDarkMode ? "bg-blue-600" : "bg-blue-500"
                  )}>
                    <Bot size={12} className="text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-xs px-3 py-2 rounded-lg text-sm",
                    message.isBot
                      ? isDarkMode 
                        ? "bg-slate-700 text-gray-200" 
                        : "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  )}
                >
                  {message.content}
                </div>

                {!message.isBot && (
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    "bg-green-600"
                  )}>
                    <User size={12} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                )}>
                  <Bot size={12} className="text-white" />
                </div>
                <div className={cn(
                  "px-3 py-2 rounded-lg",
                  isDarkMode ? "bg-slate-700" : "bg-gray-100"
                )}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={cn(
            "p-4 border-t",
            isDarkMode ? "border-slate-700" : "border-gray-200"
          )}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اكتب رسالتك..."
                className={cn(
                  "flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  isDarkMode 
                    ? "bg-slate-700 text-white placeholder-gray-400" 
                    : "bg-gray-100 text-gray-800 placeholder-gray-500"
                )}
                dir="rtl"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;