import { api } from '@/lib/api';

// Enums matching backend
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SenderType = 'user' | 'admin';

// Interfaces
export interface SupportMessage {
    id: string;
    ticket_id: string;
    sender_type: SenderType;
    sender_id: string;
    sender_name?: string;
    content?: string;
    message?: string; // Backend may use 'message' instead of 'content'
    created_at: string;
}

export interface SupportTicket {
    id: string;
    user_id: string;
    user_name?: string;
    user_email?: string;
    subject: string;
    status: TicketStatus;
    priority: TicketPriority;
    created_at: string;
    updated_at: string;
    messages?: SupportMessage[];
}

export interface CreateTicketRequest {
    subject: string;
    message: string;
    priority?: TicketPriority;
}

export interface SendMessageRequest {
    content: string;
}

export interface UpdateStatusRequest {
    status: TicketStatus;
}

export interface TicketFilters {
    status?: TicketStatus;
    priority?: TicketPriority;
    skip?: number;
    limit?: number;
}

// Service
export const supportTicketService = {
    // ============ USER ENDPOINTS ============

    /**
     * Create a new support ticket
     */
    async createTicket(data: CreateTicketRequest): Promise<SupportTicket> {
        const response = await api.post<SupportTicket>('/support/tickets', data);
        return response.data;
    },

    /**
     * Get current user's tickets
     */
    async getUserTickets(): Promise<SupportTicket[]> {
        const response = await api.get<SupportTicket[] | { items: SupportTicket[] }>('/support/tickets');
        // Handle both direct array and paginated response
        const data = response.data;
        if (Array.isArray(data)) {
            return data;
        } else if (data && 'items' in data) {
            return data.items;
        }
        return [];
    },

    /**
     * Get a specific ticket with messages
     */
    async getTicketById(ticketId: string): Promise<SupportTicket> {
        const response = await api.get<SupportTicket>(`/support/tickets/${ticketId}`);
        return response.data;
    },

    /**
     * Send a message to a ticket
     */
    async sendMessage(ticketId: string, content: string): Promise<SupportMessage> {
        const response = await api.post<SupportMessage>(`/support/tickets/${ticketId}/messages`, {
            message: content
        });
        return response.data;
    },

    // ============ ADMIN ENDPOINTS ============

    /**
     * Get all tickets (admin only)
     */
    async getAllTickets(filters?: TicketFilters): Promise<SupportTicket[]> {
        const response = await api.get<SupportTicket[] | { items: SupportTicket[] }>('/support/admin/tickets', {
            params: filters
        });
        // Handle both direct array and paginated response
        const data = response.data;
        if (Array.isArray(data)) {
            return data;
        } else if (data && 'items' in data) {
            return data.items;
        }
        return [];
    },

    /**
     * Get a specific ticket with messages (admin)
     */
    async getAdminTicketById(ticketId: string): Promise<SupportTicket> {
        const response = await api.get<SupportTicket>(`/support/admin/tickets/${ticketId}`);
        return response.data;
    },

    /**
     * Reply to a ticket (admin)
     */
    async replyToTicket(ticketId: string, content: string): Promise<SupportMessage> {
        const response = await api.post<SupportMessage>(`/support/admin/tickets/${ticketId}/messages`, {
            message: content
        });
        return response.data;
    },

    /**
     * Update ticket status (admin)
     */
    async updateTicketStatus(ticketId: string, status: TicketStatus): Promise<SupportTicket> {
        const response = await api.patch<SupportTicket>(`/support/admin/tickets/${ticketId}/status`, {
            status
        });
        return response.data;
    }
};
