export interface Document {
    id?: number;
    regNumber: string;
    regDate: Date;
    outgoingNumber?: string;
    outgoingDate?: Date;
    deliveryMethod: string;
    correspondent: string;
    subject: string;
    description?: string;
    executionDate?: Date;
    access: boolean;
    control: boolean;
    fileUrl?: string;
}