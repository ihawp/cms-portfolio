import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {

    const [auth, setAuth] = useState(false);

    const navigate = useNavigate();

    const logout = async (event) => {
        event.preventDefault();

        if (!window.confirm("Are you sure you want to logout?")) return;

        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + 'auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) return false;

            const data = await response.json();

            if (data.error) return false;

            setAuth(false);
            navigate('/');
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {

        const getAuth = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SERVER_URL + 'auth/verify', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) return false;

                const result = await response.json();

                if (result?.error) return false;

                return true;

            } catch (error) {
                return false;
            }
        }

        const doAuthCheck = async () => {
            const response = await getAuth();
            setAuth(response);
        }

        doAuthCheck();

    }, []);

    return <AuthContext.Provider value={{ auth, logout }}>
        { children }
    </AuthContext.Provider>

}

export default AuthProvider;