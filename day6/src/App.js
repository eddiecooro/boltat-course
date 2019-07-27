import React, { Component, PureComponent } from 'react';
import './App.css';
import TodoList from './components/Todo';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}
class GrandChild extends Component {
  componentDidMount() {
    console.log('GC Mounted');
  }
  componentDidUpdate() {
    console.log('GC Updated');
  }
  render() {
    return <p>GrandChild</p>;
  }
}
class Child extends Component {
  componentDidMount() {
    console.log('C Mounted');
  }
  componentDidUpdate() {
    console.log('C Updated');
  }
  render() {
    return (
      <>
        <GrandChild />
        <p>Child</p>
      </>
    );
  }
}

// function App() {
//   const [interval, _setInterval] = React.useState(0);
//   React.useEffect(() => {
//     setInterval(() => _setInterval(i => i + 1), 1000);
//   }, []);

//   return (
//     <div className="App">
//       <Child interval={interval} />
//     </div>
//   );
// }

export default App;
