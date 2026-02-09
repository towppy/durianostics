import React, { useState, useRef, useEffect } from 'react';
import { API_URL } from '../appconf';
import '../../styles/Chatbot.css';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

let messageId = 0;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Typewriter greeting at the start
  useEffect(() => {
    const greeting = 'Hello! I am your Durian AI Assistant 🍈 How can I help you today?';
    let index = 0;

    const typeGreeting = () => {
      if (index <= greeting.length) {
        setMessages([{ id: messageId++, sender: 'bot', text: greeting.slice(0, index) }]);
        index++;
        setTimeout(typeGreeting, 40); // speed of typing
      }
    };

    typeGreeting();
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: messageId++, sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chatbot/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a Durian Diagnostics AI Assistant.' },
            ...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: 'user', content: input }
          ]
        })
      });

      const data = await res.json();
      const botMessage: Message = {
        id: messageId++,
        sender: 'bot',
        text: data.message || data.answer || data.reply || 'No response'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const botMessage: Message = {
        id: messageId++,
        sender: 'bot',
        text: 'Error: Could not reach server.'
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-page">
      <main className="chatbot-main">
        <div className="chat-window">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
