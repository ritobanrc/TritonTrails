export type Trail = {
    id: number;
    name: string;
    description: string;
    image: string;
};

export type User = {
    id: number;
    username: string;
    displayName: string;
    passwordHash: string;
    passwordSalt: string;
};
