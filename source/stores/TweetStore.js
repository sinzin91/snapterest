// import the dependency modules needed by store
// register store with dispatcher
var AppDispatcher = require('../dispatcher/AppDispatcher');
// import EventEmitter class to add/remove event listeners from store
var EventEmitter = require('events').EventEmitter;
// import object-assign module that copies properties from multiple source objects
// to a single target object
var assign = require('object-assign');

// define data that our store manages
// TweetStore manages a simple tweet object that is initially set to null
var tweet = null;

// updates tweet with a receiveTweet object
// private to TweetStore module, inaccessible outside
function setTweet(receivedTweet) {
  tweet = receivedTweet;
}

// emits the change event on the TweetStore object
// private to TweetStore module
function emitChange() {
  TweetStore.emit('change');
}

// create the TweetStore object that will be public
// assign() copies properties owned by EventEmitter.prototype to our store's methods
var TweetStore = assign({}, EventEmitter.prototype, {

  // adds the event listener, which listens to the 'change' event
  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  // removes the 'change' event listener
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  // other parts of app will be able to get tweets, but not set them
  getTweet: function () {
    return tweet;
  }
});

// takes an action object as a parameter and checks its type property
function handleAction(action) {
  // if we received a new tweet, call TweetStore's private setTweet() function
  if (action.type === 'receive_tweet') {
    setTweet(action.tweet);
    // emit 'change' event and trigger all event listeners created by other parts of app
    emitChange();
  }
}

// register TweetStore with a dispatcher
TweetStore.dispatchToken = AppDispatcher.register(handleAction);

// export the TweetStore object
module.exports = TweetStore;