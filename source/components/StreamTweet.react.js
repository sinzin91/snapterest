var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({

  // this method is invoked first, before React inserts a component into DOM
  // use this method to return initial component's state
  getInitialState: function () {
    // log message that function is being invoked in browser console
    console.log('[Snapterest] StreamTweet: 1. Running getInitialState()');

    return {
      numberOfCharactersIsIncreasing: null,
      headerText: null
    };
  },

  // this method is invoked second, immediately before React inserts component into DOM
  componentWillMount: function () {
    console.log('[Snapterest] StreamTweet: 2. Running componentWillMount()');

    // update the component's state
    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    window.snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    };
  },

  render: function () {
    console.log('[Snapterest] StreamTweet: Running render()');

    return(
      <section>
        <Header text={this.state.headerText} />
        <Tweet
          tweet={this.props.tweet}
          onImageClick={this.props.onAddTweetToCollection} />
      </section>
    );
  }
});

module.exports = StreamTweet;