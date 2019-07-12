/*
  createDOMElement('table', {class: 'w3'}, [tr, tr, tr])
*/

export class Component {
  constructor(props) {
    this.props = props;
  }
  state = {};
  setState = function(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
  };
}
Component.__isEddieComponent = true;

export function createElement(tagName, attributes, ...children) {
  children = children.flat(Infinity);
  return {
    __isEddieElement: true,
    type: tagName,
    props: {
      ...attributes,
      children
    }
  };
}
export function createDOMElement(tagName, attributes, ...children) {}

export default {
  createElement
};
