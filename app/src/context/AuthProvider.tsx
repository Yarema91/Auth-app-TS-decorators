import { createContext, useState } from "react";

const AuthContext = createContext({});

type Props = {
    text: string;
    children: any

}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;