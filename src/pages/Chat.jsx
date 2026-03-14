import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SailMark } from '../components/ui/SailMark';

const PENNY_INITIAL = "Hi — I'm Penny. Before we go anywhere, I want you to know this is your space. There's no right way to show up here. What's on your mind today?";

export function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: PENNY_INITIAL },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    inputRef.current?.focus();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userMemory: null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: err.message || 'Something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sage-bg">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-4 md:px-6 border-b border-sage-dark/8 bg-sage-bg-card">
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <SailMark size={24} />
          <span className="font-display italic font-normal text-sage-dark text-[0.85rem] tracking-[0.02em]">
            TACK
          </span>
        </Link>
        <span className="text-sage-text-light text-[0.8rem]">Chat with Penny</span>
      </header>

      {/* Message thread */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 pb-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <span className="block text-sage-text-light text-[0.75rem] font-medium mb-1.5 ml-1">
                    Penny
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[#1B3A52] text-white'
                      : 'bg-white border border-sage-dark/10 text-sage-dark'
                  }`}
                >
                  <p className="text-[0.95rem] leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] md:max-w-[75%]">
                <span className="block text-sage-text-light text-[0.75rem] font-medium mb-1.5 ml-1">
                  Penny
                </span>
                <div className="rounded-2xl px-4 py-3 bg-white border border-sage-dark/10">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sage-text-light animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-sage-text-light animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-sage-text-light animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-4 py-4 md:px-6 pb-6 pt-2 bg-sage-bg border-t border-sage-dark/8">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 min-h-[48px] px-4 py-3 rounded-xl border border-sage-dark/15 bg-white text-sage-dark placeholder:text-sage-text-light text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-sage-cta focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 min-h-[48px] px-6 py-3 rounded-xl font-medium bg-sage-cta text-sage-bg hover:bg-sage-cta-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sage-cta transition-colors focus:outline-none focus:ring-2 focus:ring-sage-cta focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
