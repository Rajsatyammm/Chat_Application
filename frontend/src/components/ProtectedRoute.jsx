import React, { useEffect } from 'react';
import Login from '../pages/Login';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ component }) => {
    const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (!authUser) return <Login />

    return component;
};

export default ProtectedRoute