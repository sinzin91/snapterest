/**
 * TweetList component renders a list of tweets using render().
 */

var React = require('react');
var Tweet = require('./Tweet.react.js');

var listStyle = {
  padding: '0'
};

var listItemStyle = {
  display: 'inline-block',
  listStyle: 'none'
};

var TweetList = React.createClass({

  // this method returns an array
  getListOfTweetIds: function () {
    return Object.keys(this.props.tweets);
  },
  // returns a Tweet element wrapped in <li> element
  getTweetElement: function (tweetId) {
    // create a tweet variable that stores a tweet with an ID provided by tweetId argument
    var tweet = this.props.tweets[tweetId];
    // create variable that stores this.props.onRemoveTweetFromCollection property from parent Collection component
    var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
    var tweetElement;

    // check if this.props.onRemoveTweetFromCollection property is provided
    // if it is, create a Tweet component with an onImageClick property
    if (handleRemoveTweetFromCollection) {
      tweetElement = (
        <Tweet
          tweet={tweet}
          onImageClick={handleRemoveTweetFromCollection} />
      );
    // if not, create a Tweet component without a handleImageClick property
    } else {
      tweetElement = <Tweet tweet={tweet} />;
    }

    // key property is used by React to identify each child element that is created dynamically
    return <li style={listItemStyle} key={tweet.id}>{tweetElement}</li>
  },

  render: function () {
    // create a list of Tweet elements
    var tweetElements = this.getListOfTweetIds().map(this.getTweetElement);

    return (
      <ul style={listStyle}>
        {tweetElements}
      </ul>
    );
  }
});

module.exports = TweetList;