import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../api/axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/Constants';
import { useEffect, useState } from 'react';

function ProtectedRoutes({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(
        () => {
            auth().catch(() => {
                setIsAuthorized(false)
            })
        },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access); 
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const token_expiration = decoded.exp;
        const time = Date.now() / 1000;
        if (token_expiration < time) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };



    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes;