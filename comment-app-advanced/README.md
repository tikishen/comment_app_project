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
    onSubmit: PropTypes.func // Used for typechecking
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






