import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/global';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <GlobalStyle />
      {isAuthenticated ? <Home /> : <Login />}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
