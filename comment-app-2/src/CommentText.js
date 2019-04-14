import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentText extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  };

  constructor () {
    super();
    this.state = { timeString: '' };
  };

  componentWillMount () {
    this._updateTimeString();
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    );
  };

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    };
  };


  _updateTimeString () {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} minutes ago`
        : `${Math.round(Math.max(duration, 1))} second ago`
    });
  };

  componentWillUnmount () {
    clearInterval(this._timer)
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>
            {comment.username}
          </span>：
        </div>
        <p>{comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          Delete
        </span>
      </div>
    )
  }
};

export default CommentText;
