import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! Ask me for movie or show recommendations, or just chat about what you're in the mood for." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await apiClient.post('/ai/chatbot', { message: trimmed });
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.reply }]);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: 'assistant', text: errMsg, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[28rem] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-red-700 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-bold">Movie Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl leading-none">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${
                  msg.role === 'user'
                    ? 'bg-red-700 text-white self-end'
                    : msg.isError
                    ? 'bg-red-900 text-red-200 self-start'
                    : 'bg-gray-800 text-white self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-800 text-gray-400 self-start px-3 py-2 rounded-lg text-sm">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a movie or show..."
              disabled={isLoading}
              className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl hover:bg-red-600"
          aria-label="Open chat assistant"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBotWidget;