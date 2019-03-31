import React, { Component } from 'react';
import CommentText from './CommentText';

class CommentList extends Component {
  static defaultProps = {
    comments: []
  };
  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <CommentText comment={comment} key={i} />
        )}
      </div>
    )
  }
}

export default CommentList;
