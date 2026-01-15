import { api } from '@/lib/api';

// Types based on backend OpenAPI schema
export interface CryptoPayment {
    id: string;
    user_id: string;
    payment_id: string | null;
    invoice_id: string | null;
    order_id: string | null;
    order_description: string | null;
    price_amount: number;
    price_currency: string;
    pay_amount: number | null;
    pay_currency: string;
    pay_address: string | null;
    payin_extra_id: string | null;
    payment_status: string;
    actually_paid: number | null;
    purchase_id: string | null;
    outcome_amount: number | null;
    outcome_currency: string | null;
    ipn_callback_url: string | null;
    invoice_url: string | null;
    is_fixed_rate: boolean;
    is_fee_paid_by_user: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateInvoiceRequest {
    price_amount: number;
    price_currency?: string;
    pay_currency?: string | null;
    order_id?: string | null;
    order_description?: string | null;
    ipn_callback_url?: string | null;
    success_url?: string | null;
    cancel_url?: string | null;
    partially_paid_url?: string | null;
    is_fixed_rate?: boolean;
    is_fee_paid_by_user?: boolean;
}

export interface CreatePaymentRequest {
    price_amount: number;
    price_currency?: string;
    pay_amount?: number | null;
    pay_currency: string;
    ipn_callback_url?: string | null;
    order_id?: string | null;
    order_description?: string | null;
    payout_address?: string | null;
    payout_currency?: string | null;
    payout_extra_id?: string | null;
    is_fixed_rate?: boolean;
    is_fee_paid_by_user?: boolean;
}

export interface Currency {
    name: string;
    logo_url?: string;
}

export interface EstimatedPrice {
    currency_from: string;
    amount_from: number;
    currency_to: string;
    estimated_amount: number;
}

export interface MinimumAmount {
    currency_from: string;
    currency_to: string;
    min_amount: number;
}

export interface PaymentStatus {
    payment_id: string;
    payment_status: string;
    pay_address: string;
    price_amount: number;
    price_currency: string;
    pay_amount: number;
    pay_currency: string;
    actually_paid: number;
    purchase_id: string;
    order_id: string;
    order_description: string;
    payin_extra_id: string | null;
    outcome_amount: number;
    outcome_currency: string;
}

export const cryptoPaymentService = {
    /**
     * Check NOWPayments API status
     */
    async getApiStatus(): Promise<{ message: string }> {
        const response = await api.get('/crypto-payments/status');
        return response.data;
    },

    /**
     * Get list of available cryptocurrencies
     */
    async getAvailableCurrencies(): Promise<{ currencies: string[] }> {
        const response = await api.get('/crypto-payments/currencies');
        return response.data;
    },

    /**
     * Get minimum payment amount for currency pair
     */
    async getMinimumAmount(
        currency_from: string,
        currency_to?: string | null,
        is_fixed_rate: boolean = false,
        is_fee_paid_by_user: boolean = false
    ): Promise<MinimumAmount> {
        const params = new URLSearchParams({
            currency_from,
            ...(currency_to && { currency_to }),
            is_fixed_rate: is_fixed_rate.toString(),
            is_fee_paid_by_user: is_fee_paid_by_user.toString(),
        });
        const response = await api.get(`/crypto-payments/min-amount?${params}`);
        return response.data;
    },

    /**
     * Get estimated price for conversion
     */
    async getEstimatedPrice(
        amount: number,
        currency_from: string,
        currency_to: string
    ): Promise<EstimatedPrice> {
        const params = new URLSearchParams({
            amount: amount.toString(),
            currency_from,
            currency_to,
        });
        const response = await api.get(`/crypto-payments/estimate?${params}`);
        return response.data;
    },

    /**
     * Create a payment invoice (redirect flow)
     * User will be redirected to NOWPayments hosted page
     */
    async createInvoice(data: CreateInvoiceRequest): Promise<CryptoPayment> {
        const response = await api.post<CryptoPayment>('/crypto-payments/invoice', data);
        return response.data;
    },

    /**
     * Create a direct payment (white-label flow)
     * Returns payment address for user to send crypto
     */
    async createPayment(data: CreatePaymentRequest): Promise<CryptoPayment> {
        const response = await api.post<CryptoPayment>('/crypto-payments/payment', data);
        return response.data;
    },

    /**
     * Get payment status from NOWPayments API
     */
    async getPaymentStatus(payment_id: string): Promise<PaymentStatus> {
        const response = await api.get(`/crypto-payments/payment/${payment_id}/status`);
        return response.data;
    },

    /**
     * Get all crypto payments for the current user
     */
    async getUserPayments(): Promise<CryptoPayment[]> {
        const response = await api.get<CryptoPayment[]>('/crypto-payments');
        return response.data;
    },

    /**
     * Get a specific crypto payment by database ID
     */
    async getPaymentById(payment_db_id: string): Promise<CryptoPayment> {
        const response = await api.get<CryptoPayment>(`/crypto-payments/${payment_db_id}`);
        return response.data;
    },
};
