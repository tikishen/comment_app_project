# My Comment App

### Introduction and Component Division
Everything in React is a component, and the functionality built with React is actually a combination of various components. So the first thing we have to do for building a react project is to understand the requirements, analyze the requirements, and divide which components are composed of this requirement.

There are no specific criteria for the division of components. The purpose of dividing components is for code reusability and maintainability. As long as a part is likely to be reused elsewhere, you can pull it out as a component (very similar to create a function in python or java). 

![UI Design](https://github.com/tikishen/comment_app_project/blob/master/image/UI.png)

My comment app is divided into four components, `CommentApp`, `UserInput`, `CommentList`, and `Comment`.

`CommentApp`: The whole comment function is included in a component called `CommentApp`. The `CommentApp` contains the upper and lower parts.

`UserInput`: The upper part is the input area responsible for the user input, including the user name, comment content and release button for publishing comments. 

`CommentList`: The lower section is a list of comments, with a component called `CommentList` responsible for the display of the list.

`Comment`: Each comment list item is displayed by a separate component `Comment`.

### Component implementation

