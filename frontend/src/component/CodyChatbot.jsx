// src/components/CodyChatbot.jsx
import React, { useState } from 'react';
import { FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import '../component/CodyChatbot.css';

const CodyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi there! I\'m Cody, your virtual assistant. How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response (this is where you'd integrate backend logic)
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('admissions') || lowerInput.includes('apply')) {
      return 'You can find detailed information about our admissions process on the Admissions page. Do you have a specific question about the process?';
    }
    if (lowerInput.includes('academics') || lowerInput.includes('curriculum')) {
      return 'Our Academics page provides a full overview of our curriculum, departments, and programs. What subject are you interested in?';
    }
    if (lowerInput.includes('result') || lowerInput.includes('check my grade')) {
      return 'To check your result, please visit the Result Checker Portal and enter your details.';
    }
    if (lowerInput.includes('contact') || lowerInput.includes('support')) {
      return 'You can find our contact information, including phone numbers and email addresses, on the Contact Us page.';
    }
    if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('find you')) {
      return 'Our head campus is located at Off St. Monica\'s Junction, Gen. Hosp. Road, Abor Ogidi, Anambra State. Visit our Contact page for all campus addresses!';
    }
    if (lowerInput.includes('hours') || lowerInput.includes('school day') || lowerInput.includes('open')) {
      return 'Our regular school hours are from 8:00 AM to 3:00 PM, Monday to Friday.';
    }
    if (lowerInput.includes('extracurricular') || lowerInput.includes('clubs') || lowerInput.includes('activities')) {
      return 'We offer a wide range of extracurricular activities, including sports, chess club, debate society, and various art programs.';
    }
    if (lowerInput.includes('mission') || lowerInput.includes('vision') || lowerInput.includes('goal')) {
      return 'Our mission is to provide a holistic education that empowers students with knowledge, critical thinking, and a passion for lifelong learning.';
    }
    
    return 'I\'m sorry, I don\'t understand. For complex issues, please visit our Contact page to reach a human support agent.';
  };

  return (
    <>
      <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
        {isOpen ? <FaTimes /> : <FaComment />}
      </div>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h4>Cody</h4>
            <button onClick={handleToggle}>
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CodyChatbot;