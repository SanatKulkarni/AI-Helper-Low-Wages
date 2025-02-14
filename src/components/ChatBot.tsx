import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, X, MinusSquare, Maximize2, Send } from 'lucide-react';
import { getChatResponse } from '../lib/gemini';

interface Message {
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI financial assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognition.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (!recognition.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed right-4 bottom-4 w-80 bg-white rounded-lg shadow-xl transition-all ${
      isMinimized ? 'h-12' : 'h-[500px]'
    }`}>
      <div className="flex items-center justify-between p-3 border-b bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-semibold">Financial Assistant</h3>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-blue-200">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <MinusSquare className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[400px] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-100">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about finance..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-lg ${
                  isListening
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-80`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}