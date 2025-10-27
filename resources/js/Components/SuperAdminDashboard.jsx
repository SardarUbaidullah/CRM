// resources/js/Components/Dashboard/SuperAdminDashboard.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Server,
    Users,
    BarChart3,
    Settings,
    Activity,
    FileText,
    CreditCard,
    Database,
    Cpu,
    Network,
    HardDrive,
    Zap,
    AlertTriangle,
    CheckCircle,
    XCircle,
    TrendingUp,
    TrendingDown,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    Search,
    Filter,
    Download,
    Plus,
    UserPlus,
    Key,
    Globe,
    Lock,
    Unlock,
    Bell,
    Mail,
    MessageSquare,
    Calendar,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    ChevronDown,
    RefreshCw
} from 'lucide-react';

const SuperAdminDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [systemAlert, setSystemAlert] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showSystemSettings, setShowSystemSettings] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [systemMetrics, setSystemMetrics] = useState({});

    // Initialize with sample data
    useEffect(() => {
        // Sample team members
        const sampleTeamMembers = [
            {
                id: 1,
                name: 'Sarah Kim',
                email: 'sarah@example.com',
                role: 'Project Manager',
                status: 'active',
                lastLogin: '2 hours ago',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                joinDate: '2023-01-15'
            },
            {
                id: 2,
                name: 'Mike Rodriguez',
                email: 'mike@example.com',
                role: 'Frontend Developer',
                status: 'active',
                lastLogin: '1 hour ago',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                joinDate: '2023-02-20'
            },
            {
                id: 3,
                name: 'Alex Chen',
                email: 'alex@example.com',
                role: 'Backend Developer',
                status: 'active',
                lastLogin: '30 minutes ago',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                joinDate: '2023-01-10'
            },
            {
                id: 4,
                name: 'Priya Patel',
                email: 'priya@example.com',
                role: 'UI/UX Designer',
                status: 'inactive',
                lastLogin: '3 days ago',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                joinDate: '2023-03-05'
            }
        ];

        // Sample projects
        const sampleProjects = [
            { id: 1, name: 'Website Redesign', status: 'in_progress' },
            { id: 2, name: 'Mobile App', status: 'in_progress' },
            { id: 3, name: 'E-commerce Platform', status: 'completed' },
            { id: 4, name: 'CRM System', status: 'planning' }
        ];

        // Sample system metrics
        const sampleMetrics = {
            serverLoad: 45,
            memoryUsage: 68,
            storageUsed: 2.4,
            storageTotal: 10,
            activeSessions: 247,
            apiCalls: 12400,
            uptime: 99.9,
            responseTime: 128,
            errorRate: 0.2
        };

        setTeamMembers(sampleTeamMembers);
        setProjects(sampleProjects);
        setSystemMetrics(sampleMetrics);
    }, []);

    // System statistics
    const systemStats = useMemo(() => {
        const totalUsers = teamMembers.length + 1;
        const activeUsers = teamMembers.filter(user => user.status === 'active').length + 1;
        const storagePercentage = Math.round((systemMetrics.storageUsed / systemMetrics.storageTotal) * 100);

        return {
            totalUsers,
            activeUsers,
            activeProjects: projects.filter(p => p.status === 'in_progress').length,
            completedProjects: projects.filter(p => p.status === 'completed').length,
            storageUsed: `${systemMetrics.storageUsed} GB`,
            storageTotal: `${systemMetrics.storageTotal} GB`,
            storagePercentage,
            systemHealth: systemMetrics.errorRate < 1 ? 'Excellent' : 'Warning',
            apiCalls: `${(systemMetrics.apiCalls / 1000).toFixed(1)}K`,
            uptime: `${systemMetrics.uptime}%`,
            responseTime: `${systemMetrics.responseTime}ms`,
            errorRate: `${systemMetrics.errorRate}%`,
            serverLoad: `${systemMetrics.serverLoad}%`,
            databaseQueries: '8.2K',
            activeSessions: systemMetrics.activeSessions
        };
    }, [teamMembers, projects, systemMetrics]);

    // System health metrics
    const healthMetrics = useMemo(() => [
        {
            id: 'server',
            name: 'Server Health',
            status: systemMetrics.serverLoad < 80 ? 'healthy' : 'warning',
            value: `${100 - systemMetrics.serverLoad}%`,
            trend: systemMetrics.serverLoad < 70 ? 'up' : 'down',
            icon: Server,
            color: systemMetrics.serverLoad < 80 ? 'primary' : 'accent'
        },
        {
            id: 'database',
            name: 'Database',
            status: 'healthy',
            value: '98%',
            trend: 'stable',
            icon: Database,
            color: 'primary'
        },
        {
            id: 'api',
            name: 'API Performance',
            status: systemMetrics.errorRate < 1 ? 'healthy' : 'warning',
            value: `${100 - systemMetrics.errorRate}%`,
            trend: systemMetrics.errorRate < 0.5 ? 'up' : 'down',
            icon: Cpu,
            color: systemMetrics.errorRate < 1 ? 'primary' : 'accent'
        },
        {
            id: 'network',
            name: 'Network',
            status: 'healthy',
            value: '99%',
            trend: 'up',
            icon: Network,
            color: 'primary'
        },
        {
            id: 'storage',
            name: 'Storage',
            status: systemStats.storagePercentage < 90 ? 'healthy' : 'warning',
            value: `${systemStats.storagePercentage}%`,
            trend: 'up',
            icon: HardDrive,
            color: systemStats.storagePercentage < 90 ? 'primary' : 'accent'
        },
        {
            id: 'security',
            name: 'Security',
            status: 'healthy',
            value: '100%',
            trend: 'stable',
            icon: Shield,
            color: 'primary'
        }
    ], [systemMetrics, systemStats]);

    // Recent system activities
    const systemActivities = useMemo(() => [
        {
            id: 1,
            type: 'user_login',
            user: 'Alex Chen',
            description: 'Successful login from New York',
            timestamp: '2 minutes ago',
            severity: 'info',
            icon: Users
        },
        {
            id: 2,
            type: 'system_update',
            user: 'System',
            description: 'Security patch applied successfully',
            timestamp: '15 minutes ago',
            severity: 'success',
            icon: Shield
        },
        {
            id: 3,
            type: 'api_error',
            user: 'API Gateway',
            description: 'Temporary API slowdown detected',
            timestamp: '1 hour ago',
            severity: 'warning',
            icon: AlertTriangle
        },
        {
            id: 4,
            type: 'backup_completed',
            user: 'Backup System',
            description: 'Nightly backup completed successfully',
            timestamp: '3 hours ago',
            severity: 'info',
            icon: Database
        },
        {
            id: 5,
            type: 'new_user',
            user: 'Sarah Kim',
            description: 'New team member registered',
            timestamp: '5 hours ago',
            severity: 'info',
            icon: UserPlus
        }
    ], []);

    // Quick actions for super admin
    const quickActions = [
        {
            id: 'manage-users',
            label: 'Manage Users',
            icon: Users,
            color: 'primary',
            description: 'User accounts & permissions',
            action: () => setActiveTab('users')
        },
        {
            id: 'system-settings',
            label: 'System Settings',
            icon: Settings,
            color: 'secondary',
            description: 'Platform configuration',
            action: () => setShowSystemSettings(true)
        },
        {
            id: 'security',
            label: 'Security',
            icon: Shield,
            color: 'primary',
            description: 'Security & access control',
            action: () => setActiveTab('security')
        },
        {
            id: 'backup',
            label: 'Backup & Restore',
            icon: Database,
            color: 'accent',
            description: 'Data management',
            action: () => handleQuickAction('backup')
        },
        {
            id: 'monitoring',
            label: 'System Monitoring',
            icon: Activity,
            color: 'secondary',
            description: 'Real-time metrics',
            action: () => setActiveTab('monitoring')
        },
        {
            id: 'billing',
            label: 'Billing',
            icon: CreditCard,
            color: 'primary',
            description: 'Subscription & payments',
            action: () => handleQuickAction('billing')
        }
    ];

    // User management functions
    const handleCreateUser = (userData) => {
        const newUser = {
            id: teamMembers.length + 1,
            ...userData,
            status: 'active',
            lastLogin: 'Never',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };

        setTeamMembers(prev => [...prev, newUser]);
        setSystemAlert({
            type: 'success',
            message: 'User created successfully!',
            timestamp: new Date().toISOString()
        });
        setShowUserModal(false);
    };

    const handleUpdateUser = (userId, userData) => {
        setTeamMembers(prev => prev.map(user =>
            user.id === userId ? { ...user, ...userData } : user
        ));
        setSystemAlert({
            type: 'success',
            message: 'User updated successfully!',
            timestamp: new Date().toISOString()
        });
        setSelectedUser(null);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setTeamMembers(prev => prev.filter(user => user.id !== userId));
            setSystemAlert({
                type: 'success',
                message: 'User deleted successfully!',
                timestamp: new Date().toISOString()
            });
        }
    };

    const handleSystemReboot = () => {
        if (window.confirm('Are you sure you want to reboot the system? This will cause temporary downtime.')) {
            setSystemAlert({
                type: 'warning',
                message: 'System reboot initiated...',
                timestamp: new Date().toISOString()
            });

            // Simulate reboot process
            setTimeout(() => {
                setSystemAlert({
                    type: 'success',
                    message: 'System reboot completed successfully!',
                    timestamp: new Date().toISOString()
                });
            }, 3000);
        }
    };

    const handleClearCache = () => {
        setSystemMetrics(prev => ({
            ...prev,
            serverLoad: Math.max(prev.serverLoad - 10, 20),
            memoryUsage: Math.max(prev.memoryUsage - 15, 40)
        }));

        setSystemAlert({
            type: 'success',
            message: 'Cache cleared successfully!',
            timestamp: new Date().toISOString()
        });
    };

    const handleQuickAction = (actionId) => {
        const messages = {
            'backup': 'Backup process started...',
            'billing': 'Billing dashboard opened',
            'security': 'Security settings updated'
        };

        setSystemAlert({
            type: 'info',
            message: messages[actionId] || 'Action completed',
            timestamp: new Date().toISOString()
        });
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            healthy: { color: 'bg-[#19874D] text-white', icon: CheckCircle },
            warning: { color: 'bg-[#F59522] text-white', icon: AlertTriangle },
            error: { color: 'bg-red-500 text-white', icon: XCircle },
            offline: { color: 'bg-[#D9D9D9] text-black', icon: XCircle },
            active: { color: 'bg-[#19874D] text-white', icon: CheckCircle },
            inactive: { color: 'bg-[#D9D9D9] text-black', icon: XCircle }
        };

        const config = statusConfig[status] || statusConfig.healthy;
        const IconComponent = config.icon;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                <IconComponent size={12} className="mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Health metric card
    const HealthMetricCard = ({ metric }) => {
        const IconComponent = metric.icon;

        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${getActionColor(metric.color, true)} rounded-lg flex items-center justify-center`}>
                        <IconComponent size={20} className="text-white" />
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-black">{metric.value}</div>
                        <div className={`flex items-center space-x-1 text-xs ${metric.trend === 'up' ? 'text-[#19874D]' :
                            metric.trend === 'down' ? 'text-red-500' : 'text-gray-600'
                            }`}>
                            {metric.trend === 'up' && <TrendingUp size={12} />}
                            {metric.trend === 'down' && <TrendingDown size={12} />}
                            <span>{metric.trend}</span>
                        </div>
                    </div>
                </div>
                <h3 className="text-sm font-medium text-black mb-1">{metric.name}</h3>
                <StatusBadge status={metric.status} />
            </motion.div>
        );
    };

    // Activity item component
    const ActivityItem = ({ activity }) => {
        const IconComponent = activity.icon;
        const severityColors = {
            info: 'text-[#19874D]',
            success: 'text-[#19874D]',
            warning: 'text-[#F59522]',
            error: 'text-red-500'
        };

        return (
            <div className="flex items-start space-x-3 p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${severityColors[activity.severity]} bg-gray-100`}>
                    <IconComponent size={16} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-black">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="text-gray-600"> {activity.description}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
            </div>
        );
    };

    // User row component
    const UserRow = ({ user, onEdit, onDelete }) => (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="font-medium text-black">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#AE9B85] text-white">
                    {user.role}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-black">
                {user.lastLogin || 'Never'}
            </td>
            <td className="px-4 py-3">
                <StatusBadge status={user.status || 'active'} />
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onEdit(user)}
                        className="p-1 text-gray-500 hover:text-[#19874D] transition-colors"
                        title="Edit User"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete User"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );

    // Filter users based on search
    const filteredUsers = useMemo(() => {
        return teamMembers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [teamMembers, searchTerm]);

    return (
        <div className="flex-1 p-6 bg-[#FCF8F3] min-h-screen">
            {/* System Alert */}
            <AnimatePresence>
                {systemAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mb-6 p-4 rounded-lg border ${systemAlert.type === 'success' ? 'bg-[#19874D] border-[#19874D] text-white' :
                            systemAlert.type === 'warning' ? 'bg-[#F59522] border-[#F59522] text-white' :
                                'bg-[#AE9B85] border-[#AE9B85] text-white'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                {systemAlert.type === 'success' && <CheckCircle size={20} />}
                                {systemAlert.type === 'warning' && <AlertTriangle size={20} />}
                                <span className="font-medium">{systemAlert.message}</span>
                            </div>
                            <button
                                onClick={() => setSystemAlert(null)}
                                className="hover:opacity-70 transition-opacity"
                            >
                                <XCircle size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <Shield size={28} className="text-[#19874D]" />
                        <h1 className="text-3xl font-bold text-black">System Administration</h1>
                    </div>
                    <p className="text-gray-600">
                        Monitor system health, manage users, and configure platform settings
                    </p>
                </div>

                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users, logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] w-64 bg-white"
                        />
                    </div>

                    <button
                        onClick={handleClearCache}
                        className="px-4 py-2 bg-[#AE9B85] text-white rounded-lg hover:bg-[#9a8874] transition-colors font-medium flex items-center space-x-2"
                    >
                        <RefreshCw size={16} />
                        <span>Clear Cache</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-200 mb-8">
                {['overview', 'users', 'system', 'monitoring', 'security'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                            ? 'bg-[#19874D] text-white'
                            : 'text-gray-600 hover:text-black hover:bg-gray-100'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                    {/* System Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-2xl font-bold text-black">{systemStats.totalUsers}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#19874D]/10 rounded-lg flex items-center justify-center">
                                    <Users size={24} className="text-[#19874D]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 mt-2">
                                <TrendingUp size={14} className="text-[#19874D]" />
                                <span className="text-xs text-[#19874D]">+5 this month</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                                    <p className="text-2xl font-bold text-black">{systemStats.activeProjects}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#19874D]/10 rounded-lg flex items-center justify-center">
                                    <FileText size={24} className="text-[#19874D]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 mt-2">
                                <ArrowUpRight size={14} className="text-[#19874D]" />
                                <span className="text-xs text-[#19874D]">+12% growth</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">System Uptime</p>
                                    <p className="text-2xl font-bold text-black">{systemStats.uptime}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#AE9B85]/10 rounded-lg flex items-center justify-center">
                                    <Activity size={24} className="text-[#AE9B85]" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <StatusBadge status="healthy" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Storage Used</p>
                                    <p className="text-2xl font-bold text-black">{systemStats.storageUsed}</p>
                                    <p className="text-xs text-gray-500">of {systemStats.storageTotal}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#F59522]/10 rounded-lg flex items-center justify-center">
                                    <HardDrive size={24} className="text-[#F59522]" />
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                    className="h-2 rounded-full bg-[#F59522]"
                                    style={{ width: `${systemStats.storagePercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* System Health */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-black">System Health</h3>
                                <StatusBadge status="healthy" />
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {healthMetrics.map(metric => (
                                    <HealthMetricCard key={metric.id} metric={metric} />
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-black">Recent Activity</h3>
                                <button className="text-sm text-[#19874D] hover:text-[#146c3e] font-medium">
                                    View All
                                </button>
                            </div>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {systemActivities.map(activity => (
                                    <ActivityItem key={activity.id} activity={activity} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black">User Management</h2>
                            <button
                                onClick={() => setShowUserModal(true)}
                                className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors font-medium flex items-center space-x-2"
                            >
                                <UserPlus size={16} />
                                <span>Add User</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map(member => (
                                        <UserRow
                                            key={member.id}
                                            user={member}
                                            onEdit={setSelectedUser}
                                            onDelete={handleDeleteUser}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">System Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">Maintenance Mode</h4>
                                        <p className="text-sm text-gray-600">Temporarily disable platform access</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#AE9B85] text-white rounded-lg hover:bg-[#9a8874] transition-colors text-sm">
                                        Enable
                                    </button>
                                </div>

                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">Auto Backups</h4>
                                        <p className="text-sm text-gray-600">Daily at 2:00 AM UTC</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors text-sm">
                                        Configure
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">Email Notifications</h4>
                                        <p className="text-sm text-gray-600">System alerts and reports</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors text-sm">
                                        Enabled
                                    </button>
                                </div>

                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">System Reboot</h4>
                                        <p className="text-sm text-gray-600">Restart all services</p>
                                    </div>
                                    <button
                                        onClick={handleSystemReboot}
                                        className="px-4 py-2 bg-[#F59522] text-white rounded-lg hover:bg-[#e0861a] transition-colors text-sm"
                                    >
                                        Reboot
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Monitoring Tab */}
            {activeTab === 'monitoring' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-black mb-4">API Performance</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Response Time</span>
                                    <span className="font-medium">{systemStats.responseTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Error Rate</span>
                                    <span className="font-medium">{systemStats.errorRate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Requests/Min</span>
                                    <span className="font-medium">42</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-black mb-4">Server Resources</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">CPU Load</span>
                                    <span className="font-medium">{systemStats.serverLoad}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Memory Usage</span>
                                    <span className="font-medium">{systemMetrics.memoryUsage}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Disk I/O</span>
                                    <span className="font-medium">124 MB/s</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-black mb-4">Database</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Active Connections</span>
                                    <span className="font-medium">24</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Queries/Sec</span>
                                    <span className="font-medium">{systemStats.databaseQueries}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Cache Hit Rate</span>
                                    <span className="font-medium">94%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Security Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">Two-Factor Auth</h4>
                                        <p className="text-sm text-gray-600">Require 2FA for all users</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors text-sm">
                                        Enforced
                                    </button>
                                </div>

                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">Password Policy</h4>
                                        <p className="text-sm text-gray-600">Strong password requirements</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] transition-colors text-sm">
                                        Configure
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">Session Timeout</h4>
                                        <p className="text-sm text-gray-600">Auto-logout after 24 hours</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#AE9B85] text-white rounded-lg hover:bg-[#9a8874] transition-colors text-sm">
                                        Edit
                                    </button>
                                </div>

                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-black">API Rate Limiting</h4>
                                        <p className="text-sm text-gray-600">1000 requests/hour per user</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#AE9B85] text-white rounded-lg hover:bg-[#9a8874] transition-colors text-sm">
                                        Adjust
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User Management Modal */}
            <AnimatePresence>
                {(showUserModal || selectedUser) && (
                    <UserManagementModal
                        user={selectedUser}
                        onClose={() => {
                            setShowUserModal(false);
                            setSelectedUser(null);
                        }}
                        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper function for action colors using your theme
const getActionColor = (color, isLight = false) => {
    const colors = {
        primary: isLight ? 'bg-[#19874D]/10' : 'bg-[#19874D]',
        secondary: isLight ? 'bg-[#AE9B85]/10' : 'bg-[#AE9B85]',
        accent: isLight ? 'bg-[#F59522]/10' : 'bg-[#F59522]',
        muted: isLight ? 'bg-[#D9D9D9]/10' : 'bg-[#D9D9D9]'
    };
    return colors[color] || (isLight ? 'bg-[#D9D9D9]/10' : 'bg-[#D9D9D9]');
};

// User Management Modal Component
const UserManagementModal = ({ user, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'Developer',
        status: user?.status || 'active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user?.id, formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                <h3 className="text-xl font-semibold text-black mb-4">
                    {user ? 'Edit User' : 'Create New User'}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] bg-white"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] bg-white"
                                placeholder="Enter email address"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => handleChange('role', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] bg-white"
                            >
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#19874D] focus:border-[#19874D] bg-white"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
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
                            className="px-4 py-2 bg-[#19874D] text-white rounded-lg hover:bg-[#146c3e] font-medium transition-colors"
                        >
                            {user ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default SuperAdminDashboard;