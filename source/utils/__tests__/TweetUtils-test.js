// tell Jest not to mock our TweetUtils module
// do this because Jest automatically mocks modules returned by require()
// Jest would return an imitation of TweetsUtils instead of real one
jest.dontMock('../TweetUtils');

// describe() defines a test suite
describe('Tweet utilities module', function () {

  // it() is a global that define specs for individual tests
  // this spec tests whether getListOfTweetIds() returns an array 
  // of tweet IDs given an object with tweets
  it('returns an array of tweet ids', function() {

    var TweetUtils = require('../TweetUtils');

    // create a mock object that contains empty objects
    var tweetsMock = {
      tweet1: {},
      tweet2: {},
      tweet3: {}
    };
    var expectedListOfTweetIds = [ 'tweet1', 'tweet2', 'tweet3' ];
    // extract the actual tweet IDs from mocked tweets object
    var actualListOfTweetIds = TweetUtils.getListOfTweetIds(tweetsMock);

    // use expect() to create an expectation
    // chain with a matcher function to compare actual value to expected
    expect(actualListOfTweetIds).toEqual(expectedListOfTweetIds);
  });
});