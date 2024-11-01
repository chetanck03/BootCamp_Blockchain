import { useWeb3 } from '../../providers/Web3Provider';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const TodoList = () => {
  const { contractInstance } = useWeb3();
  const [tasks, setTasks] = useState([]);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [updatedTaskContent, setUpdatedTaskContent] = useState('');

  // Fetch tasks of the connected user
  const fetchMyTasks = async () => {
    try {
      if (!contractInstance) return toast.error("Contract instance is not available");
      const fetchedTasks = await contractInstance.getMyTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error(`Error fetching tasks: ${error.message}`);
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (contractInstance) {
      fetchMyTasks(); // Initial fetch
      const intervalId = setInterval(fetchMyTasks, 5000); // Polling every 5 seconds
      return () => clearInterval(intervalId); // Clear interval on unmount
    }
  }, [contractInstance]);

  // Create new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await contractInstance.createTask(newTaskContent);
      toast.success("Task created successfully");
      setNewTaskContent('');
      fetchMyTasks(); // Fetch user tasks after creation
    } catch (error) {
      toast.error(`Failed to create task: ${error.message}`);
    }
  };

  // Toggle task completion
  const handleToggleTask = async (id) => {
    try {
      await contractInstance.toggleTaskCompleted(id);
      toast.success("Task completion status toggled");
      fetchMyTasks(); // Fetch user tasks after toggling
    } catch (error) {
      toast.error(`Failed to toggle task completion: ${error.message}`);
    }
  };

  // Update task content
  const handleUpdateTask = async (id, content) => {
    try {
      await contractInstance.updateTask(id, content);
      toast.success("Task updated successfully");

      // Update the specific task in the state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, content: content } : task
        )
      );
      setUpdatedTaskContent('');
    } catch (error) {
      toast.error(`Failed to update task: ${error.message}`);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await contractInstance.deleteTask(id);
      toast.success("Task deleted successfully");
      fetchMyTasks(); // Fetch user tasks after deletion
    } catch (error) {
      toast.error(`Failed to delete task: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full mx-auto p-8 bg-gray-900 rounded-lg shadow-xl text-white">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Todo List</h1>
        
        {/* Create Task Form */}
        <form onSubmit={handleCreateTask} className="mb-6">
          <label className="block mb-2 text-sm font-medium">New Task:</label>
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            required
            className="w-full p-3 border border-gray-600 rounded-md mb-4 bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter task content"
          />
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200">Create Task</button>
        </form>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-lg text-gray-400">No tasks are available , please create a new task to get started!. Also, make sure to connect your wallet first.</p>
            </div>
          ) : (
            <table className="min-w-full border border-gray-600">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 text-left">Content</th>
                  <th className="p-4 text-center">Completed</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-600 hover:bg-gray-800 transition duration-150">
                    <td className="p-4">{task.content}</td>
                    <td className="p-4 text-center">{task.completed ? '✅' : '❌'}</td>
                    <td className="p-4 text-center flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 transition duration-200 text-white px-4 py-2 rounded-md"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => {
                          const updatedContent = prompt("Enter updated content", task.content);
                          if (updatedContent) {
                            setUpdatedTaskContent(updatedContent);
                            handleUpdateTask(task.id, updatedContent);
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white px-4 py-2 rounded-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="bg-red-600 hover:bg-red-700 transition duration-200 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
