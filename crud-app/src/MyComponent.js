import React, {Component} from "react";
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.any
};

const defaultProps = {
    name: "Default name of app"
};

class MyComponent extends Component {   
   
   

render() {
    const { title, name, onClick } = this.props

  return (
    <div className="component">
        <h1>Title: {title}</h1>
        <h2>Name: {name}</h2>
        <div onClick={onClick}>Click me!</div>
    </div>
  );
}
}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;
