import React, { useEffect, useState } from 'react'
import Login from '../pages/Login';
import Home from '../pages/Home';
import toast from 'react-hot-toast';

const ProtectedRoute = () => {

    const [isTokenPresent, setisTokenPresent] = useState(false)

    const checkToken = () => {
        const token = localStorage.getItem('token');
        toast('token not present')
        setisTokenPresent(token ? true : false);
    }

    useEffect(() => {
        checkToken();
    }, [])

    if (!isTokenPresent) {
        return <Login />
    }

    return (
        <Home />
    )
}

export default ProtectedRoute