import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Register.css";
import classnames from "classnames";

import {useAuthState} from "react-firebase-hooks/auth";
import {auth, registerWithEmailAndPassword, signInWithGoogle} from "../firebase/config";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [showButton, setShowButton] = useState(false);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (password === repeatPassword && password.length) {
            setShowButton(true )
        } else {
            setShowButton(false )
        }
    }, [password, repeatPassword]);


    useEffect(() => {
        if (loading) return;
        if (user) navigate("/auto");
    }, [user, loading]);


    return (
        <div className="register">
            <div className="register__container">
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Полное имя"
                />
                <input
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail адрес"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Повторите пароль"
                />

                <button className={classnames({
                    ["inactive"]: !showButton,
                    ["active"]: showButton,
                })}
                        onClick={register}
                >
                    Register
                </button>
                <button
                    className="register__btn register__google"
                    onClick={signInWithGoogle}
                >
                    Зарегистрироваться через Google
                </button>

                <div>
                    Уже есть аккаунт? <Link to="/">Войдите</Link> сейчас!
                </div>
            </div>
        </div>
    );
}

export default Register;