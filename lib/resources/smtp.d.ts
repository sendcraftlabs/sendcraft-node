import { HttpClient } from '../client';
export interface SmtpCredentials {
    host: string;
    port: number;
    encryption: string;
    username: string;
    passwordHint: string;
    instructions: {
        note: string;
        apiKeyLocation: string;
    };
}
export interface SmtpWarmupStatus {
    warmupDay: number;
    dailyLimit: number | null;
    todayCount: number;
    remainingToday: number | null;
    isWarmedUp: boolean;
    percentComplete: number;
    warmupStartDate: string;
    totalSent: number;
}
export declare class Smtp {
    private http;
    constructor(http: HttpClient);
    /**
     * Get SMTP relay credentials for your account.
     * Use the returned host/port/username + your API key as the SMTP password
     * in any nodemailer, smtplib, or PHPMailer integration.
     */
    credentials(): Promise<{
        success: boolean;
        smtp: SmtpCredentials;
        examples: Record<string, string>;
    }>;
    /**
     * Get current IP warmup status for the self-hosted SMTP server.
     * Shows daily limit, emails sent today, and warmup progress.
     */
    warmupStatus(): Promise<{
        success: boolean;
        warmup: SmtpWarmupStatus;
    }>;
}
