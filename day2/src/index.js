import families from './data/families.json';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

class FamilyMember extends Component {
  render() {
    const person = this.props.details;
    return (
      <tr id={person.id}>
        <td>{person.name}</td>
        <td>{person.surName}</td>
        <td>{person.gender}</td>
        <td>{person.age}</td>
        <td>
          {person.marriedTo.map(l => (
            <a href={'#' + l}>{l}</a>
          ))}
        </td>
        <td>
          {person.children.map(l => (
            <a href={'#' + l}>{l}</a>
          ))}
        </td>
      </tr>
    );
  }
}

class Timer extends Component {
  state = {
    timer: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
    console.log('Mounted');
  }
  render() {
    return <p className="timer">{this.state.timer}</p>;
  }
}
const myTable = (
  <div>
    <Timer />
    <table className="w3-table">
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Married To</th>
          <th>Chidlren</th>
        </tr>
        {families.map(p => (
          <FamilyMember details={p} />
        ))}
      </tbody>
    </table>
  </div>
);

ReactDOM.render(myTable, root);
