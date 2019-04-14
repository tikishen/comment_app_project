**Now let's add some advanced features to MyCommentApp**

### 1. Auto focus to a particular comment box
We need to get the DOA element of the `textarea` and then call the `focus()` API. We add `ref` to the input box element to get the DOM element and modify the `UserInput.js file` (Back to our React-Reduc map, to see the question: What are refs in React?):

```
 <textarea
      ref={(textarea) => this.textarea = textarea}
      value={this.state.content}
      onChange={this.handleContentChange.bind(this)} />
```

After the component is mounted, we can call this.textarea.focus() to add the `ComponentDidMount` lifecycle to the `CommentInput` component (Back to our React-Reduc map: Which of the followings are true about `componentDidMount()`?):
```
class UserInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func // Uses for typechecking
  }

  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  componentDidMount () {
    this.textarea.focus()
  }
```

We also used a typechecking here, PropTypes. PropTypes exports a range of validators that can be used to make sure the data you receive is valid. In this example, we’re using PropTypes.func. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, propTypes is only checked in development mode. (See the question on the map: What is the purpose of PropTypes?)

### 2. Keep username
Function description: The user enters the username, and then we save the username to the browser's LocalStorage. When the page re-loads, the previously saved username is displayed from the LocalStorage to the username input box. In this way, the user does not need to re-enter the user name, and the comment box is automatically focused, so the user experience could be much better.

We add `onBlur` event that occurs when the input box loses focus.
```
<input
      value={this.state.username}
      onBlur={this.handleUsernameBlur.bind(this)}
      onChange={this.handleUsernameChange.bind(this)} />
```

In the `handleUsernameBlur` we save the user's input to LocalStorage:
```
class UserInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  componentDidMount () {
    this.textarea.focus()
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }

  handleUsernameBlur (event) {
    this._saveUsername(event.target.value)
  }
```

In `handleUsernameBlur` we pass the user input to the private method `_saveUsername` (Note: all the private methods start with `_`). `_saveUsername` sets the username field in LocalStorage and keep the username. This is equivalent to automatically save the user name when the user enters the username (when the input box loses focus).

Enter the username and see browser console:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-12.png)

Then load the username when our component is mounted. This is basically a data loading operation. Operations initiated by components that do not rely on DOM operations can be done in `componentWillMount` , so add `componentWillMount`'s component lifecycle to `UserInput`:
```
componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }
```
`componentWillMount` calls the private method `_loadUsername`, and `_loadUsername` loads the username from LocalStorage and `setState` to the component's `state.username`. Then the component can use the username when it is rendered.

Such user experience is much better. Do not need to enter a username when refreshing the page, and automatically focus on the input box.


### 3. Persistent comment
The content of the comment list can be persisted in a similar way to the persistence of the username. The comments posted by the users can still exist after the page is refreshed. Modify `MyCommentApp.js`:
```
class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('Please enter your name!')
    if (!comment.content) return alert('Please enter your comments!')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({ comments })
    this._saveComments(comments)
  }
...
```
We added `_loadComments` and `_saveComments` to load and save the comment list data, respectively. Each time a user submits a comment, the comment list data is saved once, so we call the `_saveComments` method on `handleSubmitComment`; and call the `_loadComments` method in `componentWillMount` to load the comment list data out of `setState` to this.state when the component starts to mount. The component can then render the comment list data loaded from LocalStorage.

Post a comment now, then refresh to see the comment and it won't disappear as before.

### 4. Show comment posting time

Now we add the release time to each comment, and show how long it has been published on the comment list, such as "1 second ago", "30 minutes ago", and the release time will be updated for every 5 seconds. Modify `UserInput.js` When the user clicks the publish button, the commented data is sent to the local storage with the timestamp:

```
handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date()
      })
    }
    this.setState({ content: '' })
  }
```

