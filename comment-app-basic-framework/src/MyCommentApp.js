import React, { Component } from 'react'
import UserInput from './UserInput'
import CommentList from './CommentList'

class MyCommentApp extends Component {
  render() {
    return (
      <div className='wrapper'>
        <UserInput />
        <CommentList />
      </div>
    )
  }
}

export default MyCommentApp