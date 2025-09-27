import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './components/TodoList';
import Sidebar from '../../components/Sidebar';
import NewTask from './components/NewTask';
import api from '../../server/api';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);

  const todayDate = selectedDate.toISOString().slice(0, 10);

  const filteredTasks = selectedTask
    ? [selectedTask]
    : selectedCategory
    ? tasks.filter((task) => task.tags.includes(selectedCategory))
    : tasks;

  // Function to fetch tasks for a specific date
  const fetchTasks = useCallback(
    async (date = todayDate) => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/tasks', {
          params: { date },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setTasks(response.data);
      } catch (err) {
        console.error(
          'Failed to fetch tasks:',
          err.response?.data?.message || err.message
        );
      }
    },
    [todayDate]
  );

  // Fetch tasks whenever selectedDate changes
  useEffect(() => {
    fetchTasks(todayDate);
  }, [selectedDate, todayDate, fetchTasks]);

  const handleAddTask = () => {
    setSelectedTask(null);
    setShowNewTask(true);
  };

  return (
    <div className='flex h-screen'>
      <Sidebar
        tasks={tasks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setShowNewTask={setShowNewTask}
      />

      <main className='flex-1 p-6 overflow-y-auto'>
        {showNewTask ? (
          <NewTask setShowNewTask={setShowNewTask} fetchTasks={fetchTasks} />
        ) : (
          <TodoList
            tasks={filteredTasks}
            selectedTask={selectedTask}
            onAddTask={handleAddTask}
          />
        )}
      </main>
    </div>
  );
};

export default Task;
