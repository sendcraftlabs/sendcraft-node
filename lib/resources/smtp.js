"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smtp = void 0;
class Smtp {
    constructor(http) {
        this.http = http;
    }
    /**
     * Get SMTP relay credentials for your account.
     * Use the returned host/port/username + your API key as the SMTP password
     * in any nodemailer, smtplib, or PHPMailer integration.
     */
    credentials() {
        return this.http.get('/smtp/credentials');
    }
    /**
     * Get current IP warmup status for the self-hosted SMTP server.
     * Shows daily limit, emails sent today, and warmup progress.
     */
    warmupStatus() {
        return this.http.get('/smtp/warmup');
    }
}
exports.Smtp = Smtp;
