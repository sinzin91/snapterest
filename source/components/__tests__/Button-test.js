/**
 *  This is a test for the Button component.
 *  Checks whether it triggers the event handler function when clicked.
 */

jest.dontMock('../Button.react');

describe('Button component', function () {
  it('calls handler function on click', function() {

    // import React, add-ons module, and Button component
    var React = require('react');
    var TestUtils = require('react-addons-test-utils');
    var Button = require('../Button.react');

    // generate a mock function
    // jest.genMockFunction() returns newly generated Jest mock function
    var handleClick = jest.genMockFunction();

    // render an instance of Button component to the DOM
    // this Button component receives our mock handleClick function as a property
    var button = TestUtils.renderIntoDocument(
      <Button handleClick={handleClick} />
    );

    // find the Button component instance rendered to the DOM
    var buttonInstance = TestUtils.findRenderedDOMComponentWithTag(button, 'button');

    // simulate a click on that component
    TestUtils.Simulate.click(buttonInstance);

    // expect our handleClick mock function to be called atleast once
    expect(handleClick).toBeCalled();

    // look at handleClick mock function's .mock property tells us how many times handleClick was called
    var numberOfCallsMadeIntoMockFunction = handleClick.mock.calls.length;

    // expect number of calls to equal exactly 1
    expect(numberOfCallsMadeIntoMockFunction).toBe(1);
  });
});