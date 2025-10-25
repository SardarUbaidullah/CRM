import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import Header from '@/Components/Header';
import KanbanBoard from '@/Components/KanbanBoard';

const Dashboard = () => {
    const { props } = usePage();
    const userFromServer = props?.auth?.user ?? null;
    const user = userFromServer || {
        id: 99,
        name: 'Anima Agrawal',
        email: 'anima@example.com',
        role: 'super_admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    };

    const [activeNav, setActiveNav] = useState('dashboard');
    const [activeProject, setActiveProject] = useState('Mobile App');
    const [query, setQuery] = useState('');

    // Enhanced initial tasks with complete data structure
    const [tasks, setTasks] = useState({
        todo: [
            {
                id: 't1',
                title: 'Brainstorming Session',
                description: 'Bring team members diverse experience into play and generate innovative ideas for the project',
                tag: { text: 'Planning', color: 'primary' },
                priority: 'low',
                dueDate: '2024-02-20',
                comments: 3,
                files: 1,
                assignedMembers: [1, 2],
                progress: 0,
                status: 1,
                createdAt: '2024-01-25',
                isStarred: false
            },
            {
                id: 't2',
                title: 'Market Research',
                description: 'Conduct comprehensive user research to create an optimal product that meets customer needs',
                tag: { text: 'Research', color: 'accent' },
                priority: 'high',
                dueDate: '2024-02-10',
                comments: 7,
                files: 2,
                assignedMembers: [3],
                progress: 0,
                status: 1,
                createdAt: '2024-01-26',
                isStarred: true
            },
            {
                id: 't3',
                title: 'Project Documentation',
                description: 'Create detailed project documentation including requirements and specifications',
                tag: { text: 'Documentation', color: 'warning' },
                priority: 'medium',
                dueDate: '2024-02-05',
                comments: 2,
                files: 4,
                assignedMembers: [4],
                progress: 0,
                status: 1,
                createdAt: '2024-01-27',
                isStarred: false
            }
        ],
        progress: [
            {
                id: 'p1',
                title: 'Onboarding Illustrations',
                description: 'Create welcoming and engaging onboarding illustrations for the mobile application',
                tag: { text: 'Design', color: 'purple' },
                priority: 'medium',
                dueDate: '2024-02-15',
                comments: 12,
                files: 3,
                assignedMembers: [2, 4],
                progress: 60,
                status: 2,
                createdAt: '2024-01-20',
                isStarred: true,
                hasImage: true
            },
            {
                id: 'p2',
                title: 'API Development',
                description: 'Develop RESTful API endpoints for user authentication and data management',
                tag: { text: 'Backend', color: 'accent' },
                priority: 'critical',
                dueDate: '2024-02-08',
                comments: 5,
                files: 1,
                assignedMembers: [3, 5],
                progress: 45,
                status: 2,
                createdAt: '2024-01-22',
                isStarred: false
            }
        ],
        review: [
            {
                id: 'r1',
                title: 'Mobile App Design',
                description: 'Review main mobile app screens, interactions, and user experience flow',
                tag: { text: 'UI/UX', color: 'warning' },
                priority: 'high',
                dueDate: '2024-02-12',
                comments: 8,
                files: 7,
                assignedMembers: [1, 2, 4],
                progress: 80,
                status: 3,
                createdAt: '2024-01-18',
                isStarred: false
            }
        ],
        done: [
            {
                id: 'd1',
                title: 'Project Setup & Configuration',
                description: 'Initialize project repository and setup development environment with CI/CD pipeline',
                tag: { text: 'Setup', color: 'secondary' },
                priority: 'medium',
                dueDate: '2024-01-30',
                comments: 15,
                files: 5,
                assignedMembers: [1, 5],
                progress: 100,
                status: 4,
                createdAt: '2024-01-15',
                isStarred: true
            },
            {
                id: 'd2',
                title: 'Team Onboarding',
                description: 'Complete team onboarding process and setup development tools for all members',
                tag: { text: 'HR', color: 'success' },
                priority: 'low',
                dueDate: '2024-01-25',
                comments: 6,
                files: 3,
                assignedMembers: [1, 2, 3, 4, 5],
                progress: 100,
                status: 4,
                createdAt: '2024-01-10',
                isStarred: false
            }
        ]
    });

    const [teamMembers] = useState([
        { id: 1, name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', role: 'Project Manager' },
        { id: 2, name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face', role: 'UI/UX Designer' },
        { id: 3, name: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face', role: 'Backend Developer' },
        { id: 4, name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face', role: 'Frontend Developer' },
        { id: 5, name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face', role: 'DevOps Engineer' }
    ]);

    useEffect(() => {
        // Example: Fetch real data from API
        // fetch('/api/dashboard')
        //     .then(response => response.json())
        //     .then(data => setTasks(data.tasks))
        //     .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Enhanced task update handler
    const handleTaskUpdate = (updatedTask) => {
        setTasks(prevTasks => {
            const newTasks = { ...prevTasks };

            // Remove task from all columns
            Object.keys(newTasks).forEach(columnKey => {
                newTasks[columnKey] = newTasks[columnKey].filter(task => task.id !== updatedTask.id);
            });

            // Add to appropriate column based on status
            const columnMap = {
                1: 'todo',
                2: 'progress',
                3: 'review',
                4: 'done'
            };

            const targetColumn = columnMap[updatedTask.status] || 'todo';
            newTasks[targetColumn].push(updatedTask);

            return newTasks;
        });

        // In a real app, you would call your API here:
        // axios.patch(`/api/tasks/${updatedTask.id}`, updatedTask)
        //     .then(response => console.log('Task updated:', response.data))
        //     .catch(error => console.error('Error updating task:', error));
    };

    // Enhanced add task handler
    const handleAddTask = (columnId) => {
        const newTask = {
            id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: 'New Task',
            description: 'Describe your task here...',
            tag: getColumnTag(columnId),
            priority: 'medium',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            comments: 0,
            files: 0,
            assignedMembers: [],
            progress: getColumnProgress(columnId),
            status: columnId,
            createdAt: new Date().toISOString(),
            isStarred: false
        };

        setTasks(prevTasks => {
            const columnMap = {
                1: 'todo',
                2: 'progress',
                3: 'review',
                4: 'done'
            };

            const targetColumn = columnMap[columnId] || 'todo';
            return {
                ...prevTasks,
                [targetColumn]: [newTask, ...prevTasks[targetColumn]]
            };
        });

        // API call for creating task
        // axios.post('/api/tasks', newTask)
        //     .then(response => console.log('Task created:', response.data))
        //     .catch(error => console.error('Error creating task:', error));
    };

    // Enhanced delete task handler
    const handleDeleteTask = (taskId, columnKey) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [columnKey]: prevTasks[columnKey].filter(task => task.id !== taskId)
        }));

        // API call for deleting task
        // axios.delete(`/api/tasks/${taskId}`)
        //     .then(response => console.log('Task deleted:', response.data))
        //     .catch(error => console.error('Error deleting task:', error));
    };

    // Helper functions
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

    // Project sharing handler
    const handleShareProject = () => {
        const projectUrl = window.location.href;
        navigator.clipboard.writeText(projectUrl).then(() => {
            alert('Project link copied to clipboard!');
        }).catch(() => {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = projectUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Project link copied to clipboard!');
        });
    };

    // Team member invitation handler
    const handleInviteMember = () => {
        const email = prompt('Enter email address to invite to the project:');
        if (email && email.includes('@')) {
            // API call to invite member
            // axios.post('/api/projects/invite', { email, project: activeProject })
            //     .then(response => {
            //         alert(`Invitation sent to ${email}`);
            //     })
            //     .catch(error => {
            //         alert('Failed to send invitation');
            //     });
            alert(`Invitation sent to ${email}`);
        } else if (email) {
            alert('Please enter a valid email address');
        }
    };

    // Filter tasks based on search query
    const filteredTasks = {
        todo: tasks.todo.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        ),
        progress: tasks.progress.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        ),
        review: tasks.review.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        ),
        done: tasks.done.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        )
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <Head title="Project Management — Dashboard" />

            <div className="flex h-screen">
                <Sidebar
                    activeNav={activeNav}
                    setActiveNav={setActiveNav}
                    activeProject={activeProject}
                    setActiveProject={setActiveProject}
                    user={user}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header
                        user={user}
                        query={query}
                        setQuery={setQuery}
                        projects={['Mobile App', 'Marketing', 'Website', 'E-commerce']}
                        activeProject={activeProject}
                        setActiveProject={setActiveProject}
                    />

                    <main className="flex-1 overflow-auto">
                        <KanbanBoard
                            tasks={filteredTasks}
                            teamMembers={teamMembers}
                            onTaskUpdate={handleTaskUpdate}
                            onAddTask={handleAddTask}
                            onDeleteTask={handleDeleteTask}
                            onShareProject={handleShareProject}
                            onInviteMember={handleInviteMember}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;