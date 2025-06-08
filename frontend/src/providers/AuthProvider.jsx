import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {

    const [auth, setAuth] = useState(false);

    useEffect(() => {

        const getAuth = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/verify', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const result = await response.json();

                console.log(result);

                if (result?.error) return false;

                console.log(result);

                setAuth(true);

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

    return <AuthContext.Provider value={ auth }>
        { children }
    </AuthContext.Provider>

}

export default AuthProvider;