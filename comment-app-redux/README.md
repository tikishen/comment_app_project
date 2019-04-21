# Start with Redux

First, we need to install Redux if you do not have it:
```
npm install redux react-redux
```
And create three directories under `src`: `components`, `containers`, and `reducers`.

### Build comment reducer
The previous reducer is written directly in the `src/index.js`, which is not the best practice. Because as the application becomes more complex, more reducers may be needed in order to manage the application. So it's best to take all the reducers out and put them in a directory `reducers` (See more about reducer: What is a reducer function in Redux?).

The state shared between the components of the comment function is `comment`. We can manage it by creating a new reducer `comment.js` in `src/reducers`.

Think about what functions can be included in comment? The reducer is used to describe the state of the data and the corresponding changes, so think about what we should write in comment is essential. Two operations: adding and deleting comments, are the most obvious. Besdies, our comment function will read data from `LocalStorage`, after reading the data, it actually needs to be saved to the application state. So we have an operation to initialize the comment. Add, delete, and initialize the comment would be the main three operations:

```
// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
```

We use three constants to store `action.type` so that we can modify it later. Write reducer based on these three operations:
```
// reducer
export default function (state, action) {
  if (!state) {
    state = { comments: [] }
  }
  switch (action.type) {
    case INIT_COMMENTS:
      // Initialize comments
      return { comments: action.comments }
    case ADD_COMMENT:
      // Add comments
      return {
        comments: [...state.comments, action.comment]
      }
    case DELETE_COMMENT:
      // Delete comments
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      }
    default:
      return state
  }
}
```

We only store the state of one `comment`, initialized to an empty array. When the action of `INIT_COMMENTS` is encountered, a new object is created and the comments property inside is overridden with a`ction.comments`. This is the initialization comment operation.

Similarly, the new comment operation `ADD_COMMENT` will also create a new object, and then create an new array. It copy the contents in the original `state.comments` to the new array, and add `action.comment` after the new array. This makes the new array contains one more comment than the original one. `[...]` here is a spread operator (See more: https://redux.js.org/recipes/using-object-spread-operator), we can use it to copy enumerable properties from one object to another.

For deleting comments, what we need to do is to create a new array with the contents of the specific index. The array `slice(from, to)` will put a specific range of content into the new array based on the index you pass in. So we can use slice to copy the content before the index of `action.commentIndex` in the original comment array into an array, and copy the `action.commentIndex` coordinates to the other array. Then combine the two arrays, which is equivalent to "deleting" the comments of `action.commentIndex`.

This is how to write a comment related reducer.

### Action creators
We use function action creators to create actions.
```
// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex }
}
```
Again, action creators are functions that return action, so we only need to pass in the data in `dispatch`:
```
dispatch(initComments(comments))
```
The additional benefit of using action creator is that it can help us to do a unified processing of incoming data; and with action creators, testing could be more convenient. (See more about action creator: What is an action creator in Redux?)

Code for the entire `src/reducers/comments.js` is：

```
// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

// reducer
export default function (state, action) {
  if (!state) {
    state = { comments: [] }
  }
  switch (action.type) {
    case INIT_COMMENTS:
      // Initialize Comments
      return { comments: action.comments }
    case ADD_COMMENT:
      // Add comments
      return {
        comments: [...state.comments, action.comment]
      }
    case DELETE_COMMENT:
      // Delete Comments
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      }
    default:
      return state
  }
}

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex }
}
```







