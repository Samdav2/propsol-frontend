import { api } from '@/lib/api';

// --- Types matching backend schemas ---

export interface WalletBalance {
    id: string;
    user_id: string;
    available_balance: number;
    locked_balance: number;
    total_withdrawn: number;
    created_at: string;
    updated_at: string;
}

export interface WalletSummary {
    available_balance: number;
    locked_balance: number;
    total_withdrawn: number;
    pending_withdrawals: number;
    total_earnings: number;
}

export type PassType = 'standard_pass' | 'guaranteed_pass';
export type EarningStatus = 'available' | 'locked' | 'withdrawn';
export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'completed';
export type PaymentMethod = 'bank_transfer' | 'crypto' | 'paypal';

export interface ReferralEarning {
    id: string;
    wallet_id: string;
    referrer_id: string;
    referred_user_id: string;
    pass_type: PassType;
    amount: number;
    status: EarningStatus;
    challenge_passed: boolean;
    created_at: string;
    updated_at: string;
    referred_user_name?: string;
}

export interface WithdrawalRequest {
    id: string;
    wallet_id: string;
    amount: number;
    payment_method: PaymentMethod;
    bank_name?: string;
    bank_account_number?: string;
    bank_account_name?: string;
    crypto_wallet_address?: string;
    crypto_network?: string;
    crypto_currency?: string;
    paypal_email?: string;
    status: WithdrawalStatus;
    admin_notes?: string;
    rejection_reason?: string;
    processed_at?: string;
    created_at: string;
    updated_at: string;
    user_name?: string;
    user_email?: string;
}

// --- Request DTOs ---

export interface BankDetails {
    bank_name: string;
    account_number: string;
    account_name: string;
}

export interface CryptoDetails {
    wallet_address: string;
    network?: string; // e.g., 'TRC20', 'ERC20'
    currency?: string; // e.g., 'USDT', 'BTC'
}

export interface WithdrawRequest {
    amount: number;
    payment_method: PaymentMethod;
    bank_details?: BankDetails;
    crypto_details?: CryptoDetails;
    paypal_email?: string;
}

export interface UnlockEarningRequest {
    earning_id: string;
}

// --- Wallet Service ---

export const walletService = {
    /**
     * Get wallet balance
     */
    async getBalance(): Promise<WalletBalance> {
        const response = await api.get<WalletBalance>('/wallet');
        return response.data;
    },

    /**
     * Get dashboard summary with all wallet stats
     */
    async getSummary(): Promise<WalletSummary> {
        const response = await api.get<any>('/wallet/summary');

        // Normalize the response to match our expected interface
        const data = response.data || {};
        return {
            available_balance: data.available_balance ?? data.availableBalance ?? 0,
            locked_balance: data.locked_balance ?? data.lockedBalance ?? 0,
            total_withdrawn: data.total_withdrawn ?? data.totalWithdrawn ?? 0,
            pending_withdrawals: data.pending_withdrawals ?? data.pendingWithdrawals ?? 0,
            total_earnings: data.total_earnings ?? data.totalEarnings ?? data.total_earned ?? data.totalEarned ?? 0
        };
    },

    /**
     * List all referral earnings
     */
    async getEarnings(): Promise<ReferralEarning[]> {
        const response = await api.get<ReferralEarning[]>('/wallet/earnings');
        // Handle case where response might be wrapped in an object
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
            // Try common wrapper properties
            const data = response.data as any;
            if (Array.isArray(data.earnings)) return data.earnings;
            if (Array.isArray(data.items)) return data.items;
            if (Array.isArray(data.data)) return data.data;
        }
        return Array.isArray(response.data) ? response.data : [];
    },

    /**
     * Unlock a guaranteed pass earning (after challenge is passed)
     */
    async unlockEarning(earningId: string): Promise<ReferralEarning> {
        const response = await api.post<ReferralEarning>('/wallet/earnings/unlock', {
            earning_id: earningId
        });
        return response.data;
    },

    /**
     * Request a withdrawal ($100 minimum)
     */
    async requestWithdrawal(request: WithdrawRequest): Promise<WithdrawalRequest> {
        const response = await api.post<WithdrawalRequest>('/wallet/withdraw', request);
        return response.data;
    },

    /**
     * Get withdrawal history
     */
    async getWithdrawals(): Promise<WithdrawalRequest[]> {
        const response = await api.get<WithdrawalRequest[]>('/wallet/withdrawals');
        // Handle case where response might be wrapped in an object
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
            const data = response.data as any;
            if (Array.isArray(data.withdrawals)) return data.withdrawals;
            if (Array.isArray(data.items)) return data.items;
            if (Array.isArray(data.data)) return data.data;
        }
        return Array.isArray(response.data) ? response.data : [];
    },

    /**
     * Get all withdrawals (Admin)
     */
    async getAdminWithdrawals(status?: string): Promise<WithdrawalRequest[]> {
        const response = await api.get<any>('/admin/withdrawals', {
            params: { status }
        });

        // Handle wrapped response
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
            const data = response.data;
            if (Array.isArray(data.withdrawals)) return data.withdrawals;
            if (Array.isArray(data.items)) return data.items;
            if (Array.isArray(data.data)) return data.data;
        }

        return Array.isArray(response.data) ? response.data : [];
    },

    /**
     * Approve a withdrawal request (Admin)
     */
    async approveWithdrawal(withdrawalId: string): Promise<{ message: string; batch_withdrawal_id: string; payout_id: string; status: string }> {
        const response = await api.post(`/admin/withdrawals/${withdrawalId}/approve`);
        return response.data;
    },

    /**
     * Verify a payout batch with 2FA (Admin)
     */
    async verifyPayout(batchId: string, verificationCode: string): Promise<{ message: string }> {
        const response = await api.post('/admin/withdrawals/verify', null, {
            params: {
                batch_id: batchId,
                verification_code: verificationCode
            }
        });
        return response.data;
    },

    /**
     * List NOWPayments payouts (Admin)
     */
    async getNowPaymentsPayouts(limit: number = 10, page: number = 0): Promise<any> {
        const response = await api.get('/admin/withdrawals/nowpayments', {
            params: { limit, page }
        });
        return response.data;
    },

    /**
     * Update withdrawal status (Admin)
     */
    async updateWithdrawalStatus(withdrawalId: string, data: { status: string; admin_notes?: string; rejection_reason?: string }): Promise<WithdrawalRequest> {
        const response = await api.patch<WithdrawalRequest>(`/admin/withdrawals/${withdrawalId}`, data);
        return response.data;
    }
};
