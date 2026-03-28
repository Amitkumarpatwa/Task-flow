import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Editing state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data.tasks);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setIsSubmitting(true);
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if(!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'pending' ? 'in-progress' : currentStatus === 'in-progress' ? 'completed' : 'pending';
    try {
      await api.put(`/tasks/${id}`, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdateTask = async (id) => {
    if (!editTitle || !editDescription) return;
    
    setIsUpdating(true);
    try {
      await api.put(`/tasks/${id}`, { 
        title: editTitle, 
        description: editDescription 
      });
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading Dashboard...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      
      {/* Sidebar: Add Task Form */}
      <div>
        <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Add New Task</h3>
          
          {error && <div className="alert alert-error" style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{error}</div>}

          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Task Title</label>
              <input
                id="title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Update Resume"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Task Description</label>
              <textarea
                id="description"
                className="form-input"
                style={{ resize: 'vertical', minHeight: '100px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of what needs to be done..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Content: Task List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#fff' }}>Your Tasks <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginLeft: '10px' }}>({tasks.length})</span></h2>
        </div>

        {tasks.length === 0 ? (
           <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
             <p>No tasks found. Create one to get started!</p>
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map(task => (
              <div key={task._id} className="glass-panel fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {editingTaskId === task._id ? (
                  /* Edit Mode */
                  <div style={{ width: '100%' }}>
                    <div className="form-group">
                      <input
                        className="form-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Task Title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-input"
                        style={{ resize: 'vertical', minHeight: '80px' }}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Task Description"
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={handleCancelEdit}
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleUpdateTask(task._id)}
                        className="btn btn-primary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Update Task'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.125rem', color: '#fff', margin: 0 }}>{task.title}</h4>
                        <span 
                          onClick={() => handleStatusChange(task._id, task.status)}
                          style={{ 
                            fontSize: '0.75rem', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '20px', 
                            cursor: 'pointer',
                            background: task.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : task.status === 'in-progress' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                            color: task.status === 'completed' ? '#6ee7b7' : task.status === 'in-progress' ? '#fbbf24' : '#cbd5e1',
                            border: `1px solid ${task.status === 'completed' ? 'rgba(16, 185, 129, 0.5)' : task.status === 'in-progress' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(148, 163, 184, 0.5)'}`
                          }}
                        >
                          {task.status.toUpperCase()}
                        </span>
                        {user?.role === 'admin' && task.user && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>
                            User: {task.user.email}
                          </span>
                        )}
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>{task.description}</p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEditClick(task)}
                        style={{
                          background: 'rgba(79, 70, 229, 0.1)',
                          border: '1px solid rgba(79, 70, 229, 0.2)',
                          color: '#a5b4fc',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(79, 70, 229, 0.2)'; e.currentTarget.style.color = '#fff' }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)'; e.currentTarget.style.color = '#a5b4fc' }}
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          color: '#fca5a5',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#fff' }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#fca5a5' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
