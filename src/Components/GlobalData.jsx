import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Firebase } from "./Firebase";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(Firebase);
        onAuthStateChanged(auth, (res) => {
            if (res) setUser(res);
            else setUser(null);
        })
    }, [])

    return (
        < UserDataContext.Provider value={{ user, setUser }}> {children} </ UserDataContext.Provider>
    )

}