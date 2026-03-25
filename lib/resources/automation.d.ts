import { HttpClient } from '../client';
export interface AutomationStep {
    type: 'send_email' | 'wait' | 'add_tag' | 'remove_tag' | 'condition';
    config: Record<string, unknown>;
}
export interface AutomationTrigger {
    type: 'subscriber.added' | 'email.opened' | 'email.clicked' | 'tag.added' | 'manual';
    filters?: Record<string, unknown>;
}
export interface Automation {
    _id: string;
    name: string;
    status: 'draft' | 'active' | 'paused' | 'archived';
    trigger: AutomationTrigger;
    steps: AutomationStep[];
    enrolledCount: number;
    completedCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAutomationParams {
    name: string;
    trigger: AutomationTrigger;
    steps: AutomationStep[];
}
export interface AutomationEnrollment {
    _id: string;
    subscriberId: string;
    automationId: string;
    status: 'active' | 'completed' | 'cancelled' | 'failed';
    currentStepId?: string;
    nextActionAt?: string;
    createdAt: string;
}
export declare class Automation {
    private http;
    constructor(http: HttpClient);
    /** List all automations */
    list(): Promise<{
        success: boolean;
        automations: Automation[];
    }>;
    /** Get an automation by ID */
    get(id: string): Promise<{
        success: boolean;
        automation: Automation;
    }>;
    /** Create a new automation */
    create(params: CreateAutomationParams): Promise<{
        success: boolean;
        automation: Automation;
    }>;
    /** Update an automation */
    update(id: string, params: Partial<CreateAutomationParams>): Promise<{
        success: boolean;
        automation: Automation;
    }>;
    /** Delete an automation */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /** Activate an automation */
    activate(id: string): Promise<{
        success: boolean;
        automation: Automation;
    }>;
    /** Pause an automation */
    pause(id: string): Promise<{
        success: boolean;
        automation: Automation;
    }>;
    /** Get enrollments for an automation */
    enrollments(id: string, params?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<{
        success: boolean;
        enrollments: AutomationEnrollment[];
        total: number;
    }>;
    /** Manually enroll a subscriber into an automation */
    enroll(id: string, subscriberId: string): Promise<{
        success: boolean;
        enrollment: AutomationEnrollment;
    }>;
}
