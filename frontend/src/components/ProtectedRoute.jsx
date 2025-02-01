import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import Login from '../pages/Login';
import Loader from './Loader';

const ProtectedRoute = ({ component }) => {
    const [isAuthUser, setIsAuthUser] = useState(true);
    const [isToken, setIsToken] = useState(true);

    const checkToken = () => {
        const token = localStorage.getItem('token');
        token ? setIsToken(true) : setIsToken(false);
    }

    const checkUserLoginStatus = async () => {
        try {
            const response = await axios.get('/auth/check');
            if (response.data.statusCode === 200 && response.data.data) setIsAuthUser(true);
            else setIsAuthUser(false);
        } catch (err) {
            setIsAuthUser(false);
        }
    };

    useEffect(() => {
        // checkToken();
        checkUserLoginStatus();
    }, []);

    if (!isAuthUser) return <Login />

    return component;
};

export default ProtectedRoute