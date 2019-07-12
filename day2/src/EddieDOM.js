function renderEddieElement(eddieElement) {
  eddieElement.type;
  if (eddieElement.type.__isEddieComponent) {
    const createdEddieElement = new eddieElement.type(eddieElement.props);
    createdEddieElement.props = eddieElement.props;
    const renderedEddieElement = renderEddieElement(
      createdEddieElement.render()
    );
    if (typeof createdEddieElement.componentDidMount === 'function') {
      createdEddieElement.componentDidMount();
    }
    return renderedEddieElement;
  } else if (typeof eddieElement.type === 'function') {
    return renderEddieElement(eddieElement.type(eddieElement.props));
  } else {
    const element = document.createElement(eddieElement.type);
    Object.entries(eddieElement.props).forEach(([name, value]) => {
      if (name === 'children') {
        const children = value.flat(Infinity);
        children.forEach(child => {
          if (child.__isEddieElement) {
            element.appendChild(renderEddieElement(child));
          } else {
            const textChild = document.createTextNode(child);
            element.appendChild(textChild);
          }
        });
      } else {
        element.setAttribute(name, value);
      }
    });
    return element;
  }
}

export function render(eddieElement, root) {
  // if (globalRoot) {
  //   root.innerHtml = '';
  //   let updatedEddieElement = updatedEddieElement(prevRendered, eddieElement);
  //   prevRendered = updatedEddieElement;
  //   root.appendChild(updatedEddieElement);
  // } else {
  let renderedEddieElement = renderEddieElement(eddieElement);
  root.appendChild(renderedEddieElement);
  // }
}

export default {
  render
};
