// // App.js
// import React, { useState, useCallback, useEffect } from 'react';
// import { URL } from './Constant';
// import './App.css';
// import Answers from './Components/Answers';

// const App = () => {
//   const [question, setQuestion] = useState('');
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   // Load saved conversations from localStorage when component mounts
//   useEffect(() => {
//     const savedConversations = localStorage.getItem('chatHistory');
//     if (savedConversations) {
//       setHistory(JSON.parse(savedConversations));
//     }
//   }, []);

//   const formatResponse = useCallback((text) => {
//     return text
//       .split('\n')
//       .filter(line => line.trim().length > 0)
//       .map(line => line.replace(/\*\*/g, '').trim());
//   }, []);

//   const askQuestion = useCallback(async () => {
//     if (!question.trim()) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch(URL, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: question }] }]
//         })
//       });
      
//       if (!response.ok) throw new Error('Request failed');
      
//       const data = await response.json();
//       const responseText = data.candidates[0].content.parts[0].text;
//       const formattedResponse = formatResponse(responseText);

//       const newConversation = [
//         ...conversation,
//         { 
//           type: 'user',
//           content: question 
//         },
//         { 
//           type: 'ai',
//           content: formattedResponse 
//         }
//       ];

//       setConversation(newConversation);
      
//       // Save the new conversation to localStorage
//       const chatHistory = [...history, {
//         question: question,
//         answer: formattedResponse,
//         timestamp: new Date().toLocaleString()
//       }];
      
//       localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
//       setHistory(chatHistory);
      
//       setQuestion('');
//     } catch (error) {
//       console.error('Error:', error);
//       setConversation(prev => [
//         ...prev,
//         { 
//           type: 'user',
//           content: question 
//         },
//         { 
//           type: 'ai',
//           content: ['Error: Could not process request']
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }, [question, formatResponse, conversation, history]);

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') askQuestion();
//   };

//   // Function to load a previous conversation
//   const loadConversation = (index) => {
//     const selectedChat = history[index];
//     const loadedConversation = [
//       { type: 'user', content: selectedChat.question },
//       { type: 'ai', content: selectedChat.answer }
//     ];
//     setConversation(loadedConversation);
//   };

//   return (
//     <div className='flex h-screen bg-zinc-900'>
//       {/* Left Sidebar */}
//       <div className='w-64 bg-zinc-800 p-4 border-r border-zinc-700 overflow-y-auto'>
//         <div className="text-white/70 text-sm mb-6">
//           <h2 className="text-lg font-bold text-white mb-2">AI Assistant</h2>
//           <p>Ask me anything!</p>
//         </div>
        
//         {/* Chat History Section */}
//         <div className="mt-6">
//           <h3 className="text-white font-medium mb-2">Chat History</h3>
//           {history.length === 0 ? (
//             <p className="text-white/50 text-sm">No previous chats</p>
//           ) : (
//             <div className="space-y-2">
//               {history.map((item, index) => (
//                 <div 
//                   key={index} 
//                   className="p-2 bg-zinc-700 rounded cursor-pointer hover:bg-zinc-600"
//                   onClick={() => loadConversation(index)}
//                 >
//                   <p className="text-white text-sm truncate">{item.question}</p>
//                   <p className="text-white/50 text-xs">{item.timestamp}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Rest of your existing code remains the same */}
//       <div className='flex-1 flex flex-col'>
//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {conversation.map((item, index) => (
//             <div key={index} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-3xl p-3 rounded-lg ${
//                 item.type === 'user' 
//                   ? 'bg-blue-600 text-white rounded-tr-none'
//                   : 'bg-[#F2CD5D] text-zinc-900 rounded-tl-none'
//               }`}>
//                 {item.type === 'user' ? (
//                   item.content
//                 ) : (
//                   item.content.map((ans, ansIndex) => (
//                     <Answers key={ansIndex} ans={ans} />
//                   ))
//                 )}
//               </div>
//             </div>
//           ))}
          
