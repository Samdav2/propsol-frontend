"use client";

import { useEffect, useState } from "react";
import { supportService, SupportMessage } from "@/services/support.service";
import { Search, Mail, Phone, Clock, Loader2, Inbox, User } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await supportService.getAllMessages();
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            toast.error("Failed to load support messages");
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredMessages = messages.filter((msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Support Messages
                    </h2>
                    <p className="text-slate-500">View contact form submissions from users.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-blue-50 rounded-xl text-blue-700 font-medium text-sm">
                        {messages.length} Total Messages
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors"
                        placeholder="Search by name, email, or message content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Messages List */}
            <div className="grid gap-4">
                {loading ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No support messages found</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(selectedMessage?.id === msg.id ? null : msg)}
                            className={`bg-white rounded-xl border shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedMessage?.id === msg.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
                                }`}
                        >
                            {/* Message Header */}
                            <div className="p-4 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                    {msg.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-semibold text-slate-900">{msg.name}</h3>
                                        <span className="text-xs text-slate-500 flex items-center gap-1 flex-shrink-0">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(msg.created_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3.5 h-3.5" />
                                            {msg.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Phone className="w-3.5 h-3.5" />
                                            {msg.phone}
                                        </span>
                                    </div>
                                    <p className={`mt-2 text-slate-600 ${selectedMessage?.id === msg.id ? '' : 'line-clamp-2'}`}>
                                        {msg.message}
                                    </p>
                                </div>
                            </div>

                            {/* Expanded View */}
                            {selectedMessage?.id === msg.id && (
                                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50">
                                    <div className="flex gap-2">
                                        <a
                                            href={`mailto:${msg.email}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Mail className="w-4 h-4" />
                                            Reply via Email
                                        </a>
                                        <a
                                            href={`tel:${msg.phone}`}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Phone className="w-4 h-4" />
                                            Call
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
