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

let matchOneWord = reg => line => {
  let match = line.match(reg);
  return match ? match[1] : void 0;
};

let App = React.createClass({

  getInitialState: () => ({
    markdown: body || '',
    repository: '{repository}',
    user: '{user}',
    organization: '',
    title: '{title}'
  }),

  getRepository: matchOneWord(/@repository\((.*?)\)/),
  getUser: matchOneWord(/@user\((.*?)\)/),
  getOrganization: matchOneWord(/@organization\((.*?)\)/),
  getTitle: matchOneWord(/@title\((.*?)\)/),

  parseMarkdown (markdown) {
    let newLines = [];
    let lines = markdown.split('\n');
    let repository, user, organization, title;
    console.log(lines);
    lines.forEach((line, i) => {
      let newRepository = this.getRepository(line);
      let newUser = this.getUser(line);
      let newOrganization = this.getOrganization(line);
      let newTitle = this.getTitle(line);

      if (newRepository || newUser || newOrganization || newTitle) {
        if (newRepository) {
          repository = newRepository;
        }
        if (newUser) {
          user = newUser;
        }
        if (newOrganization) {
          organization = newOrganization;
        }
        if (newTitle) {
          title = newTitle;
        }
      }
      else {
        newLines.push(line);
      }
    });

    repository && this.setState({repository: repository});
    user && this.setState({user: user});
    organization && this.setState({organization: organization});
    title && this.setState({title: title});
    return newLines.join('\n');
  },

  onKeyUp (e) {
    this.setState({markdown: this.parseMarkdown(e.target.value)});
  },

  render () {
    return (
      <div className="app">
        <Bar
          repository={this.state.repository}
          user={this.state.user}
          organization={this.state.organization}
          title={this.state.title}
          body={this.state.markdown} />
        <Textarea
          defaultValue={this.state.markdown}
          onKeyUp={this.onKeyUp} />
        <Preview
          markdown={this.state.markdown} />
      </div>
    );
  }
});

React.render(
  <App />,
  document.querySelector('#app')
);
