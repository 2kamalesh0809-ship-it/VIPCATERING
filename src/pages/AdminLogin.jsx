import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            // First time setup - auto create the admin user if it doesn't exist
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    navigate('/admin/dashboard');
                } catch (createErr) {
                    if (createErr.code === 'auth/email-already-in-use') {
                        setError('Incorrect password. Please try again.');
                    } else {
                        setError(createErr.message);
                    }
                }
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 relative overflow-hidden z-[100]">
            <div className="absolute inset-0 bg-luxury-blobs mix-blend-multiply opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-[#1A1A1A] p-8 md:p-10 rounded-3xl border border-[#C9A227]/20 shadow-2xl relative z-10"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227]">
                        <Lock size={32} />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Secure access to VIP Catering Systems</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-500" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:border-[#C9A227] focus:outline-none transition-colors"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-500" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:border-[#C9A227] focus:outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-[#C9A227] hover:bg-[#b08d22] text-black font-bold rounded-xl transition-colors mt-8"
                    >
                        Secure Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
