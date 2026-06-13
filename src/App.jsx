import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="flex flex-col h-screen overflow-hidden text-slate-900 bg-white selection:bg-primary-100 selection:text-primary-900">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-hidden relative">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/explorer" element={<Explorer />} />
                {/* Fallback for other routes */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
