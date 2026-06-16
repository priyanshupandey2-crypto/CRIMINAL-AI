import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import Login from './pages/Login';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Theme set to: DARK');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Theme set to: LIGHT');
    }
  }, [isDark]);

  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <div className="flex flex-col h-screen overflow-hidden text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-100 selection:bg-primary-100 selection:text-primary-900 transition-colors duration-300">
                    <Header isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
                    <div className="flex flex-1 overflow-hidden">
                      <Sidebar />
                      <main className="flex-1 overflow-hidden relative">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/explorer" element={<Explorer />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
