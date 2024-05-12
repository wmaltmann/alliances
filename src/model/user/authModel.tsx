
export interface Auth {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export interface User {
    id: string;
}