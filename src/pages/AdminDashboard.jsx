import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Calendar, Image as ImageIcon, LogOut, Check, Upload, Loader2, X } from 'lucide-react';
import { db, auth, storage } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Listen to live database changes securely
        const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEvents(eventsData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteDoc(doc(db, "events", id));
            } catch (err) {
                alert("Error deleting: " + err.message);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let imageUrl = currentEvent.imageUrl || '';

        try {
            if (imageFile) {
                setIsUploading(true);
                const storageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                imageUrl = await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress);
                        },
                        (error) => reject(error),
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        }
                    );
                });
                setIsUploading(false);
            }

            const eventToSave = { ...currentEvent, imageUrl };

            if (isEditing) {
                const { id, ...updateData } = eventToSave;
                await updateDoc(doc(db, "events", id), updateData);
            } else {
                await addDoc(collection(db, "events"), {
                    ...eventToSave,
                    createdAt: serverTimestamp()
                });
            }

            setShowForm(false);
            setCurrentEvent(null);
            setIsEditing(false);
            setImageFile(null);
            setImagePreview(null);
            setUploadProgress(0);
        } catch (err) {
            alert("Error saving: " + err.message);
            setIsUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-6 relative z-[100]">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12 py-6 border-b border-gray-800">
                    <div>
                        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
                        <p className="text-gray-400 mt-2">Manage your live website content.</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {!showForm ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2"><Calendar className="text-[#C9A227]" /> Live Events</h2>
                            <button
                                onClick={() => { setShowForm(true); setCurrentEvent({}); setIsEditing(false); }}
                                className="flex items-center gap-2 bg-[#C9A227] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#b08d22] transition-colors"
                            >
                                <Plus size={20} /> New Event
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((ev) => (
                                <motion.div
                                    key={ev.id}
                                    layoutId={`card-${ev.id}`}
                                    className="bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden group hover:border-[#C9A227]/50 transition-colors"
                                >
                                    <div className="h-48 bg-gray-900 relative">
                                        {ev.imageUrl ? (
                                            <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover opacity-80" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                                                <ImageIcon size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setShowForm(true); setIsEditing(true); setCurrentEvent(ev); }}
                                                className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-[#C9A227] transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ev.id)}
                                                className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-wider mb-2">{ev.category} • {ev.date}</div>
                                        <h3 className="text-xl font-bold mb-2 truncate">{ev.title}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">{ev.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {events.length === 0 && !loading && (
                                <div className="col-span-3 text-center py-20 bg-[#111] rounded-2xl border border-gray-800 border-dashed">
                                    <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
                                    <h3 className="text-xl text-gray-400">No Events Found</h3>
                                    <p className="text-gray-500">Click "New Event" to create your first one.</p>
                                </div>
                            )}
                            {loading && (
                                <div className="col-span-3 text-center py-20">
                                    <p className="text-gray-400 animate-pulse">Loading secure database...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto bg-[#1A1A1A] p-8 rounded-3xl border border-gray-800"
                    >
                        <h2 className="text-2xl font-bold mb-8">{isEditing ? 'Edit Event' : 'Create New Event'}</h2>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Event Title</label>
                                    <input
                                        type="text" required
                                        value={currentEvent?.title || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-800 focus:border-[#C9A227] outline-none"
                                        placeholder="E.g. The Ambani Wedding"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Event Date</label>
                                    <input
                                        type="date" required
                                        value={currentEvent?.date || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-800 focus:border-[#C9A227] outline-none text-white [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Category</label>
                                    <select
                                        value={currentEvent?.category || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-800 focus:border-[#C9A227] outline-none"
                                        required
                                    >
                                        <option value="">Select Category...</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Private Event">Private Event</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Starting Price (₹)</label>
                                    <input
                                        type="text"
                                        value={currentEvent?.price || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, price: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-800 focus:border-[#C9A227] outline-none"
                                        placeholder="E.g. 1,500/plate"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Location</label>
                                    <input
                                        type="text" required
                                        value={currentEvent?.location || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-800 focus:border-[#C9A227] outline-none"
                                        placeholder="E.g. Leela Palace, Chennai"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Event Image</label>
                                    <div className="relative group">
                                        <div className={`w-full h-40 rounded-xl bg-[#0A0A0A] border-2 border-dashed ${imagePreview ? 'border-[#C9A227]/50' : 'border-gray-800'} flex flex-col items-center justify-center transition-colors hover:border-[#C9A227]/30 overflow-hidden`}>
                                            {imagePreview ? (
                                                <div className="relative w-full h-full group">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <button
                                                            type="button"
                                                            onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                            className="p-2 bg-red-500 rounded-full text-white"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="text-gray-600 mb-2" size={32} />
                                                    <p className="text-xs text-gray-500">Click to upload image</p>
                                                    <p className="text-[10px] text-[#C9A227] mt-1 font-bold uppercase tracking-wider">Recommended Ratio: 4:5</p>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/80 rounded-xl flex flex-col items-center justify-center z-20">
                                                <Loader2 className="animate-spin text-[#C9A227] mb-2" size={32} />
                                                <div className="w-3/4 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-[#C9A227] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                                </div>
                                                <p className="text-[10px] text-white mt-2 font-bold">{Math.round(uploadProgress)}%</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
                                <textarea
                                    rows="4" required
                                    value={currentEvent?.desc || ''}
                                    onChange={e => setCurrentEvent({ ...currentEvent, desc: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-800 focus:border-[#C9A227] outline-none"
                                    placeholder="Brief details about the event catering..."
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-800">
                                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl font-bold bg-gray-800 hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#C9A227] text-black hover:bg-[#b08d22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} /> Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={20} /> Save Event
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
