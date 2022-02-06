import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authentication } from "../firebase";

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const history = useHistory();

    useEffect(() => {
        authentication.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
            if (user) history.push("/chats");
        });
    }, [user, history]);

    return (
        <div>
            <AuthContext.Provider value={user}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContextProvider;