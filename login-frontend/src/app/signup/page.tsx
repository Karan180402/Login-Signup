'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/auth/signup", user);
            if (response.status === 201) {
                toast.success("Signup successful!");
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username));
    }, [user]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h1 style={{ textAlign: 'center' }}>{loading ? "Processing..." : "Sign Up"}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                    <label>Username</label>
                    <input
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Enter your username"
                        type="text"
                    />
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
                    <button onClick={onSignup} disabled={buttonDisabled || loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <p style={{ textAlign: 'center' }}>
                        Already have an account? <Link href="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
