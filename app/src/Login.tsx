/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";

import Lottie from "lottie-react";
import Animation from "./23640-sign-in-or-sign-up-animation.json";

import axios from './api/axios';
const LOGIN_URL = '/auth';

// interface Login {
//     err: string,
//     Error: string

// }

const Login = () => {
    const { setAuth } = useContext(AuthContext) as any;
    const userRef = useRef() as any;
    const errRef = useRef() as any;

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [isActive, setActive] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const showHidePassword = (e: any) => {
        e.preventDefault();
        setActive(!isActive);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err: any) {
            if (!(err?.response instanceof Error)) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section className="frame row">
                    <Lottie
                        className='animation col-6'
                        loop={true}
                        animationData={Animation} />
                    <div className='login col-6'>
                        <p ref={errRef as any} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Sign In</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            <label className="laber" htmlFor="username">
                                Username:</label>
                            <div className='inputWithIcon'>
                                <input
                                    className='input'
                                    type="text"
                                    id="username"
                                    ref={userRef as any}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                /><span className="bi bi-person-fill"></span>
                            </div>
                            <label className="laber" htmlFor="password">
                                Password:</label>
                            <div className='inputWithIcon'>
                                <input
                                    className='input'
                                    type={isActive ? "text" : "password"}
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                /><i className="bi bi-lock-fill"></i>
                                <a href="#" className="password-control" onClick={showHidePassword}>
                                    <i
                                        className={isActive ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}>
                                    </i>
                                </a>
                            </div>
                            <button className='button'>Sign In</button>
                        </form>
                        <p className="sign-up">
                            Need an Account?<br />
                            <span className="line">
                                {/*put router link here*/}
                                <a href="#">Sign Up</a>
                            </span>
                        </p>
                    </div>
                </section>
            )}
        </>
    )
}

export default Login