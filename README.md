# My Comment App

### Introduction and Component Division
Everything in React is a component, and the functionality built with React is actually a combination of various components. So the first thing we have to do for building a react project is to understand the requirements, analyze the requirements, and divide which components are composed of this requirement.

There are no specific criteria for the division of components. The purpose of dividing components is for code reusability and maintainability. As long as a part is likely to be reused elsewhere, you can pull it out as a component (very similar to create a function in python or java). 

![UI Design](https://github.com/tikishen/comment_app_project/blob/master/image/UI.png)

My comment app is divided into four components, `MyCommentApp`, `UserInput`, `CommentList`, and `CommentText`.

`MyCommentApp`: The whole comment function is included in a component called `CommentApp`. The `CommentApp` contains the upper and lower parts.

`UserInput`: The upper part is the input area responsible for the user input, including the user name, comment content and release button for publishing comments. 

`CommentList`: The lower section is a list of comments, with a component called `CommentList` responsible for the display of the list.

`CommentText`: Each comment list item is displayed by a separate component `Comment`.

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

For now, let it simply returns the `<div>` structure and we modify the `CommentList.js` in the same way:
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

Now we can render this simple structure on the page to see what effect, modify `src/index.js`:
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







