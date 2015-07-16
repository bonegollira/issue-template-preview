import React from 'react';
import marked from 'marked';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var Preview = React.createClass({
  propTypes: {
    markdown: React.PropTypes.string.isRequired
  },

  getDefaultProps: () => ({
    markdowm: ''
  }),

  innerHTML () {
    console.log(this.props.markdowm);
    return {
      __html: marked(this.props.markdown)
    };
  },

  render () { 
    return (
      <section className="Preview">
        <h1 className="Preview--title">Preview</h1>
        <article
          className="Preview--body markdown-body"
          dangerouslySetInnerHTML={this.innerHTML()}>
        </article>
      </section>
    );
  }
});

module.exports = Preview;
