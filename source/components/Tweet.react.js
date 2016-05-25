var React = require('react');

var tweetStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '300px',
  height: '400px',
  margin: '10px'
};

var imageStyle = {
  maxHeight: '400px',
  boxShadow: '0px 1px 1px 0px #aaa',
  border: '1px solid #fff'
};

var Tweet = React.createClass({

  // You can validate the component properties using the component's
  // propTypes object:
  propTypes: {

    // Specify a property name and a validator function that will determine
    // whether a property is valid or not
    tweet: function(properties, propertyName, componentName) {

      // check whether Tweet component received tweet property
      var tweet = properties[propertyName];

      if (!tweet) {
        return new Error('Tweet must be set.');
      }

      // check whether tweet object has no media property
      if (!tweet.media) {
        return new Error('Tweet must have an image.');
      }
    },

    // validate that the value of onImageClick property is a function
    onImageClick: React.PropTypes.func
  },

  // event handler for when a user clicks on a tweet's image
  handleImageClick: function () {
    var tweet = this.props.tweet;
    var onImageClick = this.props.onImageClick;

    if (onImageClick) {
      onImageClick(tweet);
    }
  },

  render: function () {
    var tweet = this.props.tweet;
    var tweetMediaUrl = tweet.media[0].url;

    return (
      <div style={tweetStyle}>
        <img src={tweetMediaUrl} onClick={this.handleImageClick}
        style={imageStyle} />
      </div>
    );
  }
});

module.exports = Tweet;