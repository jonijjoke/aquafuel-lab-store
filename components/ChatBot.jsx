'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    const userMessage = { id: Date.now(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data);
      }
      const cleanedData = data.replace(/^\d+:"/g, '').replace(/"$/g, '').replace(/\\n/g, '\n');
      
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: cleanedData }]);
    
    } catch (err) {
      let errorMessage = "Hups, yhteys pätkii.";

      if (err.message.includes("liian pitkä") || err.message.includes("Liikaa pyyntöjä")) {
        errorMessage = err.message.replace(/"/g, '');
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Tyylit
  const styles = {
    container: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99999,
      fontFamily: 'sans-serif',
    },
    button: {
      width: '64px',
      height: '64px',
      backgroundColor: '#0066FF',
      borderRadius: '50%',
      boxShadow: '0 8px 30px rgba(0,102,255,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '30px',
      border: 'none',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    },
    window: {
      width: '350px', 
      maxWidth: '90vw',
      height: '550px',
      maxHeight: '80vh',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid #e5e7eb',
    },
    header: {
      padding: '20px',
      backgroundColor: '#0066FF',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    messageList: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    messageBubble: (role) => ({
      padding: '12px 16px',
      borderRadius: '16px',
      maxWidth: '85%',
      fontSize: '14px',
      lineHeight: '1.5',
      backgroundColor: role === 'user' ? '#0066FF' : 'white',
      color: role === 'user' ? 'white' : '#333',
      border: role === 'user' ? 'none' : '1px solid #e5e7eb',
      alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
      borderTopRightRadius: role === 'user' ? '0' : '16px',
      borderTopLeftRadius: role === 'user' ? '16px' : '0',
    }),
    form: {
      padding: '15px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: 'white',
      display: 'flex',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '12px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#f3f4f6',
      outline: 'none',
      fontSize: '14px',
      color: '#000',
    },
    sendButton: {
      backgroundColor: '#0066FF',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0 20px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          style={styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          💬
        </button>
      ) : (
        <div style={styles.window}>
          
          <div style={styles.header}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>AquaFuel AI Asiakaspalvelija</h3>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.9, textTransform: 'uppercase', marginTop: '4px' }}>Online</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

         
          <div ref={scrollRef} style={styles.messageList}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '40px', color: '#9ca3af' }}>
                <p style={{ fontStyle: 'italic', fontSize: '14px' }}>Hei! Miten voin auttaa?</p>
              </div>
            )}
            
            {messages.map((m) => (
              <div key={m.id} style={styles.messageBubble(m.role)}>
                {m.content}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', marginLeft: '10px', fontSize: '12px', color: '#0066FF' }}>
                AquaFuel kirjoittaa...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} style={styles.form}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Kirjoita viesti..."
              style={styles.input}
            />
            <button 
              type="submit" 
              disabled={isLoading || !text.trim()} 
              style={{...styles.sendButton, opacity: isLoading || !text.trim() ? 0.5 : 1}}
            >
              Lähetä
            </button>
          </form>
        </div>
      )}
    </div>
  );
}