//           {loading && (
//             <div className="flex justify-center p-4">
//               <div className="flex space-x-2">
//                 {[...Array(3)].map((_, i) => (
//                   <div 
//                     key={i}
//                     className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
//                     style={{ animationDelay: `${i * 100}ms` }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Input Area */}
//         <div className='p-4 border-t border-zinc-700'>
//           <div className='relative'>
//             <input 
//               type="text" 
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className='w-full p-3 pr-16 rounded-full bg-zinc-800 border border-zinc-700 text-white outline-none'
//               placeholder='Ask me anything...'
//               disabled={loading}
//             />
//             <button 
//               onClick={askQuestion}
//               className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full disabled:opacity-50'
//               disabled={loading || !question.trim()}
//             >
//               {loading ? '...' : 'Ask'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// App.js
import React, { useState, useCallback, useEffect } from 'react';
import { URL } from './Constant';
import './App.css';
import Answers from './Components/Answers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load saved chats on startup
  useEffect(() => {
    const savedConversations = localStorage.getItem('chatHistory');
    if (savedConversations) {
      setHistory(JSON.parse(savedConversations));
    }
  }, []);

  // Format AI response
  const formatResponse = useCallback((text) => {
    return text
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/\*\*/g, '').trim());
  }, []);

  // Ask question to AI
  const askQuestion = useCallback(async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }]
        })
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;
      const formattedResponse = formatResponse(responseText);

      const newConversation = [
        ...conversation,
        { 
          type: 'user',
          content: question 
        },
        { 
          type: 'ai',
          content: formattedResponse 
        }
      ];

      setConversation(newConversation);
      
      // Save to history
      const chatHistory = [...history, {
        question: question,
        answer: formattedResponse,
        timestamp: new Date().toLocaleString()
      }];
      
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
      setHistory(chatHistory);
      
      setQuestion('');
    } catch (error) {
      console.error('Error:', error);
      setConversation(prev => [
        ...prev,
        { 
          type: 'user',
          content: question 
        },
        { 
          type: 'ai',
          content: ['Error: Could not process request']
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [question, formatResponse, conversation, history]);

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') askQuestion();
  };

  // Load chat from history
  const loadConversation = (index) => {
    const selectedChat = history[index];
    const loadedConversation = [
      { type: 'user', content: selectedChat.question },
      { type: 'ai', content: selectedChat.answer }
    ];
    setConversation(loadedConversation);
  };

  // Delete chat from history
  const deleteChat = (index, e) => {
    e.stopPropagation();
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    
    // Clear if deleted chat is currently shown
    if (conversation.length > 0 && 
        conversation[0].content === history[index].question) {
      setConversation([]);
    }
  };

  return (
    <div className='flex h-screen bg-zinc-900'>
      {/* Left Sidebar - Chat History */}
      <div className='w-64 bg-zinc-800 p-4 border-r border-zinc-700 overflow-y-auto'>
        <div className="text-white/70 text-sm mb-6">
          <h2 className="text-lg font-bold text-white mb-2">AI Assistant</h2>
          <p>Ask me anything!</p>
        </div>
        
        {/* Chat History List */}
        <div className="mt-6">
          <h3 className="text-white font-medium mb-2">Chat History</h3>
          {history.length === 0 ? (
            <p className="text-white/50 text-sm">No previous chats</p>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div 
                  key={index} 
                  className="group p-2 bg-zinc-700 rounded cursor-pointer hover:bg-zinc-600 relative"
                  onClick={() => loadConversation(index)}
                >
                  <p className="text-white text-sm truncate pr-5">{item.question}</p>
                  <p className="text-white/50 text-xs">{item.timestamp}</p>
                  <button
                    onClick={(e) => deleteChat(index, e)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete chat"
                  >
                    <FontAwesomeIcon icon={faTrash} size="xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className='flex-1 flex flex-col'>
        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversation.map((item, index) => (
            <div key={index} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl p-3 rounded-lg ${
                item.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#F2CD5D] text-zinc-900 rounded-tl-none'
              }`}>
                {item.type === 'user' ? (
                  item.content
                ) : (
                  item.content.map((ans, ansIndex) => (
                    <Answers key={ansIndex} ans={ans} />
                  ))
                )}
              </div>
            </div>
          ))}
          
          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center p-4">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Input Box */}
        <div className='p-4 border-t border-zinc-700'>
          <div className='relative'>
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full p-3 pr-16 rounded-full bg-zinc-800 border border-zinc-700 text-white outline-none'
              placeholder='Ask me anything...'
              disabled={loading}
            />
            <button 
              onClick={askQuestion}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full disabled:opacity-50'
              disabled={loading || !question.trim()}
            >
              {loading ? '...' : 'Ask'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;