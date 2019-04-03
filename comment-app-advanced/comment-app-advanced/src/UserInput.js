import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func // Used for typechecking
  };

  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    };
  };

  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  componentDidMount () {
    this.textarea.focus();
  };

  _saveUsername (username) {
    localStorage.setItem('username', username);
  };

  handleUsernameBlur (event) {
    this._saveUsername(event.target.value);
  };

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    });
  };

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    });
  };

  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({username, content})
    };
    this.setState({ content: '' });
  };

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>User Name：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>Leave your message：</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea) => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            Publish
          </button>
        </div>
      </div>
    )
  }
}

export default UserInput