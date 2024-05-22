import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/global';
import Home from './pages/Home';
import Login from './components/Login/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
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
