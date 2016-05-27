/**
 * This component renders a user interface to control a collection.
 * The user is allowed to:
 *    - rename a collection
 *    - empty a collection
 *    - export a collection
 */

var React = require('react');
var Header = require('./Header.react');
var Button = require('./Button.react');
var CollectionRenameForm = require('./CollectionRenameForm.react');
var CollectionExportForm = require('./CollectionExportForm.react');

// this component can render either collection control elements
// or a form to change the collection name.
// isEditingName is used to toggle b/w the two
var CollectionControls = React.createClass({
  // the default component nae is "new"
  getInitialState: function () {
    return {
      name: 'new',
      isEditingName: false
    };
  },

  // generates a tree of React elements for header based on number of tweets in collection
  getHeaderText: function () {
    // create variable to store number of tweets in collection
    var numberOfTweetsInCollection = this.props.numberOfTweetsInCollection;
    // create text variable and assign it number of tweets in collection
    var text = numberOfTweetsInCollection;

    // concatenate number of tweets 
    if (numberOfTweetsInCollection === 1) {
      text = text + ' tweet in your';
    } else {
      text = text + ' tweets in your';
    }

    return (
      <span>
        {text} <strong>{this.state.name}</strong> collection
      </span>
    );
  },

  // shows or hides the collection's name editing form
  // we call this method when the user clicks on Rename Collection or Cancel
  toggleEditCollectionName: function () {
    this.setState({
      isEditingName: !this.state.isEditingName
    });
  },

  // updates the collection's name, then thides a form to edit collection name
  // we call this method when user submits a new collection name
  setCollectionName: function (name) {
    this.setState({
      name: name,
      isEditingName: false
    });
  },

  render: function () {

    // see if this.state.isEditingName is true
    // if so, CollectionControls component returns CollectionRenameForm component
    if (this.state.isEditingName){
      return (
        <CollectionRenameForm
          name={this.state.name}
          onChangeCollectionName={this.setCollectionName}
          onCancelCollectionNameChange={this.toggleEditCollectionName}/>
      );
    }

    // if CollectionControls component state's this.state.isEditingName is set to false
    // return collection controls
    return (
      <div>

        {/* pass a call to this.getHeaderText() function */}
        <Header text={this.getHeaderText()} />

        <Button
          label="Rename collection"
          handleClick={this.toggleEditCollectionName} />

        <Button
          label="Empty collection"
          handleClick={this.props.onRemoveAllTweetsFromCollection} />

        <CollectionExportForm htmlMarkup={this.props.htmlMarkup} />
      </div>
    );
  }
});

module.exports = CollectionControls;