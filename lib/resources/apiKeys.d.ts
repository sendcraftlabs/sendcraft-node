import { HttpClient } from '../client';
export type ApiKeyPermission = 'full_access' | 'sending_access';
export interface ApiKey {
    id: string;
    name: string;
    maskedKey: string;
    prefix: string;
    isActive: boolean;
    permissions: ApiKeyPermission;
    /** If set, the from address must use one of these domains */
    allowedDomains: string[];
    createdAt: string;
    lastUsedAt?: string;
    revokedAt?: string;
    totalRequests: number;
}
export interface CreatedApiKey extends ApiKey {
    /** Full key — shown ONCE on creation, never retrievable again. Store it securely. */
    key: string;
}
export declare class ApiKeys {
    private http;
    constructor(http: HttpClient);
    /** List all API keys for the authenticated account */
    list(): Promise<{
        success: boolean;
        keys: ApiKey[];
        total: number;
        limit: number;
        canCreateMore: boolean;
    }>;
    /**
     * Create a new API key.
     * The full key is returned **once** in the response — store it immediately.
     */
    create(name: string, options?: {
        permissions?: ApiKeyPermission;
        allowedDomains?: string[];
    }): Promise<{
        success: boolean;
        message: string;
        apiKey: CreatedApiKey;
        warning: string;
        activeKeysCount: number;
        remainingSlots: number;
    }>;
    /** Rename an existing API key */
    rename(keyId: string, name: string): Promise<{
        success: boolean;
        message: string;
        key: Pick<ApiKey, 'id' | 'name' | 'maskedKey'>;
    }>;
    /** Revoke an API key — permanently disables it */
    revoke(keyId: string, reason?: string): Promise<{
        success: boolean;
        message: string;
        key: Pick<ApiKey, 'id' | 'name' | 'maskedKey' | 'revokedAt'> & {
            revokedReason?: string;
        };
    }>;
}
