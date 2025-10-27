// resources/js/contexts/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, initialUser = null }) => {
    const [user, setUser] = useState(initialUser);
<<<<<<< HEAD
    const [userRole, setUserRole] = useState(initialUser?.role || "manager");
=======
    const [userRole, setUserRole] = useState(initialUser?.role || 'manager');
>>>>>>> 21672d14f255e5f109d81a25046b359c33c6b80e

    // Update role when user changes
    useEffect(() => {
        if (user?.role) {
            setUserRole(user.role);
        }
    }, [user]);

    const updateUser = (newUserData) => {
        setUser(newUserData);
        if (newUserData?.role) {
            setUserRole(newUserData.role);
        }
    };

    const value = {
        user,
        userRole,
        setUser: updateUser,
        updateUserRole: setUserRole
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
