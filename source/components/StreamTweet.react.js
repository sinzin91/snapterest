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
    // usually triggers render(), but React knows nothing is rendered yet
    this.setState({
      // set this to true since we're going from nothing to one tweet
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    // define a snapterest global object with two properties
    // not needed, but useful to track tweets received and rendered
    // DONT DO THIS IN A REAL PROJECT
    window.snapterest = {
      // set to one because componentWillMount() is called only when first tweet is received
      numberOfReceivedTweets: 1,
      // we know render() will be called for the first tweet, so set to 1
      numberOfDisplayedTweets: 1
    };
  },

  // this method is invoked third, immediately after React inserts a component into DOM
  // updated DOM is now available, so this method is best place for initializing
  // other JS libraries that need DOM access
  componentDidMount: function () {
    console.log('[Snapterest] StreamTweet: 3. Running componentDidMount()');

    // 'this' is the current component, StreamTweet
    // componentDOMRepresentation variable references the DOM tree that we can
    // traverse and access properties of
    var componentDOMRepresentation = ReactDOM.findDOMNode(this);

    // parent <section> element has two child components: <Header /> and <Tweet />
    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  },

  // this method is invoked first in the component lifecycle's updating phase
  // it's called when a component receives new properties from its parent component
  componentWillReceiveProps: function (nextProps) {
    console.log('[Snapterest] StreamTweet: 4. Running componentWillReceiveProps()');

    // get the lengths of the current tweet and the next tweet
    var currentTweetLength = this.props.tweet.text.length;
    var nextTweetLength = nextProps.tweet.text.length;
    // compare the lengths of the current tweet and next tweet
    // result of comparison is stored in isNumberOfCharactersIncreasing variable
    var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
    var headerText;

    // update the component's state
    this.setState({
      numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
    });

    // set our header text
    if (isNumberOfCharactersIncreasing) {
      headerText = 'Number of characters is increasing';
    } else {
      headerText = 'Latest public photo from Twitter';
    }

    // setting the state again will not trigger additional renders of component
    this.setState({
      headerText: headerText
    });

    // since this method is called once for each new tweet that StreamTweet receives
    // this is a good spot to count the total number of received tweets
    window.snapterest.numberOfReceivedTweets++;
  },

  // This method allows us to decide whether the next component's state should
  // trigger the component's re-rendering or not.
  // Returns a boolean value.
  shouldComponentUpdate: function (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 5. Running shouldComponentUpdate()');

    // If the next tweet's length is greater than 1, shouldComponentUpdate()
    // returns true, and StreamTweet component renders the next tweet.
    // If false, StreamTweet component doesn't render the next state.
    return (nextProps.tweet.text.length > 1);
  },

  // This method is called immediatley before React updates the DOM.
  // You cannot use this.setState() in this method.  
  componentWillUpdate: function (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 6. Running componentWillUpdate()');
  },

  // This method is called immediately after React updates the DOM.
  // Use this method to interact with the updated DOM or perform post-rendering operations.
  componentDidUpdate: function (prevProps, prevState) {
    console.log('[Snapterest] StreamTweet: 7. Running componentDidUpdate()');

    // increment number of displayed tweets in global object
    window.snapterest.numberOfDisplayedTweets++;
  },

  // this method is invoked immediately before React removes a component from the DOM and destroys it
  // this method is useful for cleaning up any data that is created during mounting or updating phases
  componentWillUnmount: function () {
    console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()');

    // delete our global window.snapterest object
    delete window.snapterest;
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