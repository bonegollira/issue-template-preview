import React from 'react';

var Textarea = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    onKeyUp: React.PropTypes.function
  },

  getDefaultProps: () => ({
    defaultValue: '',
    onKeyUp: function () {}
  }),

  componentDidMount () {
    let textarea = React.findDOMNode(this.refs.Textarea__textarea);
    textarea.value = this.props.defaultValue;
    textarea.focus();
  },

  render () {
    return (
      <section className="Textarea">
        <textarea
          ref="Textarea__textarea"
          className="Textarea__textarea"
          placeholder="@repository(リポジトリ名)&#13;&#10;@user(ユーザ名orオーガナイゼーション名）&#13;&#10;@title(タイトル）"
          onKeyUp={this.props.onKeyUp}>
        </textarea>
      </section>
    );
  }
});

module.exports = Textarea;
