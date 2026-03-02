import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useLocalStorage('streaming_users', []);
    const [currentUser, setCurrentUser] = useLocalStorage('streaming_current_user', null);
    const [watchlist, setWatchlist] = useLocalStorage('streaming_watchlist', []);
    const [history, setHistory] = useLocalStorage('streaming_history', []);

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return { success: true };
        }
        return { success: false, message: 'Identifiants invalides' };
    };

    const register = (userData) => {
        const exists = users.find(u => u.email === userData.email);
        if (exists) {
            return { success: false, message: 'Cet email est déjà utilisé' };
        }
        const newUser = { ...userData, id: Date.now() };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const addToWatchlist = (video) => {
        if (!watchlist.find(v => v.id === video.id)) {
            setWatchlist([...watchlist, { ...video, addedAt: new Date().toISOString() }]);
        }
    };

    const removeFromWatchlist = (videoId) => {
        setWatchlist(watchlist.filter(v => v.id !== videoId));
    };

    const toggleWatchlist = (video) => {
        if (watchlist.find(v => v.id === video.id)) {
            removeFromWatchlist(video.id);
        } else {
            addToWatchlist(video);
        }
    };

    const addToHistory = (video, progressTime = 0, completed = false) => {
        const existing = history.find(h => h.id === video.id);
        if (existing) {
            setHistory(history.map(h =>
                h.id === video.id ? { ...h, watchedAt: new Date().toISOString(), progressTime, completed } : h
            ));
        } else {
            setHistory([...history, { ...video, watchedAt: new Date().toISOString(), progressTime, completed }]);
        }
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        watchlist,
        toggleWatchlist,
        history,
        addToHistory
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
