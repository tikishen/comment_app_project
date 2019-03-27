# My Comment App

## Basic Framework
### Introduction and Component Division
Everything in React is a component, and the functionality built with React is actually a combination of various components. So the first thing we have to do for building a react project is to understand the requirements, analyze the requirements, and divide which components are composed of this requirement.

There are no specific criteria for the division of components. The purpose of dividing components is for code reusability and maintainability. As long as a part is likely to be reused elsewhere, you can pull it out as a component (very similar to create a function in python or java). 

![UI Design](https://github.com/tikishen/comment_app_project/blob/master/image/UI.png)

My comment app is divided into four components, `MyCommentApp`, `UserInput`, `CommentList`, and `CommentText`.

`MyCommentApp`: The whole comment function is included in a component called `MyCommentApp`. The `MyCommentApp` contains the upper and lower parts.

`UserInput`: The upper part is the input area responsible for the user input, including the user name, comment content and release button for publishing comments.

`CommentList`: The lower section is a list of comments, with a component called `CommentList` responsible for the display of the list.

`CommentText`: Each comment list item is displayed by a separate component `CommentText`.

### Component implementation

Before writing the code, let's build a new project directory with create-react-app. （"Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration." Here is the link for offical doc: https://facebook.github.io/create-react-app/docs/getting-started）
```
create-react-app comment-app
```

Under src/ directory, we create 4 files corresponding to the above four components.
```
src/
  MyCommentApp.js
  UserInput.js
  CommentList.js
  CommentText.js
```

File name here starts with an uppercase letter, because we need to follow a principle: if a file is exported as a class, then the file name begins with an uppercase.

Let's lay out some basic code so that we can see the relationship between the components. We start at the top level of the component and build the component tree step by step. First modify `MyCommentApp.js`:

```
import React, { Component } from 'react'
import UserInput from './UserInput'
import CommentList from './CommentList'

class MyCommentApp extends Component {
  render() {
    return (
      <div>
        <UserInput />
        <CommentList />
      </div>
    )
  }
}

export default MyCommentApp
```

`MyCommentApp` is now very simple, with `UserInput` and `CommentList` at the top of the file.It is applied to the JSX structure returned by `MyCommentApp`. The upper part is the user input area, and the lower part is the comment list.

Now modify the contents of `UserInput.js`:
```
import React, { Component } from 'react'

class UserInput extends Component {
  render() {
    return (
      <div>UserInput</div>
    )
  }
}

export default UserInput
```

For now, we can just make it simply return the `<div>` structure, and we modify the `CommentList.js` in the same way:
```
import React, { Component } from 'react'

class CommentList extends Component {
  render() {
    return (
      <div>CommentList</div>
    )
  }
}

export default CommentList
```

Now we can render this simple structure on the page to see the result, modify `src/index.js`:
```
import React from 'react'
import ReactDOM from 'react-dom'
import MyCommentApp from './MyCommentApp'
import './index.css'

ReactDOM.render(
  <MyCommentApp />,
  document.getElementById('root')
)
```
Then start the project:
```
cd comment-app
npm start
```
We can see the basic structure has been rendered on the page:

![Draft-ver](https://github.com/tikishen/comment_app_project/blob/master/image/comment-1.png)

### Add style

Let's say, we want this structure to be centered in the browser, we're going to add a style to the `<div>` in `MyCommentApp`. Modify the render method in `MyCommentApp` and add a wrapper class to it:

```
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
```

Add style to the `index.css`:
```
.wrapper {
  width: 500px;
  margin: 10px auto;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  padding: 20px;
}
```
We can see in the brower:
![Draft-ver](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-2.png)

### Handle User Input

We first modify `UserInput.js` to improve the HTML structure in the render function of `UsertInput`
```
import React, { Component } from 'react'

class UserInput extends Component {
  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>Name：</span>
          <div className='comment-field-input'>
            <input />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>Leave your message：</span>
          <div className='comment-field-input'>
            <textarea />
          </div>
        </div>
        <div className='comment-field-button'>
          <button>
            Publish
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
```
You can see in the browser that the structure and style of `UserInput` have worked:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-3.png)


Since we haven't added processing logic yet, typing in the content box and clicking publish will not work. The user can enter the content one is the username (`Name`), one is the comment content (`Leave your message`), so we initialize a state in the component's constructor to save these two states:

```
class UserInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  ...
}
```

Then set the value property to the input box so that values of two contents are equal to the corresponding values in this.state :
```
<div className='comment-field'>
    <span className='comment-field-name'>Name：</span>
    <div className='comment-field-input'>
      <input value={this.state.username} />
    </div>
  </div>
  <div className='comment-field'>
    <span className='comment-field-name'>Leave your message：</span>
    <div className='comment-field-input'>
      <textarea value={this.state.content} />
    </div>
  </div>
```

Right now, `<input />` that accepts the username input and `<textarea />` that accepts the user's comment are controlled by state.username and state.content respectively. However, at this time, you go to the browser and enter the content, you will find that you can not enter anything.

Why is this? React.js believes that all states should be controlled by the state of React.js. As long as input controls like `<input />`, `<textarea />`, `<select />` are set with values, their values are always keeping to the setting values. So the value does not change, the `value` does not change.

As the example above, the value of `<input />` and `<textarea />` are initialized to an empty string in the constructor. Even if the user tries to type in the input box, nothing change.

So what can we do to update user input into the input box? In React.js, you must use `setState` to update the content of the component, so what we need to do is: add a listener to the `onChange` event of the input box, they can therefore get the content input, and then update the value in the state by `setState`, and the content will be updated.

```
...
    <div className='comment-field-input'>
      <input
        value={this.state.username}
        onChange={this.handleUsernameChange.bind(this)} />
    </div>
...
```

The above code adds an onChange event listener to the input, binding to the  `this.handleUsernameChange` method. Code of this function show as the following:

```
  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }
```
In this function, we get the user input in `<input />` through `event.target.value`, and then set it to `state.username` through `setState`. At this time, the content of the component will be updated, and the value of input will be updated and displayed in the input box:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-5.png)

