import React, { useState, useContext } from 'react';
import styles from "./Chats.module.css";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import { authentication } from "../firebase";

//Context
import { AuthContext } from "../context/AuthContextProvider";

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);

    const history = useHistory();

    const logOutHandler = async () => {
        await authentication.signOut();
        history.push("/");
    }

    return (
        <div className={styles.container}>
            <Navbar logOutHandler={logOutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="48976808-5efd-4187-ba29-b91b6909a58f"
                username="."
                userSecret="."
            />
        </div>
    );
};

export default Chats;