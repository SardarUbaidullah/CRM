// resources/js/Components/Dashboard/KanbanBoard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Plus,
    Share2,
    Paperclip,
    Calendar,
    MoreVertical,
    Edit,
    Trash2,
    Clock,
    CheckCircle,
    AlertCircle,
    UserPlus,
    Search,
    Filter,
    Download,
    Eye,
    Star,
    ChevronDown,
    FileText,
    Users,
    Target,
    BarChart3,
    X,
    Save,
    Tag,
    User,
    AlertTriangle,
    Info,
    BarChart,
    PieChart,
    TrendingUp,
    Settings,
    Mail,
    Bell,
    Shield,
    Zap,
    Crown
} from 'lucide-react';

const KanbanBoard = ({
    tasks,
    teamMembers,
    onTaskUpdate,
    onAddTask,
    onShareProject,
    onInviteMember,
    onDeleteTask,
    user,
    userRole
}) => {
    const [draggedTask, setDraggedTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterAssignee, setFilterAssignee] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [newTaskColumn, setNewTaskColumn] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [activeTab, setActiveTab] = useState('board');
    const dropdownRef = useRef(null);

    // Enhanced columns configuration for PM
    const columns = [
        {
            id: 1,
            title: 'To Do',
            color: 'primary',
            key: 'todo',
            icon: '📋',
            description: 'Tasks waiting to start',
            progress: 0
        },
        {
            id: 2,
            title: 'In Progress',
            color: 'accent',
            key: 'progress',
            icon: '⚡',
            description: 'Tasks in progress',
            progress: 50
        },
        {
            id: 3,
            title: 'Review',
            color: 'warning',
            key: 'review',
            icon: '👀',
            description: 'Tasks under review',
            progress: 80
        },
        {
            id: 4,
            title: 'Done',
            color: 'secondary',
            key: 'done',
            icon: '✅',
            description: 'Completed tasks',
            progress: 100
        }
    ];

    const priorities = [
        { id: 'low', label: 'Low', color: 'success', icon: CheckCircle },
        { id: 'medium', label: 'Medium', color: 'warning', icon: Clock },
        { id: 'high', label: 'High', color: 'accent', icon: AlertCircle },
        { id: 'critical', label: 'Critical', color: 'error', icon: AlertTriangle }
    ];

    const statusFilters = [
        { id: 'all', label: 'All Status' },
        ...columns.map(col => ({ id: col.key, label: col.title }))
    ];

    // PM-specific stats
    const projectStats = useMemo(() => {
        const allTasks = Object.values(tasks).flat();
        return {
            totalTasks: allTasks.length,
            completedTasks: tasks.done.length,
            inProgressTasks: tasks.progress.length + tasks.review.length,
            overdueTasks: allTasks.filter(task => {
                if (!task.dueDate) return false;
                return new Date(task.dueDate) < new Date() && task.status !== 4;
            }).length,
            completionRate: Math.round((tasks.done.length / allTasks.length) * 100) || 0,
            teamProductivity: calculateTeamProductivity(),
            budgetStatus: 'On Track',
            riskLevel: 'Low'
        };
    }, [tasks]);

    const calculateTeamProductivity = () => {
        const completedThisWeek = tasks.done.filter(task => {
            const completedDate = new Date(task.updatedAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return completedDate > weekAgo;
        }).length;

        return Math.min(100, Math.round((completedThisWeek / tasks.done.length) * 100)) || 0;
    };

    // Enhanced color system using custom theme
    const getColorClasses = (color, type = 'bg') => {
        const colors = {
            primary: type === 'bg' ? 'bg-primary' :
                type === 'text' ? 'text-primary' :
                    type === 'border' ? 'border-primary' : 'bg-primary',
            accent: type === 'bg' ? 'bg-accent' :
                type === 'text' ? 'text-accent' :
                    type === 'border' ? 'border-accent' : 'bg-accent',
            secondary: type === 'bg' ? 'bg-secondary' :
                type === 'text' ? 'text-secondary' :
                    type === 'border' ? 'border-secondary' : 'bg-secondary',
            warning: type === 'bg' ? 'bg-yellow-500' :
                type === 'text' ? 'text-yellow-600' :
                    type === 'border' ? 'border-yellow-200' : 'bg-yellow-500',
            error: type === 'bg' ? 'bg-red-500' :
                type === 'text' ? 'text-red-600' :
                    type === 'border' ? 'border-red-200' : 'bg-red-500',
            success: type === 'bg' ? 'bg-emerald-500' :
                type === 'text' ? 'text-emerald-600' :
                    type === 'border' ? 'border-emerald-200' : 'bg-emerald-500',
            muted: type === 'bg' ? 'bg-muted' :
                type === 'text' ? 'text-muted-foreground' :
                    type === 'border' ? 'border-border' : 'bg-muted'
        };
        return colors[color] || colors.muted;
    };

    const getTagColorClasses = (color) => {
        const colors = {
            primary: 'bg-primary/10 text-primary border border-primary/20',
            accent: 'bg-accent/10 text-accent border border-accent/20',
            secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
            warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
            error: 'bg-red-50 text-red-700 border border-red-200',
            success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
            muted: 'bg-muted text-muted-foreground border border-border',
            purple: 'bg-purple-50 text-purple-700 border border-purple-200',
            pink: 'bg-pink-50 text-pink-700 border border-pink-200'
        };
        return colors[color] || colors.muted;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Enhanced task filtering for PM
    const filteredTasks = (columnKey) => {
        return tasks[columnKey].filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
            const matchesStatus = filterStatus === 'all' || filterStatus === columnKey;
            const matchesAssignee = filterAssignee === 'all' ||
                (task.assignedMembers && task.assignedMembers.includes(parseInt(filterAssignee)));

            return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
        });
    };

    // Enhanced drag and drop with better visual feedback
    const handleDragStart = (e, task, columnId) => {
        setDraggedTask({ ...task, sourceColumn: columnId });
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id);
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'scale(1)';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetColumnId) => {
        e.preventDefault();

        if (draggedTask && draggedTask.sourceColumn !== targetColumnId) {
            const updatedTask = {
                ...draggedTask,
                status: targetColumnId,
                tag: getColumnTag(targetColumnId),
                progress: getColumnProgress(targetColumnId),
                updatedAt: new Date().toISOString()
            };
            delete updatedTask.sourceColumn;

            onTaskUpdate(updatedTask);
            showToast(`Task moved to ${columns.find(col => col.id === targetColumnId)?.title}`, 'success');
        }
        setDraggedTask(null);
    };

    const getColumnTag = (columnId) => {
        const tagMap = {
            1: { text: 'To Do', color: 'primary' },
            2: { text: 'In Progress', color: 'accent' },
            3: { text: 'Review', color: 'warning' },
            4: { text: 'Completed', color: 'secondary' }
        };
        return tagMap[columnId] || { text: 'To Do', color: 'primary' };
    };

    const getColumnProgress = (columnId) => {
        const progressMap = {
            1: 0,
            2: 30,
            3: 80,
            4: 100
        };
        return progressMap[columnId] || 0;
    };

    // Enhanced task creation for PM
    const handleAddTask = (columnId, taskData = {}) => {
        const newTask = {
            id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: taskData.title || 'New Task',
            description: taskData.description || 'Describe your task here...',
            tag: getColumnTag(columnId),
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            comments: 0,
            files: 0,
            assignedMembers: taskData.assignedMembers || [],
            progress: getColumnProgress(columnId),
            status: columnId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isStarred: false,
            tags: taskData.tags || [],
            estimatedHours: taskData.estimatedHours || 4,
            createdBy: user?.id
        };
        onAddTask(newTask);
        showToast('New task created!', 'success');
        setIsAddingTask(false);
        setNewTaskColumn(null);
    };

    // Quick task creation modal
    const QuickAddTask = ({ columnId, onClose, onSave }) => {
        const [title, setTitle] = useState('');
        const [priority, setPriority] = useState('medium');
        const [assignee, setAssignee] = useState('');
        const [dueDate, setDueDate] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (title.trim()) {
                onSave(columnId, {
                    title: title.trim(),
                    priority,
                    assignedMembers: assignee ? [parseInt(assignee)] : [],
                    dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                });
                setTitle('');
                setAssignee('');
                setDueDate('');
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Create New Task
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter task title..."
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full p-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    {priorities.map(p => (
                                        <option key={p.id} value={p.id}>{p.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Assign To</label>
                                <select
                                    value={assignee}
                                    onChange={(e) => setAssignee(e.target.value)}
                                    className="w-full p-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Unassigned</option>
                                    {teamMembers.map(member => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        );
    };

    const handleDeleteTask = (taskId, columnKey) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDeleteTask(taskId, columnKey);
            showToast('Task deleted', 'error');
        }
    };

    const handleShareProject = () => {
        if (onShareProject) {
            onShareProject();
        } else {
            const projectUrl = window.location.href;
            navigator.clipboard.writeText(projectUrl).then(() => {
                showToast('Project link copied to clipboard!', 'success');
            }).catch(() => {
                showToast('Failed to copy link', 'error');
            });
        }
    };

    const handleInviteMember = () => {
        if (onInviteMember) {
            onInviteMember();
        } else {
            const email = prompt('Enter email address to invite:');
            if (email) {
                showToast(`Invitation sent to ${email}`, 'success');
            }
        }
    };

    const toggleTaskStar = (task, columnKey) => {
        const updatedTask = { ...task, isStarred: !task.isStarred, updatedAt: new Date().toISOString() };
        onTaskUpdate(updatedTask);
        showToast(updatedTask.isStarred ? 'Task starred' : 'Task unstarred', 'success');
    };

    // Enhanced date formatting
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = date - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Tomorrow';
            if (diffDays === -1) return 'Yesterday';
            if (diffDays < 0) return `${Math.abs(diffDays)}d ago`;
            return `in ${diffDays}d`;
        } catch (error) {
            return '';
        }
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        try {
            return new Date(dueDate) < new Date() && formatDate(dueDate).includes('ago');
        } catch (error) {
            return false;
        }
    };

    const getPriorityIcon = (priority) => {
        const priorityConfig = priorities.find(p => p.id === priority) || priorities[1];
        const IconComponent = priorityConfig.icon;
        return <IconComponent size={14} className={getColorClasses(priorityConfig.color, 'text')} />;
    };

    // Enhanced toast system
    const showToast = (message, type = 'success') => {
        const id = Date.now().toString();
        const newToast = { id, message, type };
        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    // PM-specific components
    const ProjectOverview = () => (
        <div className="space-y-6">
            {/* PM-specific Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Team Productivity</p>
                            <p className="text-2xl font-bold text-gray-900">{projectStats.teamProductivity}%</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp size={20} className="text-green-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Budget Status</p>
                            <p className="text-2xl font-bold text-gray-900">{projectStats.budgetStatus}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BarChart size={20} className="text-blue-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Risk Level</p>
                            <p className="text-2xl font-bold text-gray-900">{projectStats.riskLevel}</p>
                        </div>
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Shield size={20} className="text-yellow-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Team Members</p>
                            <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users size={20} className="text-purple-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
                <div className="space-y-4">
                    {teamMembers.map(member => {
                        const memberTasks = Object.values(tasks).flat().filter(task =>
                            task.assignedMembers?.includes(member.id)
                        );
                        const completedTasks = memberTasks.filter(task => task.status === 4).length;
                        const completionRate = memberTasks.length > 0 ? Math.round((completedTasks / memberTasks.length) * 100) : 0;

                        return (
                            <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={member.avatar}
                                        alt={member.name}
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                        <p className="text-sm text-gray-600">{member.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {completedTasks}/{memberTasks.length} tasks
                                    </p>
                                    <p className="text-sm text-gray-600">{completionRate}% completion</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const TaskDetailModal = ({ task, onClose, onUpdate }) => {
        const [editedTask, setEditedTask] = useState(task);
        const [activeTab, setActiveTab] = useState('details');
        const [newComment, setNewComment] = useState('');

        const handleSave = () => {
            onUpdate({ ...editedTask, updatedAt: new Date().toISOString() });
            onClose();
            showToast('Task updated successfully!', 'success');
        };

        const assignMember = (memberId) => {
            const updatedMembers = editedTask.assignedMembers.includes(memberId)
                ? editedTask.assignedMembers.filter(id => id !== memberId)
                : [...editedTask.assignedMembers, memberId];
            setEditedTask({ ...editedTask, assignedMembers: updatedMembers });
        };

        const addComment = () => {
            if (newComment.trim()) {
                const updatedTask = {
                    ...editedTask,
                    comments: (editedTask.comments || 0) + 1,
                    activity: [
                        ...(editedTask.activity || []),
                        {
                            id: Date.now(),
                            type: 'comment',
                            user: user?.name || 'Project Manager',
                            content: newComment,
                            timestamp: new Date().toISOString()
                        }
                    ]
                };
                setEditedTask(updatedTask);
                setNewComment('');
            }
        };

        if (!task) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start p-6 border-b border-gray-200">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                className="w-full text-2xl font-bold border-none bg-transparent focus:outline-none focus:ring-0 p-0 text-gray-900"
                                placeholder="Task title"
                            />
                            <div className="flex items-center space-x-4 mt-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded ${getTagColorClasses(editedTask.tag.color)}`}>
                                    {editedTask.tag.text}
                                </span>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                    <Clock size={14} />
                                    <span>Created {formatDate(editedTask.createdAt)}</span>
                                </div>
                                {editedTask.updatedAt !== editedTask.createdAt && (
                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                        <Edit size={14} />
                                        <span>Updated {formatDate(editedTask.updatedAt)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setEditedTask({ ...editedTask, isStarred: !editedTask.isStarred })}
                                className={`p-2 rounded-lg ${editedTask.isStarred ? 'text-yellow-500 bg-yellow-50' : 'text-gray-500 hover:text-yellow-500'}`}
                            >
                                <Star size={20} fill={editedTask.isStarred ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8 px-6">
                            {['details', 'comments', 'activity'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 border-b-2 font-medium capitalize transition-colors ${activeTab === tab
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6">
                            {activeTab === 'details' && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                                        <textarea
                                            value={editedTask.description}
                                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary h-24 text-gray-900"
                                            placeholder="Add a description..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">Due Date</label>
                                            <input
                                                type="date"
                                                value={editedTask.dueDate}
                                                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">Priority</label>
                                            <select
                                                value={editedTask.priority}
                                                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                                            >
                                                {priorities.map(priority => (
                                                    <option key={priority.id} value={priority.id}>
                                                        {priority.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Team Members</label>
                                        <div className="flex flex-wrap gap-2">
                                            {teamMembers.map(member => (
                                                <div
                                                    key={member.id}
                                                    onClick={() => assignMember(member.id)}
                                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${editedTask.assignedMembers.includes(member.id)
                                                        ? 'bg-primary/10 border-primary/20'
                                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <img
                                                        className="w-6 h-6 rounded-full"
                                                        src={member.avatar}
                                                        alt={member.name}
                                                    />
                                                    <span className="text-sm text-gray-700">{member.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div className="space-y-4">
                                    <div className="flex space-x-3">
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                                            onKeyPress={(e) => e.key === 'Enter' && addComment()}
                                        />
                                        <button
                                            onClick={addComment}
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(editedTask.activity || []).filter(activity => activity.type === 'comment').map(comment => (
                                            <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-medium text-gray-900">{comment.user}</span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(comment.timestamp)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">{comment.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="space-y-3">
                                    {(editedTask.activity || []).map(activity => (
                                        <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className={`w-2 h-2 mt-2 rounded-full ${getColorClasses('primary', 'bg')}`} />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium text-gray-900">{activity.user}</span>
                                                    <span className="text-gray-600"> {activity.content}</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDate(activity.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={() => {
                                const columnKey = Object.keys(tasks).find(key =>
                                    tasks[key].some(t => t.id === task.id)
                                );
                                handleDeleteTask(task.id, columnKey);
                                onClose();
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>Delete Task</span>
                        </button>
                        <div className="flex space-x-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    // Toast Component
    const Toast = ({ toast, onClose }) => (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg font-medium ${toast.type === 'success' ? 'bg-green-500 text-white' :
                toast.type === 'error' ? 'bg-red-500 text-white' :
                    'bg-blue-500 text-white'
                }`}
        >
            <span>{toast.message}</span>
            <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                <X size={16} />
            </button>
        </motion.div>
    );

    return (
        <div className="flex-1 p-6 overflow-auto bg-gray-50 min-h-screen">
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            toast={toast}
                            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* PM-specific Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
                <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center space-x-3">
                            <Crown size={24} className="text-yellow-500" />
                            <h1 className="text-3xl font-bold text-gray-900">Project Manager Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-600">Project Lead: {user?.name}</span>
                        </div>
                    </div>
                    <p className="text-gray-600">Manage your team's tasks, track progress, and monitor project health</p>
                </div>

                {/* PM-specific Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* View Toggle */}
                    <div className="flex border border-gray-300 rounded-lg bg-white overflow-hidden text-gray-700">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2.5 transition-colors ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('board')}
                            className={`px-4 py-2.5 transition-colors ${activeTab === 'board' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                        >
                            Board
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white w-full sm:w-64"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setActiveDropdown(activeDropdown === 'filter' ? null : 'filter')}
                            className="flex items-center space-x-2 px-4 py-2.5 border text-gray-700 border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                        >
                            <Filter size={18} />
                            <span>Filter</span>
                            <ChevronDown size={16} />
                        </button>

                        {activeDropdown === 'filter' && (
                            <div className="absolute text-gray-900 top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="p-3 space-y-3">
                                    <div>
                                        <div className="text-xs font-medium text-gray-500 px-2 py-1">Priority</div>
                                        {priorities.map(priority => (
                                            <button
                                                key={priority.id}
                                                onClick={() => {
                                                    setFilterPriority(priority.id);
                                                    setActiveDropdown(null);
                                                }}
                                                className={`flex items-center space-x-2 w-full px-2 py-2 rounded text-sm transition-colors ${filterPriority === priority.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                                            >
                                                {getPriorityIcon(priority.id)}
                                                <span>{priority.label}</span>
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => {
                                                setFilterPriority('all');
                                                setActiveDropdown(null);
                                            }}
                                            className="flex items-center space-x-2 w-full px-2 py-2 rounded text-sm hover:bg-gray-50"
                                        >
                                            <span>All Priorities</span>
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="text-xs font-medium text-gray-500 px-2 py-1">Status</div>
                                        {statusFilters.map(status => (
                                            <button
                                                key={status.id}
                                                onClick={() => {
                                                    setFilterStatus(status.id);
                                                    setActiveDropdown(null);
                                                }}
                                                className={`flex items-center space-x-2 w-full px-2 py-2 rounded text-sm transition-colors ${filterStatus === status.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                                            >
                                                <span>{status.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="text-xs font-medium text-gray-500 px-2 py-1">Assignee</div>
                                        <button
                                            onClick={() => {
                                                setFilterAssignee('all');
                                                setActiveDropdown(null);
                                            }}
                                            className={`flex items-center space-x-2 w-full px-2 py-2 rounded text-sm transition-colors ${filterAssignee === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                                        >
                                            <span>All Team Members</span>
                                        </button>
                                        {teamMembers.map(member => (
                                            <button
                                                key={member.id}
                                                onClick={() => {
                                                    setFilterAssignee(member.id.toString());
                                                    setActiveDropdown(null);
                                                }}
                                                className={`flex items-center space-x-2 w-full px-2 py-2 rounded text-sm transition-colors ${filterAssignee === member.id.toString() ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                                            >
                                                <img
                                                    className="w-4 h-4 rounded-full"
                                                    src={member.avatar}
                                                    alt={member.name}
                                                />
                                                <span>{member.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Project Overview Tab */}
            {activeTab === 'overview' && <ProjectOverview />}

            {/* Kanban Board Tab */}
            {activeTab === 'board' && (
                <>
                    {/* Enhanced Stats Overview for PM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                                    <p className="text-2xl font-bold text-gray-900">{projectStats.totalTasks}</p>
                                </div>
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Target size={20} className="text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                                    <p className="text-2xl font-bold text-gray-900">{projectStats.inProgressTasks}</p>
                                </div>
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <BarChart3 size={20} className="text-accent" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-900">{projectStats.completedTasks}</p>
                                </div>
                                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <CheckCircle size={20} className="text-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                                    <p className="text-2xl font-bold text-gray-900">{projectStats.overdueTasks}</p>
                                </div>
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <AlertCircle size={20} className="text-red-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Completion</p>
                                    <p className="text-2xl font-bold text-gray-900">{projectStats.completionRate}%</p>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Users size={20} className="text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Kanban Columns */}
                    <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
                        {columns.map((column) => (
                            <motion.div
                                key={column.id}
                                layout
                                className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, column.id)}
                            >
                                {/* Enhanced Column Header */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getColorClasses(column.color, 'bg')} ${getColorClasses(column.color, 'text')}`}>
                                                <span className="text-sm">{column.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                                                <p className="text-xs text-gray-500">
                                                    {filteredTasks(column.key).length} of {tasks[column.key].length} tasks
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => {
                                                    setNewTaskColumn(column.id);
                                                    setIsAddingTask(true);
                                                }}
                                                className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-200"
                                                title="Add Task"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`h-1 rounded-full ${getColorClasses(column.color, 'bg')}`} />
                                </div>

                                {/* Task Cards */}
                                <div className="p-4 space-y-3 min-h-[200px]">
                                    <AnimatePresence>
                                        {filteredTasks(column.key).map((task) => (
                                            <motion.div
                                                key={task.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.2 }}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, task, column.id)}
                                                onDragEnd={handleDragEnd}
                                                onClick={() => setSelectedTask(task)}
                                                className="group bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] relative"
                                            >
                                                {/* Star Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleTaskStar(task, column.key);
                                                    }}
                                                    className={`absolute -top-2 -right-2 p-1.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity ${task.isStarred ? 'opacity-100 text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
                                                >
                                                    <Star size={14} fill={task.isStarred ? 'currentColor' : 'none'} />
                                                </button>

                                                {/* Header with Priority and Due Date */}
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center space-x-2">
                                                        {getPriorityIcon(task.priority)}
                                                        <span className={`text-xs font-medium px-2 py-1 rounded ${getTagColorClasses(task.tag.color)}`}>
                                                            {task.tag.text}
                                                        </span>
                                                    </div>
                                                    {task.dueDate && (
                                                        <div className={`flex items-center space-x-1 text-xs ${isOverdue(task.dueDate)
                                                            ? 'text-red-500 bg-red-50 px-2 py-1 rounded'
                                                            : 'text-gray-500'
                                                            }`}>
                                                            <Calendar size={12} />
                                                            <span>{formatDate(task.dueDate)}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Title & Description */}
                                                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{task.title}</h4>
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

                                                {/* Progress bar */}
                                                {task.progress !== undefined && task.progress > 0 && (
                                                    <div className="mb-4">
                                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                            <span>Progress</span>
                                                            <span>{task.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full transition-all duration-500 ${getColorClasses(
                                                                    task.progress < 30 ? 'error' :
                                                                        task.progress < 70 ? 'accent' :
                                                                            task.progress < 100 ? 'primary' : 'secondary', 'bg'
                                                                )}`}
                                                                style={{ width: `${task.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Footer */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex -space-x-2">
                                                            {task.assignedMembers && task.assignedMembers.slice(0, 3).map((memberId) => {
                                                                const member = teamMembers.find(m => m.id === memberId);
                                                                return member ? (
                                                                    <img
                                                                        key={member.id}
                                                                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                                                        src={member.avatar}
                                                                        alt={member.name}
                                                                        title={member.name}
                                                                    />
                                                                ) : null;
                                                            })}
                                                            {task.assignedMembers && task.assignedMembers.length > 3 && (
                                                                <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs text-gray-600 shadow-sm">
                                                                    +{task.assignedMembers.length - 3}
                                                                </div>
                                                            )}
                                                            {(!task.assignedMembers || task.assignedMembers.length === 0) && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedTask(task);
                                                                    }}
                                                                    className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                                                                    title="Assign members"
                                                                >
                                                                    <UserPlus size={12} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-gray-500 text-sm">
                                                        {task.comments > 0 && (
                                                            <span className="flex items-center space-x-1">
                                                                <MessageSquare size={14} />
                                                                <span className="text-xs">{task.comments}</span>
                                                            </span>
                                                        )}
                                                        {task.files > 0 && (
                                                            <span className="flex items-center space-x-1">
                                                                <Paperclip size={14} />
                                                                <span className="text-xs">{task.files}</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Empty state */}
                                    {filteredTasks(column.key).length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500 hover:border-primary/50 transition-colors"
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, column.id)}
                                        >
                                            <Plus size={24} className="mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm">No tasks found</p>
                                            <p className="text-xs mt-1">Drag tasks here or click + to add</p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Task Detail Modal */}
            <AnimatePresence>
                {selectedTask && (
                    <TaskDetailModal
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                        onUpdate={(updatedTask) => {
                            onTaskUpdate(updatedTask);
                            setSelectedTask(null);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Quick Add Task Modal */}
            <AnimatePresence>
                {isAddingTask && (
                    <QuickAddTask
                        columnId={newTaskColumn}
                        onClose={() => {
                            setIsAddingTask(false);
                            setNewTaskColumn(null);
                        }}
                        onSave={handleAddTask}
                    />
                )}
            </AnimatePresence>

            {/* Enhanced Quick Actions FAB for PM */}
            <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
                <button
                    onClick={handleInviteMember}
                    className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center group"
                    title="Invite Team Members"
                >
                    <UserPlus size={20} />
                    <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Invite Members
                    </span>
                </button>
                <button
                    onClick={handleShareProject}
                    className="bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary/90 transition-all duration-200 flex items-center justify-center group"
                    title="Share Project"
                >
                    <Share2 size={20} />
                    <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Share Project
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab(activeTab === 'overview' ? 'board' : 'overview')}
                    className="bg-accent text-white p-4 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-200 flex items-center justify-center group"
                    title="Toggle View"
                >
                    <BarChart size={20} />
                    <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {activeTab === 'overview' ? 'Show Board' : 'Show Overview'}
                    </span>
                </button>
            </div>
        </div>
    );
};

// Default props for safety
KanbanBoard.defaultProps = {
    tasks: {
        todo: [],
        progress: [],
        review: [],
        done: []
    },
    teamMembers: [],
    onTaskUpdate: () => console.warn('onTaskUpdate not implemented'),
    onAddTask: () => console.warn('onAddTask not implemented'),
    onDeleteTask: () => console.warn('onDeleteTask not implemented')
};

export default KanbanBoard;