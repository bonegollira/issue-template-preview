import React from 'react';

var Bar = React.createClass({

  onClick () {
    let input = React.findDOMNode(this.refs.Bar__input);
    input.focus();
    input.select();
  },

  buildUrl (body) {
    return `https://github.com/bonegollira/issue-template-preview/issues/new?body=${encodeURIComponent(body)}`;
  },

  render () {
    return (
      <div className="Bar">
        <input 
          ref="Bar__input"
          className="Bar__input"
          value={this.buildUrl(this.props.body)}
          onClick={this.onClick}
          readonly
        />
      </div>
    );
  }
});

module.exports = Bar;
