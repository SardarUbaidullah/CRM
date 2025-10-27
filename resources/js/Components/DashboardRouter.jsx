// resources/js/Components/Dashboard/DashboardRouter.jsx
import React from 'react';
import { useUser } from '../../js/contexts/UserContext';
import KanbanBoard from './ProjectManagerDashboard'; // Import KanbanBoard for PM
import TeamMemberDashboard from './TeamMemberDashboard';
import ClientDashboard from './ClientDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';

const DashboardRouter = ({
    projects,
    tasks,
    teamMembers,
    onTaskUpdate,
    onAddTask,
    onDeleteTask,
    onShareProject,
    onInviteMember,
    activeNav
}) => {
    const { user, userRole } = useUser();

    // Dashboard components for different roles
    const dashboardComponents = {
        super_admin: SuperAdminDashboard,
        manager: KanbanBoard, // PM sees KanbanBoard
        team_member: TeamMemberDashboard,
        client: ClientDashboard
    };

    // Page components with role-based access
    const pageComponents = {
        dashboard: dashboardComponents[userRole] || TeamMemberDashboard,
        projects: () => <div className="p-6">Projects Page - {userRole} View - Coming Soon</div>,
        tasks: () => <div className="p-6">Tasks Page - {userRole} View - Coming Soon</div>,
        'my-tasks': () => <div className="p-6">My Tasks Page - {userRole} View - Coming Soon</div>,
        teams: () => <div className="p-6">Teams Page - {userRole} View - Coming Soon</div>,
        clients: () => <div className="p-6">Clients Page - {userRole} View - Coming Soon</div>,
        'time-tracking': () => <div className="p-6">Time Tracking - {userRole} View - Coming Soon</div>,
        reports: () => <div className="p-6">Reports - {userRole} View - Coming Soon</div>,
        files: () => <div className="p-6">Files - {userRole} View - Coming Soon</div>,
        calendar: () => <div className="p-6">Calendar - {userRole} View - Coming Soon</div>,
        discussions: () => <div className="p-6">Discussions - {userRole} View - Coming Soon</div>,
        settings: () => <div className="p-6">Settings - {userRole} View - Coming Soon</div>,
        roles: () => <div className="p-6">Roles - {userRole} View - Coming Soon</div>,
        'system-settings': () => <div className="p-6">System Settings - {userRole} View - Coming Soon</div>,
        integrations: () => <div className="p-6">Integrations - {userRole} View - Coming Soon</div>,
        'activity-logs': () => <div className="p-6">Activity Logs - {userRole} View - Coming Soon</div>,
    };

    const CurrentComponent = pageComponents[activeNav] || pageComponents.dashboard;

    return (
        <CurrentComponent
            user={user}
            userRole={userRole}
            projects={projects}
            tasks={tasks}
            teamMembers={teamMembers}
            onTaskUpdate={onTaskUpdate}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            onShareProject={onShareProject}
            onInviteMember={onInviteMember}
        />
    );
};

export default DashboardRouter;