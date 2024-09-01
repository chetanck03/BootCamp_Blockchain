# React.js Overview

React.js is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive experience. Developed by Facebook, React allows developers to build web applications with a component-based architecture.

## Table of Contents

1. [Introduction](#introduction)
2. [Props](#props)
3. [Hooks](#hooks)
4. [Context API](#context-api)
5. [React Router](#react-router)

## Introduction

React's key feature is its component-based architecture. Components are reusable and can manage their own state. React components can be either class-based or functional. Functional components are simpler and more concise, especially with the introduction of hooks.

## Props

**Props** (short for properties) are read-only attributes passed to components. They allow data to be passed from parent components to child components. Props are immutable and cannot be changed by the component that receives them.

### Example of Props

```jsx
// ParentComponent.jsx
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const message = "Hello from Parent!";
  return (
    <div>
      <ChildComponent text={message} />
    </div>
  );
};

export default ParentComponent;

// ChildComponent.jsx
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      <p>{props.text}</p>
    </div>
  );
};

export default ChildComponent;
```

# React Hooks

React Hooks are functions that let you use state and other React features without writing a class. They were introduced in React 16.8 to provide a more direct API to the React concepts you already know (state, lifecycle, context, etc.) in a functional component.

## Common Hooks

### useState

`useState` is a hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it.

#### Example

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

### useEffect:
Allows you to perform side effects in functional components, such as fetching data or subscribing to events
```jsx
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default DataFetcher;
```
### useContext:
Provides a way to pass data through the component tree without having to pass props down manually at every level.

```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
    </div>
  );
};

export { ThemeProvider, ThemedComponent };
```
### useReducer
useReducer is an alternative to useState for managing more complex state logic in a functional component. It works similarly to reducers in Redux.

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```
### useMemo
useMemo optimizes performance by memoizing the results of expensive calculations. It returns a memoized value and recalculates it only when the dependencies change.

```jsx
import React, { useMemo, useState } from 'react';

const ExpensiveComponent = ({ number }) => {
  const expensiveCalculation = useMemo(() => {
    // Perform an expensive calculation
    return number * 2;
  }, [number]); // Recalculate only when `number` changes

  return <p>Calculated Value: {expensiveCalculation}</p>;
};

const ParentComponent = () => {
  const [number, setNumber] = useState(1);

  return (
    <div>
      <ExpensiveComponent number={number} />
      <button onClick={() => setNumber(number + 1)}>Change Number</button>
    </div>
  );
};

export default ParentComponent;
```

### Context API
Context API provides a way to share values between components without passing props through every level of the tree. It is useful for global data like themes, user authentication, or settings.

```jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <p>User: {user ? user.name : 'Guest'}</p>
    </div>
  );
};

export { UserProvider, UserProfile };

```
### React Router
React Router is a library for handling routing in React applications. It allows you to define multiple routes and navigate between different components based on the URL.

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

const App = () => (
  <Router>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </Router>
);

export default App;

```