import React, { createContext, useState } from 'react';

// 1. On crée le contexte
export const AuthContext = createContext();

// 2. On crée le Provider (C'est lui que tu importes dans App.js)
// Note le "export const" -> c'est un export nommé
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};