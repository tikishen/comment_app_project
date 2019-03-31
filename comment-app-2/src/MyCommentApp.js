import React, { Component } from 'react';
import UserInput from './UserInput';
import CommentList from './CommentList';

class MyCommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    };
  };

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('Please enter your name!');
    if (!comment.content) return alert('Please enter your comments!');
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <UserInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments}/>
      </div>
    );
  };
};

export default MyCommentApp;