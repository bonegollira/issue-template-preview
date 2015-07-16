import React from 'react';
import Textarea from './textarea.react';
import Preview from './preview.react';
import Bar from './bar.react';

let query = location.search.slice(1).split('&').reduce((q, qs) => {
  q[qs.split('=')[0]] = qs.split('=')[1];
  return q;
}, {});
let title = query.title;
let body = query.body;
let labels = query.labels;
let milestone = query.milestone;
let assignee = query.assignee;

let App = React.createClass({

  getInitialState: () => ({
    markdown: body || ''
  }),

  onKeyUp (e) {
    this.setState({markdown: e.target.value});
  },

  render () {
    return (
      <div className="app">
        <Bar body={this.state.markdown} />
        <Textarea defaultValue={this.state.markdown} onKeyUp={this.onKeyUp} />
        <Preview markdown={this.state.markdown} />
      </div>
    );
  }
});

React.render(
  <App />,
  document.querySelector('#app')
);