Show comments on comment list, edit `commentText.js`:
```
class CommentText extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.state = { timeString: '' }
  }

  componentWillMount () {
    this._updateTimeString()
  }

  _updateTimeString () {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} minutes ago`
        : `${Math.round(Math.max(duration, 1))} second ago`
    })
  }

  render () {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.username} </span>：
        </div>
        <p>{this.props.comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
      </div>
    )
  }
}
```

Each CommentText component instance saves a `timeString` state for how long it has been posted. `_updateTimeString` is a private method updates the `timeString` according to `createdTime` in `props.comment`: it calculates the time difference between the current time and the comment posting time. If it has been published for more than 60 seconds, it will display the time of minutes, otherwise it displays the seconds. Then `componentWillMount` will update the string by calling `_updateTimeString`, and the render() method will render the string to show the time difference to a `<span>`.

See the broswer:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-15.png)

At this time, the time stamp would not automatically updated unless the user manually refreshs the page. We can start a timer in `componentWillMount` and call `_updateTimeString` for every 5 seconds to update `timeString` via `setState` :

```
  componentWillMount () {
    this._updateTimeString()
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }
```

### 5. Delete comments

In order to delete unwanted comments, modify the render method in `TextComment.js` and add a delete button:
```
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
        <span className='comment-delete'>
          Delete
        </span>
      </div>
    )
  }
```

We know that the comment list data is in `MyCommentApp`, and the delete button is in the `CommentText`. Now what we know the user clicks the delete button of a comment and the corresponding data in `MyCommentApp` should be deleted, but the relationship between `MyCommentApp` and `CommentText` is show as following:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-6.png)

`CommentText` and `MyCommentApp` are separated by the `CommentList`, so `CommentText` can't directly interact with `MyCommentApp`, and can only forward the message of this comment by `CommentList` to `MyCommentApp`. Modify the `CommentText` component so that it can pass the deleted message to the previous layer:

```
class CommentText extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }
...
  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render () {
    ...
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          Delete
        </span>
      </div>
    )
  }
  ```
  
Now you can pass `onDeleteComment` and `index` two parameters when using `CommentText`. Index is used to mark the subscript of this comment in the list, so that when we click the delete button, we can know which comment you wan to delete. The user clicks delete button to call `handleDeleteComment`, which calls the `props.onDeleteComment` function passed from the upper layer to inform the message of deleted comment and pass the comment index to `CommentList`. Now modify `CommentList.js` to let it pass in these two parameters:
```
class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  static defaultProps = {
    comments: []
  }

  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <CommentText
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
      </div>
    )
  }
}
```

When the user clicks on the button, the `CommentText` component calls `props.onDeleteComment`, which is the `handleDeleteComment` method in the `CommentList`. The `handleDeleteComment` will call `props.onDeleteComment` in the configuration parameter that is accepted by the `CommentList` and pass the index out.

In other words, we can pass a configuration parameter of `onDeleteComment` to the `CommentList` in `MyCommentApp`, to accept the message of deleting the comment, modify `MyCommentApp.js`:
```
  handleDeleteComment (index) {
    console.log(index)
  }

  render() {
    return (
      <div className='wrapper'>
        <UserInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)} />
      </div>
    )
  }
}
```

Now click the delete button, you can see the index corresponding to the comment printed on the console. 
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-16.png)

Here is the whole process: `CommentList` passes the index to `CommentText`. When the delete button is clicked, `CommentText` passes the index to the `CommentList`, and the `CommentList` passes it to the `MyCommentApp`. Now comments can now be removed in `MyCommentApp`:

```
  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }
```
We delete the comment with specific index through `comments.splice`, and re-render the entire comment list through `setState`; of course, we need to update the latest comment list data to the LocalStorage, so we call the `_saveComments` method after deleting and updating, and synchronize data to LocalStorage.

You can happily delete your comments now. However, after 5 seconds of deleting the comment, you will see an error in the console:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-17.png)

This happens because we forgot to clear the comment timer, modify `CommentText.js`, add a lifecycle `commentWillUnmount` to clear the timer when the comment component is destroyed:
```
  componentWillUnmount () {
    clearInterval(this._timer)
  }
```





