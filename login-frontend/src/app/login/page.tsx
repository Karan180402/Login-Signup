'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/auth/login", user);
            if (response.data.access_token) {
                localStorage.setItem('auth_token', response.data.access_token);

                toast.success("Login successful!");
                router.push('/dashboard');
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h1 style={{ textAlign: 'center' }}>{loading ? "Processing..." : "Login"}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                    <label>Email</label>
                    <input
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter your email"
                        type="email"
                    />
                    <label>Password</label>
                    <input
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Enter your password"
                        type="password"
                    />
                    <button onClick={onLogin} disabled={buttonDisabled || loading}>
                        {loading ? "Logging In..." : "Login"}
                    </button>
                    <p style={{ textAlign: 'center' }}>
                        Don't have an account? <Link href="/signup">Sign up here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
