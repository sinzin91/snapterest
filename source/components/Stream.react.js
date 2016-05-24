var React = require('react');
var SnapkiteStreamClient = require('snapkite-stream-client');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');

var Stream = React.createClass({

  // returns the initial state object with a tweet property, set to null
  getInitialState: function () {
    return {
      tweet: null
    }
  },

  // this method is part of React API, and is only called once
  // immediately after React has finished initial rendering of component
  // this is the ideal place to integrate React with another JS library
  componentDidMount: function () {
    // this.handleNewTweet function called for every tweet received
    SnapkiteStreamClient.initializeStream(this.handleNewTweet);
  },

  // this method is called by React just before React unmounts the component
  // in this case, we're ending the SnapkiteStreamClient object
  componentWillUnmount: function () {
    SnapkiteStreamClient.destroyStream();
  },

  // stores current tweet in the component's state
  handleNewTweet: function (tweet) {
    this.setState({
      tweet: tweet
    });
  },

  render: function () {
    var tweet = this.state.tweet;

    if (tweet) {
      return (
        <StreamTweet
        tweet={tweet}
        onAddTweetToCollection={this.props.onAddTweetToCollection} />
      );
    }
    return (
      <Header text="Waiting for public photos from Twitter..." />
    );
  }
})