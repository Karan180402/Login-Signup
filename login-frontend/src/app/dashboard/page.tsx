'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    username?: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            router.push('/login');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch('http://localhost:4000/auth/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Token verification failed');
                }

                const data = await response.json();

                setUser(data.user);
            } catch (err: any) {
                setError(err.message);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the secure dashboard page, {user?.email}!</p>
        </div>
    );
}
