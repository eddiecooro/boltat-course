import families from './data/families.json';
import React from 'react';
import ReactDOM from 'react-dom';
import FamilyMember from './FamilyMember';
import Timer from './Timer';
import littleBigPlanet from './assets/1.jpg';
import './index.css';

const root = document.getElementById('root');

const myTable = (
  <div>
    <img
      src={littleBigPlanet}
      style={{
        width: '50px',
        height: '50px'
      }}
    />
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
