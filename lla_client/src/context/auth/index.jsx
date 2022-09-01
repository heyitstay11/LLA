import { useMemo, useContext, useState, createContext } from 'react';

const userData = window.sessionStorage.getItem('lla_user');
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(userData) || {});
    
    const value = useMemo(() => {
        return { auth, setAuth }
    }, [auth]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>  useContext(AuthContext);
