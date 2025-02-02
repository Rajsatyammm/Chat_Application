import React, { useEffect } from 'react';
import Login from '../pages/Login';
import { useAuthStore } from '../store/useAuthStore';
import Loader from './Loader';

const ProtectedRoute = ({ component }) => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <Loader />
    if (!authUser) return <Login />

    return component;
};

export default ProtectedRoute