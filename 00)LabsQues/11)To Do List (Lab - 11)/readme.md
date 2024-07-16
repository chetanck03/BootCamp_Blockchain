## Creating a To-Do List Smart Contract :

## Objective

Create a smart contract in Solidity to manage a simple to-do list. The contract should allow users to add tasks and toggle their completion status.

## Instructions

## 1. State Variables:

- Define a `uint` variable `taskCount` to keep track of the number of tasks.
- Define a `struct` named `Task` with the following properties:
    - `uint id`: The task ID.
    - `string content`: The content of the task.
    - `bool completed`: The completion status of the task.
- Create a mapping that maps a uint (task ID) to a Task struct. Name it tasks.

## 2. Constructor:

- In the constructor, initialize the contract with an initial task. You can set the content of this task to `"Initial Task"`.

## 3. Functions:

- Define a function `createTask` that takes a `string` parameter `_content` and adds a new task to the list. This function should:
  - Increment the `taskCount`.
  - Create a new task with the incremented taskCount as the ID, `_content` as the content, and `false` as the  completed status.
  - Emit the `TaskCreated` event.
- Define a function `toggleTaskCompleted` that takes a `uint` parameter `_id` and toggles the completion status of the task with the given ID. This function should:

  - Retrieve the task from the `tasks` mapping.
  - Toggle the `completed` status of the task.
  - Update the task in the `tasks` mapping.
  - Emit the `TaskCompleted` event.
- Define a function `getTask` that takes a `uint` parameter `_id` and returns the details of the task with the given ID. The function should return:
  - `uint`: The task ID.
  - `string`: The task content.
  - `bool`: The task completion status.
- Define a function `getTaskCount` that returns the total number of tasks.