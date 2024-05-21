import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/global';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if token exists in localStorage
    return !!localStorage.getItem('token');
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <GlobalStyle />
      {isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
