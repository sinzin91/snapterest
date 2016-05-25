var React = require('react');

var headerStyle = {
  fontSize: '16px',
  fontWeight: '300',
  display: 'inline-block',
  margin: '20px 10px'
};

var Header = React.createClass({

  // this method sets the default title text in case there is no text from parent
  // this will get overwritten if a parent component passes this.props.text
  getDefaultProps: function () {
    return {
      text: 'Default header'
    };
  },

  render: function() {
    return (
      // header text is passed from a parent component as this.props.text
      <h2 style={headerStyle}>{this.props.text}</h2>
    );
  }
});

module.exports = Header;