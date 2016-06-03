// import AppDispatcher()
var AppDispatcher = require('../dispatcher/AppDispatcher');

// This function takes tweet object as an arg and creates
// the action object with type set to 'receive_tweet'.
// It also adds the tweet object to our action object, so now
// every store will receive this tweet object.
function receiveTweet(tweet) {

  var action = {
    type: 'receive_tweet',
    tweet: tweet
  };

  // dispatch our action object by calling dispatch() on AppDispatcher object
  // dispatch() method dispatches action object to all stores registered to AppDispatcher
  AppDispatcher.dispatch(action);
}

module.exports = {
  receiveTweet: receiveTweet
};