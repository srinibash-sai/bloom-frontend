import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginComp } from "../components/LoginComp";
import { Register } from "../components/RegisterComp";

export const LoginPage = (props) => {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('jwtToken');
            const cookie = 'token=value;';
            const instance = axios.create({
                baseURL: 'http://127.0.0.1:8000/api',
                headers: {
                    'Cookies': cookie,
                },
            });
            instance.get('/user')
                .then(result => {
                    navigate('/home')
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        };

        if (localStorage.getItem('jwtToken') != null) {
            validateToken();
        }

    }, []);

    return (
        <div className="App">
            {
                currentForm === "login" ? <LoginComp onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
        </div>
    )
}