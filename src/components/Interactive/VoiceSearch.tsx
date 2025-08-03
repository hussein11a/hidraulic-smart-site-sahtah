import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceSearchProps {
  isDarkMode: boolean;
  onPhoneCall: () => void;
  onWhatsApp: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ isDarkMode, onPhoneCall, onWhatsApp }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      handleVoiceCommand(result);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('اتصال') || lowerCommand.includes('اتصل') || lowerCommand.includes('موبايل')) {
      speak('سأقوم بالاتصال الآن');
      setTimeout(() => onPhoneCall(), 1000);
    } else if (lowerCommand.includes('واتساب') || lowerCommand.includes('رسالة')) {
      speak('سأفتح الواتساب الآن');
      setTimeout(() => onWhatsApp(), 1000);
    } else if (lowerCommand.includes('سطحة') || lowerCommand.includes('نقل')) {
      speak('نحن نقدم خدمة سطحة هيدروليك متاحة على مدار الساعة. هل تريد الاتصال بنا؟');
    } else {
      speak('لم أفهم طلبك. يمكنك قول اتصال أو واتساب أو سطحة');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={cn(
        "p-4 rounded-lg shadow-lg backdrop-blur-sm",
        isDarkMode 
          ? "bg-slate-800/80 border border-slate-700" 
          : "bg-white/80 border border-gray-200"
      )}>
        <div className="flex items-center gap-3">
          <Button
            onClick={isListening ? stopListening : startListening}
            className={cn(
              "relative overflow-hidden transition-all duration-300",
              isListening 
                ? "bg-red-600 hover:bg-red-700 text-white animate-pulse" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            {isListening && (
              <div className="absolute inset-0 bg-red-500 opacity-30 animate-ping"></div>
            )}
          </Button>
          
          <div className="flex flex-col">
            <span className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-gray-200" : "text-gray-700"
            )}>
              {isListening ? 'جاري الاستماع...' : 'البحث الصوتي'}
            </span>
            {transcript && (
              <span className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                "{transcript}"
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => speak('مرحباً بك في موقع سطحة هيدروليك. يمكنك قول اتصال للاتصال بنا أو واتساب لإرسال رسالة')}
            className={cn(
              "hover:bg-blue-100",
              isDarkMode ? "hover:bg-slate-700" : ""
            )}
          >
            <Volume2 size={16} />
          </Button>
        </div>

        <div className={cn(
          "mt-2 text-xs",
          isDarkMode ? "text-gray-400" : "text-gray-500"
        )}>
          قل: "اتصال" أو "واتساب" أو "سطحة"
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;