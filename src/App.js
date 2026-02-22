import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  // NEW: State to track which task is being edited
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('smartTasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('smartTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Milestone: Task CRUD & Status
  const addOrUpdateTask = (taskData) => {
    if (editingTask) {
      // Update existing task 
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...taskData, id: editingTask.id, status: editingTask.status } : t));
      setEditingTask(null);
    } else {
      // Add new task
      setTasks([...tasks, { ...taskData, id: Date.now(), status: 'To Do' }]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  // Milestone: Filters and sorting logic
  const processedTasks = useMemo(() => {
    return tasks
      .filter(t => (filterStatus === 'All' || t.status === filterStatus))
      .filter(t => (filterPriority === 'All' || t.priority === filterPriority))
      .sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [tasks, filterStatus, filterPriority, sortOrder]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    pending: tasks.filter(t => t.status !== 'Completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-4 md:p-8 font-sans text-gray-800 selection:bg-rose-100 selection:text-rose-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 tracking-tight mb-2">
            Smart Task Dashboard
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">Efficiently manage your daily priorities</p>
        </header>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-rose-100/50 border border-white/50 border-l-4 border-l-rose-500 transform transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-rose-500 uppercase font-bold tracking-wider">Total Tasks</p>
              <div className="p-2 bg-rose-50 rounded-lg text-rose-500">📋</div>
            </div>
            <p className="text-4xl font-black text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-amber-100/50 border border-white/50 border-l-4 border-l-amber-500 transform transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-amber-500 uppercase font-bold tracking-wider">Pending</p>
              <div className="p-2 bg-amber-50 rounded-lg text-amber-500">⏳</div>
            </div>
            <p className="text-4xl font-black text-gray-800">{stats.pending}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-emerald-100/50 border border-white/50 border-l-4 border-l-emerald-500 transform transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider">Completed</p>
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">✅</div>
            </div>
            <p className="text-4xl font-black text-gray-800">{stats.completed}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {/* TaskForm now receives editingTask and a cancel function */}
            <TaskForm
              onSave={addOrUpdateTask}
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-white/50 mb-6 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3">
                <select onChange={(e) => setFilterStatus(e.target.value)} className="bg-white/80 border-0 ring-1 ring-gray-200 rounded-xl p-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none transition shadow-sm cursor-pointer">
                  <option value="All">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select onChange={(e) => setFilterPriority(e.target.value)} className="bg-white/80 border-0 ring-1 ring-gray-200 rounded-xl p-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none transition shadow-sm cursor-pointer">
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-sm font-bold transition shadow-sm"
              >
                Sort by Date {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            <div className="space-y-4">
              {processedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onStatusChange={updateStatus}
                  onEdit={() => setEditingTask(task)} // Trigger Edit Mode
                />
              ))}
              {processedTasks.length === 0 && (
                <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 font-medium text-lg">No tasks found</p>
                  <p className="text-gray-400 text-sm mt-1">Get started by creating a new task!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;