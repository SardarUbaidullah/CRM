// resources/js/Components/Layout/Header.jsx
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Calendar, Bell, MessageSquare } from 'lucide-react';

const Header = ({ user, query, setQuery, projects, activeProject, setActiveProject }) => {
    const { userRole } = useUser();

    return (
        <header className="bg-white border-b border-border h-16 px-6 flex items-center justify-between">
            {/* Left side - Search and Project Selector */}
            <div className="flex items-center space-x-6">
                {/* Project Selector */}
                <div className="relative">
                    <select
                        value={activeProject}
                        onChange={(e) => setActiveProject(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        {projects.map((project) => (
                            <option key={project} value={project}>
                                {project}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-64"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Right side - Icons and Profile */}
            <div className="flex items-center space-x-4">
                {/* Icons */}
                <div className="flex items-center space-x-2">
                    <button className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200">
                        <Calendar size={20} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200">
                        <Bell size={20} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200">
                        <MessageSquare size={20} />
                    </button>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-border mx-2"></div>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                    <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={
                            user?.avatar ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                        }
                        alt={user?.name || 'User Avatar'}
                    />
                    <div className="text-left">
                        <p className="text-sm font-medium text-card-foreground">
                            {user?.name || 'User Name'}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                            {userRole.replace('_', ' ')}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Add the missing Search icon import
const Search = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

// Add the missing ChevronDown icon
const ChevronDown = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

export default Header;