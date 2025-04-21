import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@auth:user';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to load user from storage:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            if (email.trim() === '' || password.trim() === '') {
                throw new Error('Email and password are required');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            if (email !== "test@gmail.com" || password !== "123456") {
                throw new Error('Invalid email or password');
            }

            const userData = {
                name: email.split('@')[0],
                email: email,
            };
            setUser(userData);
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name, email, password) => {
        try {
            setLoading(true);

            if (!name.trim() || !email.trim() || !password.trim()) {
                throw new Error('All fields are required');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedEmail)) {
                throw new Error('Please enter a valid email address');
            }

            const userData = {
                name: trimmedName,
                email: trimmedEmail,
            };

            setUser(userData);
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const logout = async () => {
        try {
            setLoading(true);
            setUser(null);
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
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