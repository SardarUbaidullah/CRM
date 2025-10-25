// resources/js/Components/Layout/Header.jsx
import React from 'react';
import { Calendar, Bell, MessageSquare } from 'lucide-react';

const Header = ({ user }) => {
    return (
        <header className="bg-white border-b border-border h-16 px-6 flex items-center justify-between">

            {/* Left side - You can add logo or page title here if needed */}
            <div className="flex items-center">
                {/* Placeholder for left content if needed */}
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
                            {user?.role ? user.role.replace('_', ' ') : 'Team Member'}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
