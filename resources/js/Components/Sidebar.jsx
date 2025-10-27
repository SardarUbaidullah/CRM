// resources/js/Components/Sidebar/Sidebar.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { sidebarConfig } from './SidebarConfig';
import { useUser } from '../contexts/UserContext'; // ✅ fixed import path
import {
    Home, MessageSquare, CheckSquare, Users, Settings, Calendar,
    Folder, Briefcase, Clock, BarChart, File, Shield, Server,
    Plug, Activity, Plus, Lightbulb, ChevronDown
} from 'lucide-react';

const Sidebar = ({
    activeNav,
    setActiveNav,
    activeProject,
    setActiveProject,
    user
}) => {
    const { url } = usePage();
    const { userRole } = useUser() || { userRole: 'team_member' };

    const navigationItems = sidebarConfig[userRole] || sidebarConfig.team_member;

    const projects = [
        { id: 1, name: 'Mobile App', color: 'primary', active: true },
        { id: 2, name: 'Website Redesign', color: 'secondary' },
        { id: 3, name: 'Design System', color: 'accent' },
        { id: 4, name: 'Wireframes', color: 'muted' }
    ];

    const getColorClasses = (color) => {
        const colors = {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            accent: 'bg-accent',
            muted: 'bg-muted'
        };
        return colors[color] || 'bg-muted';
    };

    const iconMap = {
        Home,
        MessageSquare,
        CheckSquare,
        Users,
        Settings,
        Calendar,
        Folder,
        Briefcase,
        Clock,
        BarChart,
        File,
        Shield,
        Server,
        Plug,
        Activity,
        Plus,
        Lightbulb,
        ChevronDown
    };

    return (
        <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full bg-white">
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground text-sm font-bold">P</span>
                        </div>
                        <span className="font-bold text-sidebar-foreground text-lg">Project M.</span>
                    </div>

                    {/* Nav Menu */}
                    <nav className="space-y-1 mb-8">
                        {navigationItems.map((item) => {
                            const IconComponent = iconMap[item.icon];
                            const isActive = activeNav === item.id || url.startsWith(item.href);

                            return IconComponent ? (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setActiveNav(item.id)}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-primary text-primary-foreground border-l-2 border-primary'
                                            : 'text-sidebar-foreground hover:bg-sidebar-accent'
                                        }`}
                                >
                                    <IconComponent size={18} />
                                    <span>{item.name}</span>
                                </Link>
                            ) : null; // ✅ prevents rendering undefined components
                        })}
                    </nav>

                    {/* Projects Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                My Projects
                            </h3>
                            <button className="text-muted-foreground hover:text-foreground">
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            {projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => setActiveProject(project.name)}
                                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${project.active
                                            ? 'bg-sidebar-accent text-sidebar-foreground'
                                            : 'text-muted-foreground hover:bg-sidebar-accent'
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${getColorClasses(project.color)}`} />
                                    <span>{project.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200">
                    <img
                        className="w-8 h-8 rounded-full"
                        src={
                            user?.avatar ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                        }
                        alt={user?.name}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">
                            {user?.name || 'User Name'}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                            {userRole?.replace('_', ' ') || 'team member'}
                        </p>
                    </div>
                    <ChevronDown size={16} className="text-muted-foreground" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
