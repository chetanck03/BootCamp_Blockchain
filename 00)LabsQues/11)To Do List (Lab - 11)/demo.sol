// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToDoList{
    uint taskCount;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    mapping(uint=>Task) tasks;

    constructor(){
        createTask("Initial Task");

    }
// Create Tasks
    function createTask(string memory _content) public {

        tasks[taskCount]=Task({
            id:taskCount,
            content:_content,
            completed:false
        });
        taskCount++;

    }

// Completed the task
    function toggleTaskCompleted(uint _id) public{
        tasks[_id].completed=true;

    }

// Get the Task details
    function getTask(uint _id) public view returns (uint, string memory, bool) {
        Task memory task = tasks[_id];
        return (task.id,task.content,task.completed);
    }

// Total Number of Tasks
    function getTaskCount() public view returns (uint){
        return taskCount;
    }
}