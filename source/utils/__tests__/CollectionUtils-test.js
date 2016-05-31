// tell jest not to mock by default
jest.autoMockOff();

describe('Collection utilities module', function () {

  var CollectionUtils = require('../CollectionUtils');

  // imitate collection of three objects
  var collectionTweetsMock = {
    collectionTweet7: {},
    collectionTweet8: {},
    collectionTweet9: {}
  };

  // test whether the CollectionUtils module returns a number of tweets in collection
  it('returns a number of tweets in collection', 
    function getNumberOfTweetsInCollection() {
    
    var actualNumberOfTweetsInCollection = CollectionUtils.getNumberOfTweetsInCollection(collectionTweetsMock);
    var expectedNumberOfTweetsInCollection = 3;

    expect(actualNumberOfTweetsInCollection).toBe(expectedNumberOfTweetsInCollection);
  });

  it('checks if collection is not empty', function isNotEmptyCollection() {

    var actualNumberOfTweetsInCollection = CollectionUtils.isEmptyCollection(collectionTweetsMock);

    expect(actualNumberOfTweetsInCollection).toBeDefined();
    expect(actualNumberOfTweetsInCollection).toBe(false);
    // .not() inverses the next comparison
    expect(actualNumberOfTweetsInCollection).not.toBe(true);
  });
});