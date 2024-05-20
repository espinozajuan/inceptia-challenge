import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/global';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Login />
        {/* <Dashboard /> */}
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
