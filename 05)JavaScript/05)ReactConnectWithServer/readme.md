# React `useRef` Hook and Sending Form Data to Server

## Introduction

In this project, we are using React’s `useRef` hook to collect user input (i.e., `username` and `password`) and send this data to a server via a `POST` request using the `fetch` API. The project demonstrates how to use the `useRef` hook to reference form elements, handle form submissions, and send form data to a backend server.

## What is `useRef`?

The `useRef` hook in React allows you to directly reference a DOM element or persist values across renders without causing a re-render. It is commonly used to get access to DOM elements, but it can also be used to store any mutable value.

### Key Features of `useRef`:
- It does not cause re-renders when the referenced value changes.
- It can be used to reference an element in the DOM.
- The value stored in the `.current` property is preserved between renders.

## Why use `useRef` in Forms?

Typically, you use `useState` to create controlled form elements, but `useRef` can be used for a more direct approach when you just want to access the current value of an input field without managing its state.

In this project, we:
1. Use `useRef` to reference the `username` and `password` input fields.
2. Handle the form submission.
3. Send the input data (username and password) to a server using the `fetch` API.

## Prerequisites

Make sure you have the following installed:
- Node.js
- React
- Express (for backend)

