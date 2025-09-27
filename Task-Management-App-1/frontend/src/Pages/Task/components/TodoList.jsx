import React from 'react';
import { Check, Plus } from 'lucide-react';

const TodoList = ({ tasks = [], selectedTask, onAddTask }) => {
  const displayTasks = selectedTask ? [selectedTask] : tasks;

  return (
    <main className='flex-1 p-8 overflow-y-auto bg-white'>
      <h2 className='text-3xl font-bold mb-8 text-gray-900'>
        {selectedTask ? 'Task Details' : 'Tasks'}
      </h2>

      <div className='space-y-4'>
        {displayTasks.length === 0 && (
          <p className='text-gray-400'>No tasks available</p>
        )}

        {displayTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg shadow-sm flex items-center ${
              task.color || 'bg-gray-100'
            } border border-gray-100 transition-shadow`}
          >
            <div className='w-5 h-5 mr-4 border border-gray-300 rounded-md flex items-center justify-center'>
              <Check className='w-3 h-3 text-gray-600' />
            </div>
            <div>
              <p className='font-medium text-gray-800 text-lg'>{task.title}</p>
              {task.tags && (
                <div className='flex space-x-2 mt-1'>
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className='text-xs bg-gray-200 px-2 py-1 rounded-full'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <div className='fixed bottom-8 right-8'>
        <button
          className='bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 transition'
          onClick={onAddTask} // show NewTask
        >
          <Plus className='w-6 h-6' />
        </button>
      </div>
    </main>
  );
};

export default TodoList;