Components like <input />, <select />, <textarea> whose values are controlled and rendered by React.js are called Controlled Components. Normally, for the components that users can enter, they can generally be made as controlled components. (https://reactjs.org/docs/forms.html)
  
Similarly, let <textarea /> be a controlled component:
```
...
  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }
...
      <div className='comment-field'>
        <span className='comment-field-name'>Leave your message：</span>
        <div className='comment-field-input'>
          <textarea
            value={this.state.content}
            onChange={this.handleContentChange.bind(this)} />
        </div>
      </div>
...
```

![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-4.png)

### Pass data to the parent component

When user types the content in `UserInput` and clicks `Publish`, the content needs to be displayed in the `CommentList` component. Go back to the family tree:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-6.png)
 
`MyCommentApp` component combines `UserInput` and `CommentList`, which is the parent component and act as a bridge between two subcomponents. So when the user clicks the publish button, it pass the latest data in the state of `UserInput` to the parent component `MyCommentApp`, and then let the parent component pass the data to the `CommentList` for rendering.

How can `UserInput` pass data to `MyCommentApp`? The parent component `CommentApp` only needs to pass a callback function to the child component `UserInput` via props. When the user clicks the publish button, `UserInput` calls the callback function in props and passes state to the function.

So, add an event to the publish button first:
```
  <div className='comment-field-button'>
    <button
      onClick={this.handleSubmit.bind(this)}>
      Publish
    </button>
  </div>
```

The `this.handleSubmit` method is called when the user clicks the publish button:

```
  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({username, content})
    }
    this.setState({ content: '' })
  }
```

The `handleSubmit` method determines if the `onSubmit` property is passed in `props`. If yes, the function is called, the user name and comment data entered by the user are passed to the function. Then use `setState` to clear the user input comments (but considering of a btter user experience, it keeps the username)

Modify `MyCommentApp.js` so that it can get new comment data by passing in the callback:
```
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
```
We pass an `onSubmit` property to `UserInput` in `MyCommentApp` , which is a method of `MyCommentApp`'s own `handleSubmitComment`. In this way, `UserInput` can call `this.props.onSubmit(...)` to pass the data to `MyCommentApp`.

Now click the publish button after entering the comment in `MyCommentInput` and you will see the data that `MyCommentApp` prints on the console:
![Comment](https://github.com/tikishen/comment_app_project/blob/master/image/Comment-7.png)















