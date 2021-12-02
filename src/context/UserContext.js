import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [userData, setUserData] = useState()
    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

UserContext.displayName = "UserContext";

const useUserContext = () => useContext(UserContext)

export { UserContextProvider, useUserContext };
