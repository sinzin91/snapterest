/**
 *  This component renders a form with the <input> and <button> elements.
 *  When user presses "Export as HTML", a collection is submitted to CodePen.io.
 */

var React = require('react');

var formStyle = {
  display: 'inline-block'
};

var CollectionExportForm = React.createClass({
  render: function () {
    return (
      <form action="http://codepen.io/pen/define" method="POST" target="_blank" style={formStyle}>
        <input type="hidden" name="data" value={this.props.htmlMarkup} />

        <button type="submit" className="btn btn-default">Export as HTML</button>
      </form>
    );
  }
});

module.exports = CollectionExportForm;