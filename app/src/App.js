import React from 'react';
import Login from './components/common/Login';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <div className="app">
      <ContextProvider>
        <Login />
      </ContextProvider>
    </div>

  );
}

export default App;
