import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';

// function Div({ children, ...props }) {
//   return <div {...props}>{children}</div>;
// }

function App() {
  return (
    <div className="App">
      <Timer step={1} initialValue={5} startOnMount={true} />
    </div>
  );
}

export default App;
