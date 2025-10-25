// resources/js/Components/Dashboard/TeamMemberDashboard.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, CheckCircle, AlertCircle, Calendar,
    Target, BarChart3, Users, MessageSquare,
    FileText, Star, Filter, Search, Plus,
    ChevronDown, Eye, Play, Square, CheckSquare,
    User, Paperclip, AlertTriangle,
    PlayCircle,
    StopCircle,
    Flag,
    ThumbsUp
} from 'lucide-react';

const TeamMemberDashboard = ({ user, onTaskUpdate, onAddTask }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [timeTracking, setTimeTracking] = useState({});
    const [viewMode, setViewMode] = useState('board');
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [activeTimeTrackers, setActiveTimeTrackers] = useState({});

    // Initialize with sample data
    useEffect(() => {
        // Sample tasks data
        const sampleTasks = [
            {
                id: 1,
                title: 'Design user authentication flow',
                description: 'Create wireframes and user stories for the login/signup process',
                status: 'todo',
                priority: 'high',
                progress: 0,
                dueDate: '2024-02-20',
                projectId: 1,
                assignedMembers: [1],
                tag: { text: 'Design', color: 'purple' },
                comments: 3,
                attachments: 2,
                isStarred: true,
                createdAt: '2024-02-01',
                updatedAt: '2024-02-15'
            },
            {
                id: 2,
                title: 'Implement API endpoints for user management',
                description: 'Develop RESTful APIs for user CRUD operations with proper validation',
                status: 'progress',
                priority: 'high',
                progress: 65,
                dueDate: '2024-02-25',
                projectId: 1,
                assignedMembers: [1],
                tag: { text: 'Backend', color: 'blue' },
                comments: 5,
                attachments: 1,
                isStarred: false,
                createdAt: '2024-02-05',
                updatedAt: '2024-02-18'
            },
            {
                id: 3,
                title: 'Write unit tests for authentication module',
                description: 'Create comprehensive test coverage for login and registration features',
                status: 'todo',
                priority: 'medium',
                progress: 0,
                dueDate: '2024-02-28',
                projectId: 1,
                assignedMembers: [1],
                tag: { text: 'Testing', color: 'green' },
                comments: 2,
                attachments: 0,
                isStarred: false,
                createdAt: '2024-02-10',
                updatedAt: '2024-02-10'
            },
            {
                id: 4,
                title: 'Optimize database queries',
                description: 'Improve performance of frequently used database queries',
                status: 'review',
                priority: 'medium',
                progress: 100,
                dueDate: '2024-02-15',
                projectId: 2,
                assignedMembers: [1],
                tag: { text: 'Database', color: 'orange' },
                comments: 4,
                attachments: 3,
                isStarred: true,
                createdAt: '2024-01-28',
                updatedAt: '2024-02-14'
            },
            {
                id: 5,
                title: 'Update documentation',
                description: 'Refresh API documentation with latest changes and examples',
                status: 'done',
                priority: 'low',
                progress: 100,
                dueDate: '2024-02-10',
                projectId: 1,
                assignedMembers: [1],
                tag: { text: 'Documentation', color: 'gray' },
                comments: 1,
                attachments: 0,
                isStarred: false,
                createdAt: '2024-02-01',
                updatedAt: '2024-02-09'
            }
        ];

        // Sample projects
        const sampleProjects = [
            { id: 1, name: 'Website Redesign', color: '#19874D' },
            { id: 2, name: 'Mobile App', color: '#AE9B85' },
            { id: 3, name: 'API Development', color: '#F59522' }
        ];

        // Sample team members
        const sampleTeamMembers = [
            {
                id: 1,
                name: 'You',
                role: 'Full Stack Developer',
                avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            }
        ];

        setTasks(sampleTasks);
        setProjects(sampleProjects);
        setTeamMembers(sampleTeamMembers);
    }, [user]);

    // Filter tasks assigned to current user
    const myTasks = useMemo(() => {
        return tasks.filter(task =>
            task.assignedMembers?.includes(user?.id || 1) &&
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (activeFilter === 'all' || task.status === activeFilter)
        );
    }, [tasks, user, searchTerm, activeFilter]);

    // Calculate personal metrics
    const personalStats = useMemo(() => {
        const totalAssigned = myTasks.length;
        const completed = myTasks.filter(t => t.status === 'done').length;
        const inProgress = myTasks.filter(t => t.status === 'progress').length;
        const overdue = myTasks.filter(t => {
            if (!t.dueDate) return false;
            return new Date(t.dueDate) < new Date() && t.status !== 'done';
        }).length;

        return {
            totalAssigned,
            completed,
            inProgress,
            overdue,
            completionRate: Math.round((completed / totalAssigned) * 100) || 0,
            starred: myTasks.filter(t => t.isStarred).length,
            timeSpent: Object.values(timeTracking).reduce((total, time) => total + time, 0)
        };
    }, [myTasks, timeTracking]);

    // Today's priorities (due today or overdue)
    const todaysPriorities = useMemo(() =>
        myTasks.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            return dueDate.toDateString() === today.toDateString() ||
                (dueDate < today && task.status !== 'done');
        }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
        [myTasks]
    );

    // Quick actions
    const quickActions = [
        {
            id: 'log-time',
            label: 'Log Time',
            icon: Clock,
            color: 'primary',
            action: () => handleQuickAction('log-time')
        },
        {
            id: 'request-review',
            label: 'Request Review',
            icon: CheckSquare,
            color: 'accent',
            action: () => handleQuickAction('request-review')
        },
        {
            id: 'ask-help',
            label: 'Ask for Help',
            icon: Users,
            color: 'secondary',
            action: () => handleQuickAction('ask-help')
        },
        {
            id: 'report-blocker',
            label: 'Report Blocker',
            icon: AlertTriangle,
            color: 'accent',
            action: () => handleQuickAction('report-blocker')
        }
    ];

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const startTimeTracking = (taskId) => {
        setActiveTimeTrackers(prev => ({
            ...prev,
            [taskId]: Date.now()
        }));
    };

    const stopTimeTracking = (taskId) => {
        if (activeTimeTrackers[taskId]) {
            const startTime = activeTimeTrackers[taskId];
            const elapsedMinutes = Math.floor((Date.now() - startTime) / (1000 * 60));

            setTimeTracking(prev => ({
                ...prev,
                [taskId]: (prev[taskId] || 0) + elapsedMinutes
            }));

            setActiveTimeTrackers(prev => {
                const newTrackers = { ...prev };
                delete newTrackers[taskId];
                return newTrackers;
            });
        }
    };

    const updateTaskStatus = (task, newStatus) => {
        const updatedTask = {
            ...task,
            status: newStatus,
            progress: newStatus === 'done' ? 100 : newStatus === 'progress' ? 50 : task.progress,
            updatedAt: new Date().toISOString()
        };

        setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));

        if (onTaskUpdate) {
            onTaskUpdate(updatedTask);
        }
    };

    const toggleTaskStar = (task) => {
        const updatedTask = {
            ...task,
            isStarred: !task.isStarred,
            updatedAt: new Date().toISOString()
        };

        setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));

        if (onTaskUpdate) {
            onTaskUpdate(updatedTask);
        }
    };

    const handleQuickAction = (actionId) => {
        const messages = {
            'log-time': 'Time logging modal opened',
            'request-review': 'Review request submitted',
            'ask-help': 'Help request sent to team',
            'report-blocker': 'Blocker reported to project manager'
        };

        // Show notification for the action
        console.log(`Action: ${actionId} - ${messages[actionId]}`);

        // In a real app, you might want to show a toast notification here
        alert(messages[actionId]);
    };

    const getStatusColor = (status) => {
        const colors = {
            todo: 'bg-[#D9D9D9] text-black',
            progress: 'bg-[#F59522] text-white',
            review: 'bg-[#AE9B85] text-white',
            done: 'bg-[#19874D] text-white'
        };
        return colors[status] || 'bg-[#D9D9D9] text-black';
    };

    const getStatusText = (status) => {
        const texts = {
            todo: 'To Do',
            progress: 'In Progress',
            review: 'In Review',
            done: 'Completed'
        };
        return texts[status] || status;
    };

    const getPriorityColor = (priority) => {
        const colors = {
            high: 'bg-red-500',
            medium: 'bg-[#F59522]',
            low: 'bg-[#19874D]'
        };
        return colors[priority] || 'bg-[#D9D9D9]';
    };

    const TaskCard = ({ task }) => {
        const isTracking = activeTimeTrackers[task.id];
        const project = projects.find(p => p.id === task.projectId);

        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedTask(task)}
            >
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                        {project && (
                            <span
                                className="text-xs font-medium px-2 py-1 rounded text-white"
                                style={{ backgroundColor: project.color }}
                            >
                                {project.name}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskStar(task);
                        }}
                        className={`p-1 rounded ${task.isStarred ? 'text-[#F59522]' : 'text-gray-400 hover:text-[#F59522]'}`}
                    >
                        <Star size={16} fill={task.isStarred ? 'currentColor' : 'none'} />
                    </button>
                </div>

                <h4 className="font-semibold text-black mb-2 line-clamp-2">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                {/* Progress */}
                {task.progress > 0 && task.status !== 'done' && (
                    <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-[#19874D] transition-all duration-500"
                                style={{ width: `${task.progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                        {task.dueDate && (
                            <span className={`flex items-center space-x-1 ${new Date(task.dueDate) < new Date() && task.status !== 'done' ? 'text-red-500' : ''
                                }`}>
                                <Calendar size={12} />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </span>
                        )}
                        {task.comments > 0 && (
                            <span className="flex items-center space-x-1">
                                <MessageSquare size={12} />
                                <span>{task.comments}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex space-x-1">
                        {isTracking ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    stopTimeTracking(task.id);
                                }}
                                className="p-1 text-red-500 hover:text-red-600 transition-colors"
                                title="Stop time tracking"
                            >
                                <StopCircle size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startTimeTracking(task.id);
                                }}
                                className="p-1 text-gray-500 hover:text-[#19874D] transition-colors"
                                title="Start time tracking"
                            >
                                <PlayCircle size={16} />
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateTaskStatus(task, task.status === 'done' ? 'todo' : 'done');
                            }}
                            className={`p-1 transition-colors ${task.status === 'done'
                                ? 'text-[#19874D] hover:text-[#146c3e]'
                                : 'text-gray-500 hover:text-[#19874D]'
                                }`}
                            title={task.status === 'done' ? 'Mark incomplete' : 'Mark complete'}
                        >
                            <CheckSquare size={16} />
                        </button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mt-3 flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                    </span>
                    {timeTracking[task.id] && (
                        <span className="text-xs text-gray-500">
                            {formatTime(timeTracking[task.id])}
                        </span>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="flex-1 p-6 bg-[#FCF8F3] min-h-screen">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black mb-2">
                        Welcome back, {user?.name?.split(' ')[0] || 'Team Member'}!
                    </h1>
                    <p className="text-gray-600">Here's your work for today</p>
                </div>

                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search my tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] w-64 bg-white"
                        />
                    </div>

                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] bg-white"
                    >
                        <option value="all">All Tasks</option>
                        <option value="todo">To Do</option>
                        <option value="progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="done">Completed</option>
                    </select>
                </div>
            </div>

            {/* Personal Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Assigned</p>
                            <p className="text-2xl font-bold text-black">{personalStats.totalAssigned}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#19874D]/10 rounded-lg flex items-center justify-center">
                            <Target size={20} className="text-[#19874D]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-black">{personalStats.completed}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#19874D]/10 rounded-lg flex items-center justify-center">
                            <CheckCircle size={20} className="text-[#19874D]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-black">{personalStats.inProgress}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#AE9B85]/10 rounded-lg flex items-center justify-center">
                            <BarChart3 size={20} className="text-[#AE9B85]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Overdue</p>
                            <p className="text-2xl font-bold text-black">{personalStats.overdue}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#F59522]/10 rounded-lg flex items-center justify-center">
                            <AlertCircle size={20} className="text-[#F59522]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completion</p>
                            <p className="text-2xl font-bold text-black">{personalStats.completionRate}%</p>
                        </div>
                        <div className="w-10 h-10 bg-[#AE9B85]/10 rounded-lg flex items-center justify-center">
                            <Star size={20} className="text-[#AE9B85]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Time Spent</p>
                            <p className="text-2xl font-bold text-black">
                                {formatTime(personalStats.timeSpent).split(' ')[0]}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-[#F59522]/10 rounded-lg flex items-center justify-center">
                            <Clock size={20} className="text-[#F59522]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Task Board */}
                <div className="xl:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-black">My Tasks</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('board')}
                                className={`px-3 py-1 rounded-lg ${viewMode === 'board' ? 'bg-[#19874D] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                            >
                                Board
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1 rounded-lg ${viewMode === 'list' ? 'bg-[#19874D] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                            >
                                List
                            </button>
                        </div>
                    </div>

                    {myTasks.length === 0 ? (
                        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                            <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-black mb-2">No tasks assigned</h3>
                            <p className="text-gray-600 mb-4">You're all caught up! Enjoy your free time.</p>
                            <button className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors">
                                Request More Work
                            </button>
                        </div>
                    ) : (
                        <div className={`grid gap-4 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                            <AnimatePresence>
                                {myTasks.map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Today's Priorities */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                            <AlertCircle size={20} className="text-[#F59522] mr-2" />
                            Today's Priorities
                        </h3>
                        <div className="space-y-3">
                            {todaysPriorities.slice(0, 5).map(task => (
                                <div key={task.id} className="flex items-center justify-between p-3 bg-[#F59522]/10 rounded-lg border border-[#F59522]/20">
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-black">{task.title}</p>
                                        <p className="text-xs text-[#F59522]">
                                            Due {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => updateTaskStatus(task, 'progress')}
                                        className="px-3 py-1 bg-[#F59522] text-white text-xs rounded hover:bg-[#e0861a] transition-colors whitespace-nowrap"
                                    >
                                        Start
                                    </button>
                                </div>
                            ))}
                            {todaysPriorities.length === 0 && (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    No urgent tasks for today! 🎉
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map(action => (
                                <button
                                    key={action.id}
                                    onClick={action.action}
                                    className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-[#19874D] hover:bg-[#19874D]/5 transition-all group"
                                >
                                    <div className={`w-10 h-10 ${getColorClass(action.color)} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                        <action.icon size={20} className="text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-[#19874D] text-center">
                                        {action.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Time Tracking */}
                    {Object.keys(activeTimeTrackers).length > 0 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                                <PlayCircle size={20} className="text-[#19874D] mr-2" />
                                Active Time Tracking
                            </h3>
                            <div className="space-y-3">
                                {Object.keys(activeTimeTrackers).map(taskId => {
                                    const task = myTasks.find(t => t.id === parseInt(taskId));
                                    if (!task) return null;

                                    const startTime = activeTimeTrackers[taskId];
                                    const elapsedMinutes = Math.floor((Date.now() - startTime) / (1000 * 60));

                                    return (
                                        <div key={taskId} className="flex items-center justify-between p-3 bg-[#19874D]/10 rounded-lg border border-[#19874D]/20">
                                            <div className="flex-1">
                                                <p className="font-medium text-sm text-black">{task.title}</p>
                                                <p className="text-xs text-[#19874D]">
                                                    {formatTime(elapsedMinutes)} elapsed
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => stopTimeTracking(taskId)}
                                                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors whitespace-nowrap"
                                            >
                                                Stop
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Recent Time Logs */}
                    {Object.keys(timeTracking).length > 0 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-black mb-4">Recent Time Logs</h3>
                            <div className="space-y-2">
                                {Object.entries(timeTracking)
                                    .slice(0, 3)
                                    .map(([taskId, minutes]) => {
                                        const task = myTasks.find(t => t.id === parseInt(taskId));
                                        if (!task) return null;

                                        return (
                                            <div key={taskId} className="flex justify-between items-center p-2 text-sm">
                                                <span className="text-gray-700 truncate flex-1 mr-2">{task.title}</span>
                                                <span className="text-[#19874D] font-medium whitespace-nowrap">
                                                    {formatTime(minutes)}
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Detail Modal */}
            <AnimatePresence>
                {selectedTask && (
                    <TaskDetailModal
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                        onUpdate={updateTaskStatus}
                        onTimeTrack={startTimeTracking}
                        onTimeStop={stopTimeTracking}
                        isTracking={!!activeTimeTrackers[selectedTask.id]}
                        timeSpent={timeTracking[selectedTask.id] || 0}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper function for color classes
const getColorClass = (color) => {
    const colors = {
        primary: 'bg-[#19874D]',
        secondary: 'bg-[#AE9B85]',
        accent: 'bg-[#F59522]',
        warning: 'bg-[#F59522]',
        error: 'bg-red-500'
    };
    return colors[color] || 'bg-[#D9D9D9]';
};

// Task Detail Modal Component
const TaskDetailModal = ({ task, onClose, onUpdate, onTimeTrack, onTimeStop, isTracking, timeSpent }) => {
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-black mb-2">{task.title}</h2>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Status:</span>
                            <span className="ml-2 font-medium text-black">{task.status}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Priority:</span>
                            <span className="ml-2 font-medium text-black">{task.priority}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Due Date:</span>
                            <span className="ml-2 font-medium text-black">
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Time Spent:</span>
                            <span className="ml-2 font-medium text-[#19874D]">{formatTime(timeSpent)}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex space-x-3 mb-6">
                        {!isTracking ? (
                            <button
                                onClick={() => onTimeTrack(task.id)}
                                className="flex-1 bg-[#19874D] text-white py-2 px-4 rounded-lg hover:bg-[#146c3e] transition-colors flex items-center justify-center space-x-2"
                            >
                                <PlayCircle size={16} />
                                <span>Start Time Tracking</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => onTimeStop(task.id)}
                                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                            >
                                <StopCircle size={16} />
                                <span>Stop Time Tracking</span>
                            </button>
                        )}

                        <button
                            onClick={() => onUpdate(task, task.status === 'done' ? 'todo' : 'done')}
                            className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${task.status === 'done'
                                    ? 'bg-[#D9D9D9] text-black hover:bg-gray-400'
                                    : 'bg-[#19874D] text-white hover:bg-[#146c3e]'
                                }`}
                        >
                            <CheckSquare size={16} />
                            <span>{task.status === 'done' ? 'Mark Incomplete' : 'Mark Complete'}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => onUpdate(task, 'progress')}
                            className="bg-[#F59522] text-white py-2 px-4 rounded-lg hover:bg-[#e0861a] transition-colors"
                        >
                            Mark In Progress
                        </button>
                        <button
                            onClick={() => onUpdate(task, 'review')}
                            className="bg-[#AE9B85] text-white py-2 px-4 rounded-lg hover:bg-[#9a8874] transition-colors"
                        >
                            Submit for Review
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TeamMemberDashboard;