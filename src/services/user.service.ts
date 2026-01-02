import { api } from '@/lib/api';

export interface User {
    id: string;
    email: string;
    name: string;
    Status: boolean;
    email_verified: boolean;
    referral_code: string;
    created_at: string;
    updated_at: string;
}

export interface ReferralStatsResponse {
    referral_code: string;
    total_referrals: number;
    successful_passes: number;
    pending_referrals: number;
    total_earned: number;
}

export const userService = {
    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/users/me');
        return response.data;
    },

    async updateCurrentUser(data: { email?: string; name?: string; password?: string }): Promise<User> {
        const response = await api.put<User>('/users/me', data);
        return response.data;
    },

    async getReferralStats(): Promise<ReferralStatsResponse> {
        const response = await api.get<ReferralStatsResponse>('/users/referrals');
        return response.data;
    }
};
