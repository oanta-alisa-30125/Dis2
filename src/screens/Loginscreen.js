import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Loginscreen() {
    const loginreducer = useSelector(state => state.loginReducer);
    const { loading, error } = loginreducer;
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const dispatch = useDispatch();

    function login(e) {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        };
        dispatch(loginUser(user));
    };

    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            window.location.href = '/';
        }
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className='col-md-5 card p-3'>
                <div>
                    <h2 className='text-center m-3'>Login</h2>

                    {error && (<Error error='Email sau parola gresite' />)}
                    {loading && (<Loader />)}

                    <form onSubmit={login}>
                        <input type="email" placeholder='email' className='form-control' value={email} required onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" placeholder='parola' className='form-control' value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                        <button type='submit' className='btn btn-dark mt-3'>Autentificare</button>
                    </form>

                    <a href="/register" className="d-block text-center mt-3">Apasă aici pentru înregistrare</a>
                </div>
            </div>
        </div>
    );
}
