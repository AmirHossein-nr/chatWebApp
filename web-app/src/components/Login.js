import React from 'react';

//Icons 
import google from "../assets/google.svg";

//Styles
import styles from "./login.module.css";

const Login = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2> Welcome to YumGram !!</h2>
                <div className={styles.button}>
                    <img src={google} alt="google" /> Sign in with google
                </div>
            </div>

        </div>
    );
};

export default Login;