/**
 * This component renders a form to change the collection name
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Button = require('./Button.react');

var inputStyle = {
  marginRight: '5px'
};

var CollectionRenameForm = React.createClass({

  // initial inputValue is the collection's name passed from a parent component
  getInitialState: function() {
    return {
      inputValue: this.props.name
    };
  },

  // updates the component's state with a new input value
  // this update re-renders the <input> element with updated value
  setInputValue: function (inputValue) {
    this.setState({
      inputValue: inputValue
    });
  },

  handleInputValueChange: function (event) {
    // event.target.value property stores a string that a user has typed into input field
    var inputValue = event.target.value;
    // pass that string into setInputValue() method
    this.setInputValue(inputValue);
  },

  // this is called when user clicks the Change button
  // triggers onChangeCollectionName() method of parent component
  handleFormSubmit: function (event) {
    event.preventDefault();

    var collectionName = this.state.inputValue;
    // sets collection name to collectionName
    this.props.onChangeCollectionName(collectionName);
  },

  // this is called when user clicks the Cancel button
  // triggers onCancelCollectionNameChange() method of parent component
  handleFormCancel: function (event) {
    event.preventDefault();

    var collectionName = this.props.name;
    this.setInputValue(collectionName);
    // hides the collection controls
    this.props.onCancelCollectionNameChange();
  },

  // after mounting, we set focus on the input field so user can start editing
  // collection's name right away
  componentDidMount: function () {
    // <input> has ref set to collectionName, which we can call here
    this.refs.collectionName.focus();
  },

  render: function () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>

        <Header text="Collection name:" />

        <div className="form-group">
          <input
            className="form-control"
            style={inputStyle}
            onChange={this.handleInputValueChange}
            value={this.state.inputValue}
            ref="collectionName" />
        </div>

        <Button label="Change" handleClick={this.handleFormSubmit} />
        <Button label="Cancel" handleClick={this.handleFormCancel} />
      </form>
    );
  }
});

module.exports = CollectionRenameForm;