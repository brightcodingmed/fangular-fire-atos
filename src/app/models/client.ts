export interface Client {
    id?: string;
    firstName: string;
    lastName: string;
    phone: string;
    balance: number;
    email: string;
    active?: boolean;
}
