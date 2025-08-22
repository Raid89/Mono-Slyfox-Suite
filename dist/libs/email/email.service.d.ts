export declare class EmailService {
    private resend;
    sendConfirmation(to: string, token: string): Promise<void>;
}
