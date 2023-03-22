import { createContext, ReactNode, useContext } from 'react'
import { useState } from 'react'

type UserProps = {
    username: string;
    id: string;
    iat?: number;
    cover?: string;
    content?: string;
}

type ContextProps = {
    userInfo: UserProps | null
    setUserInfo: React.Dispatch<React.SetStateAction<UserProps | null>>
}

const UserContext = createContext<ContextProps>({ userInfo: null, setUserInfo: () => { } })

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [userInfo, setUserInfo] = useState<UserProps | null>(null)

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>)
}