import React from 'react';
import PropTypes from 'prop-types'; // ES6


const App = ({ text }) => <div>{text} aa</div>;

App.propTypes = {
  text: PropTypes.string
};
App.defaultProps = {
  text: ''
};

export default App;
