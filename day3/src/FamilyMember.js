import React, { Component } from 'react';
import styles from './FamilyMember.scss';

class FamilyMember extends Component {
  render() {
    const person = this.props.details;
    return (
      <tr className={styles.container} id={person.id}>
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

export default FamilyMember;
