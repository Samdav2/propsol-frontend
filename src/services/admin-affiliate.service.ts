import { api } from '@/lib/api';

export interface AffiliateDashboardStats {
    total_earnings_paid: number;
    total_pending_earnings: number;
    total_signups: number;
    total_referral_volume: number;
    active_affiliates_count: number;
    conversion_rate: number;
}

export interface TopAffiliateItem {
    user_id: string;
    name: string;
    referral_code: string;
    total_earnings: number;
    total_referrals: number;
}

export interface ProductAffiliateStats {
    product_name: string;
    total_sales_count: number;
    total_sales_volume: number;
    total_commission_generated: number;
}

export interface GlobalSettingsResponse {
    default_commission_rate: number;
    minimum_withdrawal_amount: number;
    is_program_enabled: boolean;
}

export interface GlobalSettingsUpdate {
    default_commission_rate?: number;
    minimum_withdrawal_amount?: number;
    is_program_enabled?: boolean;
}

export interface AffiliateUserDetail {
    user_id: string;
    name: string;
    email: string;
    referral_code: string;
    joined_at: string;
    total_referrals: number;
    total_earnings: number;
    pending_earnings: number;
    paid_earnings: number;
    current_commission_rate: number;
    is_enabled: boolean;
    custom_rate: number | null;
}

export interface UserCommissionRateUpdate {
    custom_rate?: number | null;
    is_enabled?: boolean;
    notes?: string;
}

class AdminAffiliateService {
    async getDashboardStats(): Promise<AffiliateDashboardStats> {
        const response = await api.get<AffiliateDashboardStats>('/admin/affiliates/dashboard');
        return response.data;
    }

    async getTopAffiliates(limit: number = 10): Promise<TopAffiliateItem[]> {
        const response = await api.get<TopAffiliateItem[]>('/admin/affiliates/top', {
            params: { limit }
        });
        return response.data;
    }

    async getProductStats(): Promise<ProductAffiliateStats[]> {
        const response = await api.get<ProductAffiliateStats[]>('/admin/affiliates/products');
        return response.data;
    }

    async getGlobalSettings(): Promise<GlobalSettingsResponse> {
        const response = await api.get<GlobalSettingsResponse>('/admin/affiliates/settings/global');
        return response.data;
    }

    async updateGlobalSettings(settings: GlobalSettingsUpdate): Promise<GlobalSettingsResponse> {
        const response = await api.patch<GlobalSettingsResponse>('/admin/affiliates/settings/global', settings);
        return response.data;
    }

    async getAffiliateDetails(userId: string): Promise<AffiliateUserDetail> {
        const response = await api.get<AffiliateUserDetail>(`/admin/affiliates/users/${userId}`);
        return response.data;
    }

    async updateAffiliateSettings(userId: string, settings: UserCommissionRateUpdate): Promise<void> {
        await api.patch(`/admin/affiliates/users/${userId}/settings`, settings);
    }
}

export const adminAffiliateService = new AdminAffiliateService();
