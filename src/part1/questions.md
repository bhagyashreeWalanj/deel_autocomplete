## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The biggest difference between React pure component vs a regular React component is that a React component doesn’t implement `shouldComponentUpdate()` by default.

On the other hand, React pure component does implement `shouldComponentUpdate()` by default, and by performing a shallow comparison on React state and props values.

#### Example of React Component :

```
class Greeting extends React.Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return <h1>Hello World !</h1>
    }
}

```

#### Example of React Pure Component :

Only use React pure component when the React component won’t be mutated by state or props.

```
class Greeting extends React.PureComponent{
    render(){
        return <h1>Hello World !</h1>
    }
}
```

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

every context update always re-renders every consumer of this context, may cause performance problems. Context is not suitable for complex state management.
Context allows you to transfer data down the component tree without manually passing props at each stage.
if a component missed rendering via shouldComponentUpdate, updates to values passed down via context could be blocked. ShouldComponentUpdate was used by several components for performance enhancements, rendering legacy background useless for passing down plain data.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. Pass a function as a prop to the Child component.Call the function in the Child component and pass the data as arguments.Access the data in the function in the Parent.

example :

```
import {useState} from 'react';

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = num => {
    setCount(current => current + num);
  };

  return (
    <div>
      <Child handleClick={handleClick} />
      <h2>Count: {count}</h2>
    </div>
  );
}

function Child({handleClick}) {
  return (
    <div>
      <button onClick={event => handleClick(100)}>Click</button>
    </div>
  );
}


```

2. We can use the React useEffect hook to pass the state to the parent component from child component.

3. We can use React componentDidUpdate

```

  componentDidUpdate() {
    if (this.props.onChangeHandler) {
      this.props.onChangeHandler(this.state);
    }
  }


```

## 4. Give 2 ways to prevent components from re-rendering.

To avoid re-rendering per component with the we can use the `shouldComponentUpdate()` lifecycle.
React shouldComponentUpdate is a performance optimization method, and it tells React to avoid re-rendering a component, even if state or prop values may have changed.

```
class Greeting extends React.Component {

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate lifecycle');
    return false;
  }

  render() {
    console.log('Render lifecycle');
    return <h1>Hi there, I'm John!</h1>;
  }
}

```

Another method is to use `React.memo()` in functional component. It’s used to speed up computing by the result of a function and returning the cached result, when the same inputs occur again.

```

const Greeting = React.memo(props => {
  console.log("Greetings");
  return <h1>Hello {props.name}!</h1>;
});

```

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

**what is a Fragment?**

The render method will only render a single root node inside it at a time. However, if you want to return multiple elements, the render method will require a 'div' tag and put the entire content or elements inside it.This will leads to several DOM problems, including useless markup and sometimes even invalid HTML to be rendered.
Therefore,
Fragments are syntax that allows us to wrap multiple elements to a React component without wrapping them in an extra DOM node

**why do we need it ?**

- It’s a bit faster and has less memory usage
- A shorter syntax you can use for declaring fragments. It looks like empty tag.
- performance benefits in a highly complex application
- It makes the execution of code faster as compared to the div tag.

Example :

```
function App() {
    return (
      <React.Fragment>
      <h1>Hello World</h1>
      <p> This is first paragraph </p>

      <h2>Hello heading 2 ! </h2>
      <p> This is second paragraph </p>
      </React.Fragment>
    );
  }
}
```

## 6. Give 3 examples of the HOC pattern.

a higher-order component is a function that takes a component and returns a new component.

**Example 1 :**

**App.js**

```
import HOC from './components/HOC'
import ProductName from './components/ProductName';

const Users = HOC(ProductName);

function App() {
  return (
    <div className="App">
      <Users></Users>
    </div>
  );
}
```

**HOC.js**

```
import React, { Component } from 'react';

export default function Hoc(HocComponent) {
    return class extends Component {
        render() {
            return (
                <div>
                    <HocComponent></HocComponent>
                </div>

            );
        }
    }
}
```

**ProductName.js**

```

const ProductName = () => {
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    )
}
```

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

**Promises**
When an error is thrown, a rejected promised will be returned with the thrown error, equivalent to return `Promise.Reject(error)` .

```
function greeting() {
    return new Promise((resolve, reject) => {
        reject(new Error());
        resolve("great success");
    });
}
```

**Async...await Method**
When an error is thrown in an async function, you can catch it with a try {} catch {}

```
async function fails() {
    throws Error();
}

async function myFunc() {
    try {
        await fails();
    } catch (e) {
        console.log("failed", e);
    }
}
```

## 8. How many arguments does setState take and why is it async.

The setState method takes up to 2 arguments.
setState takes an object or a function with the previous state and the props objects as the 1st and 2nd parameters respectively.
Example :

```
this.setState( ({ count }) => ({
      count: count + 1
    }),{
      test: this.state.test+1
    });

```

**Why is it Async ?**

The setState causes reconciliation(the process of re-rendering the components tree) is base of the next property — setState is asynchronous. This allows us to have multiple calls to setState in a single scope and no needed re-renders of the whole tree.

## 9. List the steps needed to migrate a Class to Function Component.

- Understanding a Class without State or Lifecycle Methods
- Adding Hooks to Classes with single State
- Adding Hooks in functional component with Multiple State Properties
- Adding Hooks in functional component in place of componentDidMount
- Adding Hooks to a Class with State, componentDidMount, and componentDidUpdate
- Converting PureComponent to React memo

## 10. List a few ways styles can be used with components.

- inline CSS
- normal CSS
- CSS in JS libraries
- CSS Modules
- Sass & SCSS
- Less
- Stylable

## 11. How to render an HTML string coming from the server.

By using `dangerouslySetInnerHTML` or `RegExp and Split` or `third party library - html-react-parser` method.

- dangerouslySetInnerHTML :

Setting HTML from code is risky because it’s easy to expose your users to a cross-site scripting (XSS) attack.

Example :

```
const marked = "This flowers are <b>beautiful</b> and <b>colored</b>.";

return <div dangerouslySetInnerHTML={{ __html: marked }} />;

```

- html-react-parser :
  It converts an HTML string to one or more React elements.

```
import parse from 'html-react-parser');

const parsetext = parse('<div>${text}</div>');
```
