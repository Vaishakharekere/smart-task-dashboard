import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
    const [formData, setFormData] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' });

    // Update form when editingTask changes
    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate
            });
        } else {
            setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/50 space-y-5 transition-all duration-300 ${editingTask ? 'shadow-rose-200 ring-2 ring-rose-400 transform scale-[1.02]' : 'hover:shadow-2xl'}`}>
            <h2 className="font-extrabold text-xl text-gray-800 mb-2 flex items-center gap-2">
                {editingTask ? '📝 Edit Task' : '✨ Create New Task'}
            </h2>
            <input
                type="text" placeholder="Task Title" required
                className="w-full bg-white/80 border-0 ring-1 ring-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 outline-none transition-shadow shadow-sm placeholder-gray-400 font-medium text-gray-800"
                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                placeholder="Task Description"
                className="w-full bg-white/80 border-0 ring-1 ring-gray-200 rounded-xl p-3.5 h-28 focus:ring-2 focus:ring-rose-500 outline-none transition-shadow shadow-sm placeholder-gray-400 text-gray-700 resize-none"
                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Priority</label>
                    <select
                        className="w-full bg-white/80 border-0 ring-1 ring-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-rose-500 outline-none transition-shadow shadow-sm font-medium text-gray-700 cursor-pointer"
                        value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Due Date</label>
                    <input
                        type="date" required
                        className="w-full bg-white/80 border-0 ring-1 ring-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-rose-500 outline-none transition-shadow shadow-sm font-medium text-gray-700 cursor-pointer"
                        value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-3.5 rounded-xl hover:from-rose-600 hover:to-pink-700 transition shadow-lg shadow-rose-200 transform hover:-translate-y-0.5">
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                    <button type="button" onClick={onCancel} className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold transition shadow-sm hover:shadow">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
