import React from 'react';

var Bar = React.createClass({

  propTypes: {
    body: React.PropTypes.string,
    repository: React.PropTypes.string,
    user: React.PropTypes.string,
    organization: React.PropTypes.string,
    title: React.PropTypes.string,
    enterprise: React.PropTypes.string
  },

  getDefaultProps: () => ({
    body: '',
    repository: '{repository}',
    user: '{user}',
    organization: '',
    title: '{title}',
    enterprise: 'github.com'
  }),

  onClick () {
    let input = React.findDOMNode(this.refs.Bar__input);
    input.focus();
    input.select();
  },

  buildUrl (body) {
    let user = this.props.organization || this.props.user;
    return `https://${this.props.enterprise}/${user}/${this.props.repository}/issues/new?title=${encodeURIComponent(this.props.title)}&body=${encodeURIComponent(body)}`;
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
