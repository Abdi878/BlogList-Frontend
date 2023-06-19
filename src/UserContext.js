import { createContext, useReducer } from "react";

const UserContext = createContext()

const userReducer = (state,action) =>{
    switch (action.type) {
        case "username":
            const username = action.payload
            return {...state,username}
        case "password":
            const password = action.payload
            return {...state,password}
        case "name":
            const name = action.payload
            return {...state,name}
        case "token":
            const token = action.payload
            return {...state,token}
        case "null":
            return null
        default:
            return state
    }
}
export const UserProvider = ({children})=>{
    const [user,userDispatch] = useReducer(userReducer,{})
    return(<UserContext.Provider value={{user,userDispatch}}>
        {children}
    </UserContext.Provider>)
}
export default UserContext