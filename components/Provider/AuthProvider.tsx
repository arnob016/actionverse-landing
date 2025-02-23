'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from '../ui/use-toast';

// Define types for AuthContext value
interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<UserCredential>;  // Fix: Ensure signIn returns a UserCredential
    signUp: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('USER:', user);
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (res.user) {
                toast({
                    title: 'Signed in successfully',
                    description: `Welcome back, ${res.user.email}`,
                })
            }
            return res;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            if (res.user) {
                toast({
                    title: 'Signed up successfully, please sign in',
                    description: `Please sign in with ${res.user.email}`,
                })
            }
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            toast({
                title: 'Signed out successfully',
                description: 'You have been signed out',
            })
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
