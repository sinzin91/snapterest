/**
 *  This is a test for the Header component.
 */

// tell Jest not to mock the Header component
jest.dontMock('../Header.react');

describe('Header component', function () {

  // this spec tests whether Header component renders the provided header text
  it('renders provided header text', function() {

    // import React and ReactDOM
    var React = require('react');
    var ReactDOM = require('react-dom');
    // import React add-on to test React components
    var TestUtils = require('react-addons-test-utils');
    // import Header component to be able to test it
    var Header = require('../Header.react');

    // render Header component to the DOM
    // renderIntoDocument() renders a component into a detached DOM node in document
    var header = TestUtils.renderIntoDocument(
      <Header text="Testing..." />
    );

    // use findDOMNode() to find a component's DOM node, then find textContent
    var actualHeaderText = ReactDOM.findDOMNode(header).textContent;

    // create an expectation and match with expected test
    expect(actualHeaderText).toBe('Testing...');

    // now test what happens when Header is rendered without text
    var defaultHeader = TestUtils.renderIntoDocument(
      <Header />
    );

    var actualDefaultHeaderText = ReactDOM.findDOMNode(defaultHeader).textContent;

    expect(actualDefaultHeaderText).toBe('Default header');
  });
});