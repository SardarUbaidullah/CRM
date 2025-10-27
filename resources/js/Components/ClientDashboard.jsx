// resources/js/Components/Dashboard/ClientDashboard.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Folder,
    Calendar,
    MessageSquare,
    FileText,
    Download,
    Eye,
    Clock,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Users,
    BarChart3,
    Star,
    Search,
    Filter,
    ChevronDown,
    Paperclip,
    MessageCircle,
    Share2,
    Bell,
    Mail,
    Phone,
    Video,
    UserCheck,
    FileCheck,
    CalendarDays,
    Target,
    PieChart,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const ClientDashboard = ({ user, onShareProject }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [notifications, setNotifications] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState({ todo: [], in_progress: [], done: [] });
    const [teamMembers, setTeamMembers] = useState([]);

    // Initialize with sample data
    useEffect(() => {
        // Sample projects data
        const sampleProjects = [
            {
                id: 1,
                name: 'Website Redesign',
                description: 'Complete website overhaul with modern design',
                status: 'in_progress',
                progress: 65,
                startDate: '2024-01-15',
                endDate: '2024-03-30',
                budget: 25000,
                clients: [1]
            },
            {
                id: 2,
                name: 'Mobile App Development',
                description: 'Cross-platform mobile application',
                status: 'in_progress',
                progress: 45,
                startDate: '2024-02-01',
                endDate: '2024-04-15',
                budget: 35000,
                clients: [1]
            },
            {
                id: 3,
                name: 'E-commerce Platform',
                description: 'Online store with payment integration',
                status: 'completed',
                progress: 100,
                startDate: '2023-11-01',
                endDate: '2024-01-31',
                budget: 42000,
                clients: [1]
            }
        ];

        // Sample tasks data
        const sampleTasks = {
            todo: [
                { id: 1, title: 'Review homepage design', projectId: 1, dueDate: '2024-02-20', priority: 'high' },
                { id: 2, title: 'Approve color scheme', projectId: 1, dueDate: '2024-02-18', priority: 'medium' }
            ],
            in_progress: [
                { id: 3, title: 'User authentication development', projectId: 2, dueDate: '2024-02-25', priority: 'high' },
                { id: 4, title: 'API integration', projectId: 2, dueDate: '2024-02-28', priority: 'medium' }
            ],
            done: [
                { id: 5, title: 'Project planning', projectId: 1, dueDate: '2024-01-20', priority: 'low' },
                { id: 6, title: 'Wireframe approval', projectId: 1, dueDate: '2024-01-25', priority: 'medium' },
                { id: 7, title: 'Database setup', projectId: 2, dueDate: '2024-02-10', priority: 'high' }
            ]
        };

        // Sample team members
        const sampleTeamMembers = [
            {
                id: 1,
                name: 'Sarah Kim',
                role: 'Project Manager',
                email: 'sarah@example.com',
                phone: '+1 (555) 123-4567',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
            },
            {
                id: 2,
                name: 'Mike Rodriguez',
                role: 'Frontend Developer',
                email: 'mike@example.com',
                phone: '+1 (555) 234-5678',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
            },
            {
                id: 3,
                name: 'Alex Chen',
                role: 'Backend Developer',
                email: 'alex@example.com',
                phone: '+1 (555) 345-6789',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            },
            {
                id: 4,
                name: 'Priya Patel',
                role: 'UI/UX Designer',
                email: 'priya@example.com',
                phone: '+1 (555) 456-7890',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
            }
        ];

        setProjects(sampleProjects);
        setTasks(sampleTasks);
        setTeamMembers(sampleTeamMembers);
    }, []);

    // Define calculateProjectHealth before using it in useMemo
    const calculateProjectHealth = (projectList) => {
        const activeProjects = projectList.filter(p => p.status === 'in_progress');
        if (activeProjects.length === 0) return 'Excellent';

        const avgProgress = activeProjects.reduce((sum, project) => sum + project.progress, 0) / activeProjects.length;

        if (avgProgress >= 80) return 'Excellent';
        if (avgProgress >= 60) return 'Good';
        if (avgProgress >= 40) return 'Fair';
        return 'Needs Attention';
    };

    // Filter client's projects
    const clientProjects = useMemo(() => {
        return projects.filter(project =>
            project.clients?.includes(user?.id || 1)
        );
    }, [projects, user]);

    // Calculate project statistics for client
    const projectStats = useMemo(() => {
        const totalProjects = clientProjects.length;
        const activeProjects = clientProjects.filter(p => p.status === 'in_progress').length;
        const completedProjects = clientProjects.filter(p => p.status === 'completed').length;
        const onHoldProjects = clientProjects.filter(p => p.status === 'on_hold').length;

        const allTasks = [...tasks.todo, ...tasks.in_progress, ...tasks.done];
        const totalTasks = allTasks.length;
        const completedTasks = tasks.done.length;
        const overdueTasks = allTasks.filter(task => {
            if (!task.dueDate) return false;
            return new Date(task.dueDate) < new Date() && !tasks.done.find(t => t.id === task.id);
        }).length;

        return {
            totalProjects,
            activeProjects,
            completedProjects,
            onHoldProjects,
            totalTasks,
            completedTasks,
            overdueTasks,
            completionRate: Math.round((completedTasks / totalTasks) * 100) || 0,
            projectHealth: calculateProjectHealth(clientProjects),
            budgetUtilization: '78%',
            timelineAdherence: '85%'
        };
    }, [clientProjects, tasks]);

    // Get recent activity
    const recentActivity = useMemo(() => [
        {
            id: 1,
            type: 'task_completed',
            project: 'Mobile App',
            description: 'User authentication flow completed',
            timestamp: '2 hours ago',
            user: 'Mike Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
            priority: 'high'
        },
        {
            id: 2,
            type: 'file_uploaded',
            project: 'Website Redesign',
            description: 'Final design mockups uploaded',
            timestamp: '4 hours ago',
            user: 'Sarah Kim',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'milestone_reached',
            project: 'Mobile App',
            description: 'Project reached 65% completion',
            timestamp: '1 day ago',
            user: 'Alex Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            priority: 'high'
        },
        {
            id: 4,
            type: 'review_requested',
            project: 'Website Redesign',
            description: 'Design review requested for homepage',
            timestamp: '2 days ago',
            user: 'Priya Patel',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
            priority: 'medium'
        }
    ], []);

    // Quick actions for client
    const quickActions = [
        {
            id: 'request-changes',
            label: 'Request Changes',
            icon: FileCheck,
            color: 'primary',
            description: 'Submit change requests',
            action: () => handleQuickAction('request-changes')
        },
        {
            id: 'schedule-call',
            label: 'Schedule Call',
            icon: CalendarDays,
            color: 'secondary',
            description: 'Book a meeting with team',
            action: () => handleQuickAction('schedule-call')
        },
        {
            id: 'provide-feedback',
            label: 'Give Feedback',
            icon: MessageCircle,
            color: 'accent',
            description: 'Share your thoughts',
            action: () => setShowFeedbackModal(true)
        },
        {
            id: 'download-assets',
            label: 'Download Files',
            icon: Download,
            color: 'muted',
            description: 'Access project files',
            action: () => handleQuickAction('download-assets')
        }
    ];

    // Project status colors using your theme
    const getStatusColor = (status) => {
        const colors = {
            completed: 'bg-[#19874D] text-white border-[#19874D]',
            in_progress: 'bg-[#AE9B85] text-white border-[#AE9B85]',
            planning: 'bg-[#F59522] text-white border-[#F59522]',
            on_hold: 'bg-[#D9D9D9] text-black border-[#D9D9D9]'
        };
        return colors[status] || 'bg-[#D9D9D9] text-black border-[#D9D9D9]';
    };

    const getStatusText = (status) => {
        const texts = {
            completed: 'Completed',
            in_progress: 'In Progress',
            planning: 'Planning',
            on_hold: 'On Hold'
        };
        return texts[status] || status;
    };

    const handleQuickAction = (actionId) => {
        const actionMessages = {
            'request-changes': 'Change request form opened',
            'schedule-call': 'Scheduling calendar opened',
            'download-assets': 'File download started'
        };

        setNotifications(prev => [...prev, {
            id: Date.now(),
            type: 'info',
            message: actionMessages[actionId] || 'Action completed',
            timestamp: new Date().toISOString()
        }]);
    };

    const handleProvideFeedback = (project, rating, comment) => {
        // In production, this would call an API
        console.log('Feedback submitted:', { project, rating, comment });
        setNotifications(prev => [...prev, {
            id: Date.now(),
            type: 'success',
            message: 'Feedback submitted successfully!',
            timestamp: new Date().toISOString()
        }]);
        setShowFeedbackModal(false);
    };

    const handleDownloadReport = (projectId) => {
        // Simulate report download
        console.log('Downloading report for project:', projectId);
        setNotifications(prev => [...prev, {
            id: Date.now(),
            type: 'info',
            message: 'Report download started...',
            timestamp: new Date().toISOString()
        }]);

        // Simulate download completion
        setTimeout(() => {
            setNotifications(prev => [...prev, {
                id: Date.now() + 1,
                type: 'success',
                message: 'Report downloaded successfully!',
                timestamp: new Date().toISOString()
            }]);
        }, 2000);
    };

    const handleContactTeamMember = (member, method) => {
        const methods = {
            message: `Opening chat with ${member.name}`,
            call: `Calling ${member.phone}`,
            email: `Opening email to ${member.email}`
        };

        setNotifications(prev => [...prev, {
            id: Date.now(),
            type: 'info',
            message: methods[method],
            timestamp: new Date().toISOString()
        }]);
    };

    const ProjectCard = ({ project }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-black mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#19874D] to-[#AE9B85] transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            {/* Project Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-lg font-bold text-black">
                        {Object.values(tasks).flat().filter(task => task.projectId === project.id).length}
                    </div>
                    <div className="text-xs text-gray-500">Tasks</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-[#19874D]">
                        {tasks.done.filter(task => task.projectId === project.id).length}
                    </div>
                    <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-[#AE9B85]">
                        {teamMembers.length}
                    </div>
                    <div className="text-xs text-gray-500">Team</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 bg-[#19874D] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#146c3e] transition-colors flex items-center justify-center space-x-1"
                >
                    <Eye size={14} />
                    <span>View Details</span>
                </button>
                <button
                    onClick={() => handleDownloadReport(project.id)}
                    className="flex-1 bg-[#AE9B85] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#9a8874] transition-colors flex items-center justify-center space-x-1"
                >
                    <Download size={14} />
                    <span>Report</span>
                </button>
            </div>
        </motion.div>
    );

    const ActivityItem = ({ activity }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start space-x-3 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
        >
            <img
                src={activity.avatar}
                alt={activity.user}
                className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm text-black">
                    <span className="font-semibold">{activity.user}</span>
                    <span className="text-gray-600"> {activity.description}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {activity.timestamp} • {activity.project}
                </p>
            </div>
            <div className={`w-2 h-2 rounded-full ${activity.priority === 'high' ? 'bg-[#F59522]' : 'bg-[#19874D]'}`} />
        </motion.div>
    );

    const ProjectDetailModal = ({ project, onClose }) => {
        if (!project) return null;

        const projectTasks = Object.values(tasks).flat().filter(task => task.projectId === project.id);

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
                    className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start p-6 border-b border-gray-200">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-black mb-2">{project.name}</h2>
                            <p className="text-gray-600">{project.description}</p>
                            <div className="flex items-center space-x-4 mt-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                                    {getStatusText(project.status)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {project.progress}% Complete
                                </span>
                            </div>
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

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Project Details */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-black mb-3">Project Overview</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Start Date</span>
                                            <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Estimated Completion</span>
                                            <span className="font-medium">{new Date(project.endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Budget</span>
                                            <span className="font-medium">${project.budget?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">Tasks</span>
                                            <span className="font-medium">{projectTasks.length} tasks</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-black mb-3">Team Members</h3>
                                    <div className="space-y-2">
                                        {teamMembers.map(member => (
                                            <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-black">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleContactTeamMember(member, 'message')}
                                                    className="text-[#19874D] hover:text-[#146c3e] text-sm font-medium"
                                                >
                                                    Contact
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h3 className="text-lg font-semibold text-black mb-3">Project Tasks</h3>
                                <div className="space-y-3">
                                    {projectTasks.slice(0, 5).map(task => (
                                        <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-black">{task.title}</p>
                                                <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs ${tasks.done.find(t => t.id === task.id)
                                                    ? 'bg-[#19874D] text-white'
                                                    : 'bg-[#F59522] text-white'
                                                }`}>
                                                {tasks.done.find(t => t.id === task.id) ? 'Completed' : 'Pending'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setShowFeedbackModal(true)}
                            className="px-6 py-2 bg-[#F59522] text-white rounded-lg hover:bg-[#e0861a] transition-colors font-medium"
                        >
                            Provide Feedback
                        </button>
                        <div className="flex space-x-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleDownloadReport(project.id)}
                                className="px-6 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors font-medium"
                            >
                                Download Report
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    // Helper function for action colors using your theme
    const getActionColor = (color) => {
        const colors = {
            primary: 'bg-[#19874D]',
            secondary: 'bg-[#AE9B85]',
            accent: 'bg-[#F59522]',
            muted: 'bg-[#D9D9D9]'
        };
        return colors[color] || 'bg-[#D9D9D9]';
    };

    // Filter projects based on search and status
    const filteredProjects = clientProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex-1 p-6 bg-[#FCF8F3] min-h-screen">
            {/* Notifications */}
            <AnimatePresence>
                {notifications.slice(-3).map(notification => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        className="fixed top-4 right-4 z-50"
                    >
                        <div className={`p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-[#19874D] text-white' :
                                notification.type === 'error' ? 'bg-red-500 text-white' :
                                    'bg-[#AE9B85] text-white'
                            }`}>
                            <div className="flex items-center space-x-2">
                                <CheckCircle size={16} />
                                <span className="text-sm font-medium">{notification.message}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">
                        Welcome back, {user?.name || 'Client'}!
                    </h1>
                    <p className="text-gray-600">
                        Here's the latest update on your projects and team progress
                    </p>
                </div>

                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] w-64 bg-white"
                        />
                    </div>

                    <button
                        onClick={onShareProject}
                        className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors font-medium flex items-center space-x-2"
                    >
                        <Share2 size={16} />
                        <span>Share Access</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Projects</p>
                            <p className="text-2xl font-bold text-black">{projectStats.activeProjects}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#19874D]/10 rounded-lg flex items-center justify-center">
                            <Folder size={24} className="text-[#19874D]" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                        <TrendingUp size={14} className="text-[#19874D]" />
                        <span className="text-xs text-[#19874D]">2 new this month</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                            <p className="text-2xl font-bold text-black">{projectStats.completionRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-[#19874D]/10 rounded-lg flex items-center justify-center">
                            <CheckCircle size={24} className="text-[#19874D]" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                        <ArrowUpRight size={14} className="text-[#19874D]" />
                        <span className="text-xs text-[#19874D]">+5% from last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Project Health</p>
                            <p className="text-2xl font-bold text-black">{projectStats.projectHealth}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#AE9B85]/10 rounded-lg flex items-center justify-center">
                            <Target size={24} className="text-[#AE9B85]" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${projectStats.projectHealth === 'Excellent' ? 'bg-[#19874D] text-white' :
                                projectStats.projectHealth === 'Good' ? 'bg-[#AE9B85] text-white' :
                                    projectStats.projectHealth === 'Fair' ? 'bg-[#F59522] text-white' :
                                        'bg-red-500 text-white'
                            }`}>
                            {projectStats.projectHealth}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Team Members</p>
                            <p className="text-2xl font-bold text-black">{teamMembers.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#AE9B85]/10 rounded-lg flex items-center justify-center">
                            <Users size={24} className="text-[#AE9B85]" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                        <UserCheck size={14} className="text-[#19874D]" />
                        <span className="text-xs text-[#19874D]">All active</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map(action => (
                                <motion.button
                                    key={action.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={action.action}
                                    className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-[#19874D] hover:shadow-md transition-all group"
                                >
                                    <div className={`w-12 h-12 ${getActionColor(action.color)} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <action.icon size={24} className="text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-black text-center">
                                        {action.label}
                                    </span>
                                    <span className="text-xs text-gray-500 text-center mt-1">
                                        {action.description}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-black">Your Projects</h2>
                            <div className="flex items-center space-x-3">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] text-sm bg-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="planning">Planning</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
                            </div>
                        </div>

                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-12">
                                <Folder size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-black mb-2">
                                    {clientProjects.length === 0 ? 'No projects assigned' : 'No projects found'}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {clientProjects.length === 0
                                        ? "You don't have any active projects at the moment."
                                        : "Try adjusting your search or filter criteria."
                                    }
                                </p>
                                <button className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors">
                                    Contact Sales
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AnimatePresence>
                                    {filteredProjects.map(project => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentActivity.map(activity => (
                                <ActivityItem key={activity.id} activity={activity} />
                            ))}
                        </div>
                        <button className="w-full mt-4 text-center text-[#19874D] hover:text-[#146c3e] text-sm font-medium">
                            View All Activity
                        </button>
                    </div>

                    {/* Team Contacts */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Team Contacts</h3>
                        <div className="space-y-3">
                            {teamMembers.slice(0, 4).map(member => (
                                <div key={member.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-black">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => handleContactTeamMember(member, 'message')}
                                            className="p-1 text-gray-500 hover:text-[#19874D] transition-colors"
                                            title="Message"
                                        >
                                            <MessageSquare size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleContactTeamMember(member, 'call')}
                                            className="p-1 text-gray-500 hover:text-[#19874D] transition-colors"
                                            title="Call"
                                        >
                                            <Phone size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Timeline */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Upcoming Milestones</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-[#19874D] rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Design Review</p>
                                    <p className="text-xs text-gray-500">Feb 15, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-[#AE9B85] rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Beta Launch</p>
                                    <p className="text-xs text-gray-500">Mar 1, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-[#F59522] rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Final Delivery</p>
                                    <p className="text-xs text-gray-500">Mar 30, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Feedback Modal */}
            <AnimatePresence>
                {showFeedbackModal && (
                    <FeedbackModal
                        onClose={() => setShowFeedbackModal(false)}
                        onSubmit={handleProvideFeedback}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Feedback Modal Component
const FeedbackModal = ({ onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && comment.trim()) {
            onSubmit(null, rating, comment);
        }
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
                className="bg-white rounded-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-semibold text-black mb-4">Provide Feedback</h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                How would you rate our service?
                            </label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`p-2 rounded-lg ${rating >= star
                                            ? 'bg-[#F59522] text-white'
                                            : 'bg-gray-100 text-gray-400'
                                            } hover:bg-[#F59522] hover:text-white transition-colors`}
                                    >
                                        <Star size={20} fill={rating >= star ? 'currentColor' : 'none'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Comments
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] bg-white"
                                placeholder="Share your thoughts, suggestions, or concerns..."
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
                            disabled={rating === 0 || !comment.trim()}
                            className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ClientDashboard;