var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');

var Collection = React.createClass({

  // creates a string that represents HTML markup created by TweetList component
  createHtmlMarkupStringOfTweetList: function () {
    // use ReactDOMServer to render TweetList as html
    var htmlString = ReactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.props.tweets} />
    );

    // the rendered htmlString is stored in htmlMarkup object
    var htmlMarkup = {
      html: htmlString
    };

    // use JSON.stringify to convert htmlMarkup object to a JSON string and return
    return JSON.stringify(htmlMarkup);
  },

  // get a list of tweet IDs, returns an array of tweet IDs
  getListOfTweetIds: function () {
    return Object.keys(this.props.tweets);
  },

  // get a number of tweets in the collection, returns length of array
  getNumberOfTweetsInCollection: function () {
    return this.getListOfTweetIds().length;
  },

  render: function () {
    var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();

    if (numberOfTweetsInCollection > 0) {

      // references tweets property passed from parent component
      var tweets = this.props.tweets;
      var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
      var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
      var handleRemoveTweetFromCollection = this.props.onRemoveAllTweetsFromCollection;

      return (
        <div>

          {/* this component renders a header with collection name and set of buttons */}
          <CollectionControls
            numberOfTweetsInCollection={numberOfTweetsInCollection}
            htmlMarkup={htmlMarkup}
            onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection} />

          {/* renders a list of tweets */}
          <TweetList
            tweets={tweets}
            onRemoveAllTweetsFromCollection={handleRemoveTweetFromCollection} />

        </div>
      );
    }

    // Header is rendered if tweets collection is empty
    return <Header text="Your collection is empty" />
  }
});

module.exports = Collection;