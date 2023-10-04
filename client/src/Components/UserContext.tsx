import { ReactNode, createContext, useState } from "react";

interface UserData {
    id: string|null,
    email: string|null
}

interface UserContext {
    user: UserData|null,
    setUser: (user: UserData) => void |null
}

interface UserContextProviderProps {
    children: ReactNode

}
export const UserContext = createContext<UserContext|null>(null);

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<UserData|null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
