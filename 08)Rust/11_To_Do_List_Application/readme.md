# To-Do List Application in Rust

## Overview
This is a simple command-line To-Do List application implemented in Rust. The application allows users to:
- Add tasks
- Remove tasks
- View the list of tasks
- Edit tasks
- Exit the application

## Features
1. **Add Task:** Users can add tasks with a description.
2. **Remove Task:** Users can delete a task by selecting its number.
3. **View Task:** Displays all the tasks in the list.
4. **Edit Task:** Users can modify an existing task description.
5. **Exit:** Allows users to exit the application gracefully.

## How It Works
1. The application maintains a list of tasks using a `Vec<String>`.
2. A loop runs to continuously display a menu and accept user input.
3. User input is processed using the `io::stdin()` method.
4. The application uses Rust's `match` statement to execute different functions based on user input.
5. Each function performs operations like adding, removing, viewing, or editing tasks.
6. The program exits when the user selects the exit option.

## Running the Application
1. Ensure you have Rust installed on your system.
2. Clone or download the code.
3. Open a terminal and navigate to the project directory.
4. Run the following command:
   ```sh
   cargo run
   ```
5. Follow the on-screen instructions to manage your tasks.

## Example Usage
```
-----To Do List-----
1. Add Task 
2. Remove Task 
3. View Task 
4. Edit Task 
5. Exit 
--------------------
Please enter your choice:
```
The user can then input their choice to perform the respective action.

## Dependencies
- Standard Rust libraries (`std::io`) are used for user input handling.

## Conclusion
This simple To-Do List application demonstrates basic Rust concepts such as loops, vectors, user input handling, and pattern matching.
