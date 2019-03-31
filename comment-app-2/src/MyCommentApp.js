import React, { Component } from 'react'
import UserInput from './UserInput'
import CommentList from './CommentList'

class MyCommentApp extends Component {
  handleSubmitComment (comment) {
    console.log(comment)
  }

  render() {
    return (
      <div className='wrapper'>
        <UserInput
          onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList />
      </div>
    )
  }
}

export default MyCommentApp