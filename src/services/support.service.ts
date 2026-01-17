import { api } from '@/lib/api';

export interface SupportCreate {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface SupportMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
}

export const supportService = {
    async createTicket(data: SupportCreate): Promise<SupportMessage> {
        const response = await api.post<SupportMessage>('/support/', data);
        return response.data;
    },

    async getAllMessages(skip: number = 0, limit: number = 100): Promise<SupportMessage[]> {
        const response = await api.get<SupportMessage[]>('/support/', {
            params: { skip, limit }
        });
        return response.data;
    }
};
