export type CreateUserParams = {
    name: string;
    email: string;
    password: string;
}

export type User = {
    _id: string;
    name: string;
    email: string;
}

export type LoginParams = {
    email: string;
    password: string;
}
