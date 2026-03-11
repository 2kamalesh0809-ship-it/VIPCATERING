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
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    useEffect(() => {
        // Listen to live database changes securely
        const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by createdAt safely
            setEvents(eventsData.sort((a, b) => {
                const aTime = a.createdAt?.toMillis() || 0;
                const bTime = b.createdAt?.toMillis() || 0;
                return bTime - aTime;
            }));
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
                showToast("Event deleted successfully");
            } catch (err) {
                showToast("Error deleting: " + err.message, "error");
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Validation
        if (!currentEvent.title || !currentEvent.date || !currentEvent.category) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        let imageUrl = currentEvent.imageUrl || '';

        try {
            if (imageFile) {
                setIsUploading(true);
                const storageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                try {
                    imageUrl = await new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error("Upload timed out. This might be a CORS issue or slow connection."));
                        }, 30000); // 30s timeout

                        uploadTask.on('state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setUploadProgress(progress);
                            },
                            (error) => {
                                clearTimeout(timeout);
                                reject(error);
                            },
                            async () => {
                                clearTimeout(timeout);
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                resolve(downloadURL);
                            }
                        );
                    });
                } catch (uploadErr) {
                    setIsUploading(false);
                    console.error("Upload error:", uploadErr);

                    if (uploadErr.message?.includes("CORS") || uploadErr.code === "storage/forbidden") {
                        showToast("Storage CORS error detected. Please configure Firebase Storage CORS rules.", "error");
                        throw new Error("CORS Policy blocked the upload. See 'storage.cors.json' for fix instructions.");
                    }
                    throw uploadErr;
                }
                setIsUploading(false);
            }

            const eventToSave = {
                title: currentEvent.title || "",
                date: currentEvent.date || "",
                category: currentEvent.category || "",
                price: currentEvent.price || "",
                location: currentEvent.location || "",
                desc: currentEvent.desc || "",
                imageUrl,
                updatedAt: serverTimestamp()
            };

            if (isEditing) {
                await updateDoc(doc(db, "events", currentEvent.id), eventToSave);
                showToast("Event updated successfully!");
            } else {
                await addDoc(collection(db, "events"), {
                    ...eventToSave,
                    createdAt: serverTimestamp()
                });
                showToast("New event created successfully!");
            }

            setShowForm(false);
            setCurrentEvent(null);
            setIsEditing(false);
            setImageFile(null);
            setImagePreview(null);
            setUploadProgress(0);
        } catch (err) {
            console.error(err);
            if (!err.message.includes("CORS")) {
                showToast("Error saving: " + err.message, "error");
            }
            setIsUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showToast("File size too large (Max 5MB)", "error");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-6 relative z-[100] overflow-x-hidden">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={`fixed top-4 left-1/2 z-[200] px-6 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-3 backdrop-blur-md border ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-[#C9A227]/30 text-[#C9A227]'
                            }`}
                    >
                        {toast.type === 'error' ? <X size={20} /> : <Check size={20} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12 py-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-2">Manage your luxury catering events.</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all font-semibold border border-red-100">
                        <LogOut size={18} /> Logout Admin
                    </button>
                </div>

                {!showForm ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                                <Calendar className="text-[#C9A227]" />
                                <span>Live Events <span className="text-sm font-normal text-slate-400 ml-2">({events.length})</span></span>
                            </h2>
                            <button
                                onClick={() => { setShowForm(true); setCurrentEvent({}); setIsEditing(false); window.scrollTo(0, 0); }}
                                className="flex items-center gap-2 bg-[#C9A227] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#E2B32C] active:scale-95 transition-all shadow-lg shadow-[#C9A227]/20"
                            >
                                <Plus size={20} /> New Event
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((ev) => (
                                <motion.div
                                    key={ev.id}
                                    layoutId={`card-${ev.id}`}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-[#C9A227]/30 transition-all duration-300 shadow-xl"
                                >
                                    <div className="h-56 bg-slate-100 relative overflow-hidden">
                                        {ev.imageUrl ? (
                                            <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                <ImageIcon size={48} className="mb-2 opacity-50" />
                                                <span className="text-xs uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <button
                                                onClick={() => { setShowForm(true); setIsEditing(true); setCurrentEvent(ev); window.scrollTo(0, 0); }}
                                                className="p-2.5 bg-black/80 backdrop-blur-md rounded-xl text-white hover:text-[#C9A227] transition-all border border-white/10"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ev.id)}
                                                className="p-2.5 bg-red-500/80 backdrop-blur-md rounded-xl text-white hover:bg-red-600 transition-all border border-red-400/20"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        {ev.price && (
                                            <div className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-white/80 backdrop-blur-md rounded-lg text-[#C9A227] text-sm font-bold border border-[#C9A227]/20">
                                                ₹{ev.price}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 bg-[#C9A227]/10 text-[#C9A227] text-[10px] font-bold uppercase tracking-widest rounded border border-[#C9A227]/20">
                                                {ev.category}
                                            </span>
                                            <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">•</span>
                                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{ev.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-[#C9A227] transition-colors">{ev.title}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{ev.desc}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {events.length === 0 && !loading && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Calendar className="text-slate-300" size={40} />
                                    </div>
                                    <h3 className="text-2xl text-slate-400 font-bold mb-2">Portfolio is Empty</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto mb-8">Ready to showcase your gold standard of taste? Start by adding your first catering event.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="bg-[#C19200]/10 text-[#C19200] border border-[#C19200]/30 px-8 py-3 rounded-xl font-bold hover:bg-[#C19200]/20 transition-all"
                                    >
                                        Create New Event
                                    </button>
                                </div>
                            )}

                            {loading && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-32">
                                    <Loader2 className="animate-spin text-[#C9A227] mx-auto mb-4" size={48} />
                                    <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Accessing Secure Database...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-2xl relative"
                    >
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-2 text-slate-900">{isEditing ? 'Edit Event Details' : 'Design New Event'}</h2>
                        <p className="text-slate-500 mb-10 text-sm">Fill in the exquisite details of your premium catering service.</p>

                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-[#C9A227] transition-colors">Event Title</label>
                                    <input
                                        type="text" required
                                        value={currentEvent?.title || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#C9A227] outline-none transition-all placeholder:text-slate-400"
                                        placeholder="E.g. Royal Wedding Reception"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Event Date</label>
                                    <input
                                        type="date" required
                                        value={currentEvent?.date || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#C9A227] outline-none text-slate-900 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Category</label>
                                    <select
                                        value={currentEvent?.category || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value })}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#C9A227] outline-none appearance-none transition-all cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Category...</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Private Event">Private Event</option>
                                        <option value="Product Launch">Product Launch</option>
                                        <option value="Gala Dinner">Gala Dinner</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Starting Price (₹)</label>
                                    <input
                                        type="text"
                                        value={currentEvent?.price || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, price: e.target.value })}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#C9A227] outline-none transition-all placeholder:text-slate-400"
                                        placeholder="E.g. 1,500/plate"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-[#C9A227] transition-colors">Location</label>
                                    <input
                                        type="text" required
                                        value={currentEvent?.location || ''}
                                        onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#C9A227] outline-none transition-all placeholder:text-slate-400"
                                        placeholder="E.g. ITC Grand Chola, Chennai"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Exquisite Visual (Image)</label>
                                    <div className="relative">
                                        <div className={`w-full h-44 rounded-2xl bg-slate-50 border-2 border-dashed ${imagePreview ? 'border-[#C9A227]/50' : 'border-slate-200'} flex flex-col items-center justify-center transition-all hover:border-[#C9A227]/30 overflow-hidden relative group/upload`}>
                                            {imagePreview ? (
                                                <div className="relative w-full h-full group/preview">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                                                            className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 transition-all active:scale-90"
                                                        >
                                                            <Trash2 size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 group-hover/upload:bg-slate-100 transition-colors shadow-sm">
                                                        <Upload className="text-slate-400" size={24} />
                                                    </div>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Click or Drop High-Res Photo</p>
                                                    <p className="text-[9px] text-[#C9A227] mt-1 opacity-60 uppercase font-bold tracking-[2px]">Max 5MB</p>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                        </div>
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-white/90 rounded-2xl flex flex-col items-center justify-center z-20 backdrop-blur-md">
                                                <div className="relative mb-4">
                                                    <Loader2 className="animate-spin text-[#C9A227]" size={48} />
                                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-[#C9A227]">
                                                        {Math.round(uploadProgress)}%
                                                    </span>
                                                </div>
                                                <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                                                    <div className="bg-[#C9A227] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest animate-pulse">Uploading to Cloud Storage...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Event Narrative (Description)</label>
                                <textarea
                                    rows="4" required
                                    value={currentEvent?.desc || ''}
                                    onChange={e => setCurrentEvent({ ...currentEvent, desc: e.target.value })}
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#C9A227] outline-none transition-all placeholder:text-slate-400 leading-relaxed"
                                    placeholder="Describe the atmosphere, menu highlights, and the gold standard of taste provided..."
                                />
                            </div>

                            <div className="flex gap-4 pt-8 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-8 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all border border-slate-200"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold bg-[#C9A227] text-black hover:bg-[#E2B32C] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#C9A227]/10"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={24} /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={24} /> {isEditing ? 'Commit Changes' : 'Publish to Website'}
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
