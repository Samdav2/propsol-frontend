import { api } from '@/lib/api';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: string;
    user_id: string;
    admin_id: string;
    created_at: string;
    updated_at: string;
}

export const notificationService = {
    async getMyNotifications(): Promise<Notification[]> {
        const response = await api.get<Notification[]>('/notifications/my-notifications');
        return response.data;
    }
};
