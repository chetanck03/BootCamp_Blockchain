// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToDoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
        address owner;
    }

    mapping(uint => Task) public tasks; // Mapping of task IDs to Task structs
    mapping(address => uint[]) private userTasks; // Mapping to store user-specific tasks

    event TaskCreated(uint id, string content, address owner);
    event TaskCompleted(uint id);
    event TaskUpdated(uint id, string content);
    event TaskDeleted(uint id);

    modifier onlyOwner(uint _id) {
        require(msg.sender == tasks[_id].owner, "You are not the owner of this task");
        _;
    }

    constructor() {
        createTask("Initial Task");
    }

    // Create a new task
    function createTask(string memory _content) public {
        // Create the new task
        Task memory newTask = Task({
            id: taskCount,
            content: _content,
            completed: false,
            owner: msg.sender
        });

        // Store the task in the mapping
        tasks[taskCount] = newTask;

        // Store task ID for the user
        userTasks[msg.sender].push(taskCount);

        emit TaskCreated(taskCount, _content, msg.sender);
        taskCount++; // Increment task count
    }

    // Toggle task completion
    function toggleTaskCompleted(uint _id) public onlyOwner(_id) {
        tasks[_id].completed = !tasks[_id].completed;
        emit TaskCompleted(_id);
    }

    // Update task content
    function updateTask(uint _id, string memory _content) public onlyOwner(_id) {
        tasks[_id].content = _content;
        emit TaskUpdated(_id, _content);
    }

    // Delete a task
    function deleteTask(uint _id) public onlyOwner(_id) {
        require(_id < taskCount, "Task does not exist");

        // Remove the task from userTasks
        uint index = findTaskIndex(_id);
        userTasks[msg.sender][index] = userTasks[msg.sender][userTasks[msg.sender].length - 1];
        userTasks[msg.sender].pop(); // Remove the last task ID

        // Delete the task
        delete tasks[_id];

        emit TaskDeleted(_id);
    }

    // Get task details (restricted to owner)
    function getTask(uint _id) public view onlyOwner(_id) returns (uint, string memory, bool) {
        Task memory task = tasks[_id];
        return (task.id, task.content, task.completed);
    }

    // Get total number of tasks
    function getTaskCount() public view returns (uint) {
        return taskCount;
    }

    // Get all tasks for the caller
    function getMyTasks() public view returns (Task[] memory) {
        uint[] memory taskIds = userTasks[msg.sender];
        Task[] memory myTasks = new Task[](taskIds.length);
        
        for (uint i = 0; i < taskIds.length; i++) {
            myTasks[i] = tasks[taskIds[i]];
        }
        
        return myTasks;
    }

    // Helper function to find task index in user's task array
    function findTaskIndex(uint _id) internal view returns (uint) {
        uint[] memory taskIds = userTasks[msg.sender];
        for (uint i = 0; i < taskIds.length; i++) {
            if (taskIds[i] == _id) {
                return i;
            }
        }
        revert("Task not found for user");
    }
}
