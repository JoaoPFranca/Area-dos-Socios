
export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}


export enum UserRole {
    ADMIN = 'admin',
    DEV = 'dev',
    USER = 'user'
}