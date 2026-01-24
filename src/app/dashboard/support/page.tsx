"use client";

import { useState, useEffect, useRef } from "react";
import {
    Plus,
    MessageCircle,
    Clock,
    CheckCircle,
    AlertTriangle,
    Send,
    ArrowLeft,
    Loader2,
    Inbox,
    XCircle,
    AlertCircle
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
    supportTicketService,
    SupportTicket,
    SupportMessage,
    TicketStatus,
    TicketPriority
} from "@/services/support-ticket.service";
import { userService, User } from "@/services/user.service";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function UserSupportPage() {
    const [user, setUser] = useState<User | null>(null);
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingTicket, setLoadingTicket] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Create Ticket Form State
    const [newSubject, setNewSubject] = useState("");
    const [newPriority, setNewPriority] = useState<TicketPriority>("medium");
    const [newContent, setNewContent] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedTicket?.messages) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedTicket?.messages]);

    const fetchData = async () => {
        try {
            const userData = await userService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }

        try {
            const ticketsData = await supportTicketService.getUserTickets();
            // Ensure we always have an array
            setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
            toast.error("Failed to load support tickets");
            setTickets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTicket = async (ticket: SupportTicket) => {
        setLoadingTicket(true);
        try {
            const fullTicket = await supportTicketService.getTicketById(ticket.id);
            setSelectedTicket(fullTicket);
        } catch (error) {
            toast.error("Failed to load ticket details");
        } finally {
            setLoadingTicket(false);
        }
    };

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubject.trim() || !newContent.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setCreating(true);
        try {
            const ticket = await supportTicketService.createTicket({
                subject: newSubject,
                message: newContent,
                priority: newPriority
            });
            setTickets([ticket, ...tickets]);
            setShowCreateModal(false);
            setNewSubject("");
            setNewContent("");
            setNewPriority("medium");
            toast.success("Ticket created successfully!");
            handleSelectTicket(ticket);
        } catch (error) {
            toast.error("Failed to create ticket");
        } finally {
            setCreating(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedTicket) return;

        setSending(true);
        try {
            const message = await supportTicketService.sendMessage(selectedTicket.id, newMessage);
            setSelectedTicket({
                ...selectedTicket,
                messages: [...(selectedTicket.messages || []), message]
            });
            setNewMessage("");
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setSending(false);
        }
    };

    const getStatusConfig = (status: TicketStatus) => {
        switch (status) {
            case 'open':
                return { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Open' };
            case 'in_progress':
                return { color: 'bg-blue-100 text-blue-700', icon: AlertCircle, label: 'In Progress' };
            case 'resolved':
                return { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Resolved' };
            case 'closed':
                return { color: 'bg-gray-100 text-gray-600', icon: XCircle, label: 'Closed' };
            default:
                return { color: 'bg-gray-100 text-gray-600', icon: Clock, label: status };
        }
    };

    const getPriorityConfig = (priority: TicketPriority) => {
        switch (priority) {
            case 'urgent':
                return { color: 'bg-red-100 text-red-700', label: 'Urgent' };
            case 'high':
                return { color: 'bg-orange-100 text-orange-700', label: 'High' };
            case 'medium':
                return { color: 'bg-yellow-100 text-yellow-700', label: 'Medium' };
            case 'low':
                return { color: 'bg-gray-100 text-gray-600', label: 'Low' };
            default:
                return { color: 'bg-gray-100 text-gray-600', label: priority };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={user || undefined} />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                        <p className="text-gray-500">Get help with your account and services</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-5 h-5" />
                        New Ticket
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Tickets List */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Stats Card */}
                        <div className="bg-gradient-to-br from-[#0a0e27] to-[#1a235e] rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="relative z-10">
                                <p className="text-blue-200 text-sm font-medium mb-1">Total Tickets</p>
                                <h2 className="text-3xl font-bold">{tickets.length}</h2>
                                <div className="flex gap-4 mt-4 text-xs">
                                    <div>
                                        <span className="text-yellow-300">{tickets.filter(t => t.status === 'open').length}</span>
                                        <span className="text-blue-200 ml-1">Open</span>
                                    </div>
                                    <div>
                                        <span className="text-green-300">{tickets.filter(t => t.status === 'resolved').length}</span>
                                        <span className="text-blue-200 ml-1">Resolved</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tickets */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Your Tickets</h3>
                            </div>
                            <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                                {loading ? (
                                    <div className="p-8 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                    </div>
                                ) : tickets.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <Inbox className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p>No tickets yet</p>
                                        <p className="text-sm">Create one to get started</p>
                                    </div>
                                ) : (
                                    tickets.map((ticket) => {
                                        const statusConfig = getStatusConfig(ticket.status);
                                        const StatusIcon = statusConfig.icon;
                                        return (
                                            <div
                                                key={ticket.id}
                                                onClick={() => handleSelectTicket(ticket)}
                                                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedTicket?.id === ticket.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-medium text-gray-900 line-clamp-1">{ticket.subject}</h4>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {statusConfig.label}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">{formatDate(ticket.created_at)}</p>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Ticket Detail / Conversation */}
                    <div className="lg:col-span-2">
                        {loadingTicket ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[600px] flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                            </div>
                        ) : selectedTicket ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
                                {/* Ticket Header */}
                                <div className="p-4 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <button
                                            onClick={() => setSelectedTicket(null)}
                                            className="lg:hidden p-1 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <h3 className="font-semibold text-gray-900">{selectedTicket.subject}</h3>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusConfig(selectedTicket.status).color}`}>
                                            {getStatusConfig(selectedTicket.status).label}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityConfig(selectedTicket.priority).color}`}>
                                            {getPriorityConfig(selectedTicket.priority).label} Priority
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Created {formatDate(selectedTicket.created_at)}
                                        </span>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {selectedTicket.messages?.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] ${message.sender_type === 'user'
                                                ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                                                : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md'
                                                } p-4`}>
                                                <p className="text-sm whitespace-pre-wrap">{message.content || message.message}</p>
                                                <p className={`text-xs mt-2 ${message.sender_type === 'user' ? 'text-blue-200' : 'text-gray-500'
                                                    }`}>
                                                    {message.sender_type === 'admin' && <span className="font-medium">Support Team • </span>}
                                                    {formatDate(message.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Reply Input */}
                                {selectedTicket.status !== 'closed' && (
                                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-gray-50">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type your message..."
                                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                            />
                                            <button
                                                type="submit"
                                                disabled={sending || !newMessage.trim()}
                                                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {selectedTicket.status === 'closed' && (
                                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-gray-500 text-sm">
                                        This ticket has been closed
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[600px] flex flex-col items-center justify-center text-gray-500">
                                <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                                <p className="font-medium">Select a ticket to view conversation</p>
                                <p className="text-sm">Or create a new ticket to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Create Ticket Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900">Create New Support Ticket</h3>
                            <p className="text-sm text-gray-500">Describe your issue and we'll get back to you soon</p>
                        </div>

                        <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={newSubject}
                                    onChange={(e) => setNewSubject(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Brief description of your issue"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={newPriority}
                                    onChange={(e) => setNewPriority(e.target.value as TicketPriority)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                >
                                    <option value="low">Low - General question</option>
                                    <option value="medium">Medium - Need assistance</option>
                                    <option value="high">High - Important issue</option>
                                    <option value="urgent">Urgent - Critical problem</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                    placeholder="Please describe your issue in detail..."
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {creating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Ticket"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
