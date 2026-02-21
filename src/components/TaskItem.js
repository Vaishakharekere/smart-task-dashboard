import React from 'react';

const TaskItem = ({ task, onDelete, onStatusChange, onEdit }) => {
    const statusStyles = {
        'To Do': 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
        'In Progress': 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
        'Completed': 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
    };

    const priorityStyles = {
        'High': 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md ring-1 ring-rose-200',
        'Medium': 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md ring-1 ring-amber-200',
        'Low': 'text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md ring-1 ring-sky-200'
    };

    return (
        <div className={`bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group ${task.status === 'Completed' ? 'opacity-75 bg-gray-50/50' : 'hover:-translate-y-0.5 hover:border-rose-100'}`}>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm ${statusStyles[task.status]}`}>
                        {task.status}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${priorityStyles[task.priority]}`}>
                        {task.priority} Priority
                    </span>
                </div>
                <h3 className={`font-extrabold text-lg text-gray-800 tracking-tight ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </h3>
                <p className={`text-sm mt-1 leading-relaxed line-clamp-2 ${task.status === 'Completed' ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-gray-400 text-sm">📅</span>
                    <p className="text-xs font-semibold text-gray-500">Due: <span className="text-gray-700">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></p>
                </div>
            </div>

            <div className="flex items-center gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    className="text-xs font-medium border-0 ring-1 ring-gray-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-rose-500 outline-none cursor-pointer shadow-sm transition-shadow"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                    <button
                        onClick={onEdit}
                        className="p-2 text-rose-500 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                        title="Edit Task"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-rose-500 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
