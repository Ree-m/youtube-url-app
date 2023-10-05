import {useState, Dispatch, SetStateAction, createContext,ReactNode } from "react";

export type User ={
    email:string,
    id:string

}

export interface UserContextInterface{
    user:User,
    setUser:Dispatch<SetStateAction<User>>
}

const initalState={
    user:{
        email:"",
        id:""
    },
    setUser:()=>{}
} as UserContextInterface

export const UserContext =createContext(initalState)

type UserProviderProps={
    children:ReactNode
}


export default function UserProvider({children}:UserProviderProps){
    const [user,setUser]=useState<User>({
        email:"",
        id:""
    })
    return(
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
    )
}