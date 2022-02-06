import React, { useState, useContext, useEffect } from 'react';
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

    useEffect(() => {
        if (!user) {
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "48976808-5efd-4187-ba29-b91b6909a58f",
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then(() => {
            setLoading(false);
        })
            .catch(() => {
                let formdata = new FormData();
                formdata.append("email", user.email);
                formdata.append("username", user.email);
                formdata.append("secret", user.uid);
                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append("avatar", avatar, avatar.name);
                        axios.post("https://api.chatengine.io/users/", formdata, {
                            headers: {
                                "private-key": "3ac13f96-8199-4e6d-b3bb-4d8a0a4a3ec6"
                            }
                        }).then(() => {
                            setLoading(false);
                        }).catch(error => console.log(error));

                    });

            });
    }, [user, history]);

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" })
    }

    const logOutHandler = async () => {
        await authentication.signOut();
        history.push("/");
    }

    if (!user || loading) { // while page is in loading state
        return "Loading";
    }

    return (
        <div className={styles.container}>
            <Navbar logOutHandler={logOutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="48976808-5efd-4187-ba29-b91b6909a58f"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;