// components/Registerscreen.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

export default function Registerscreen() {
    const registerstate = useSelector(state => state.registerNewUserReducer);
    const { loading, error, success } = registerstate;
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const dispatch = useDispatch();

    function register(e) {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password
        };
        if (password === cpassword) {
            dispatch(registerNewUser(user));
        } else {
            alert('Parolele nu se potrivesc');
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className='col-md-5 card p-3'>
                <div>
                    <h2 className='text-center m-3'>Pagina de inregistrare</h2>

                    {loading && (<Loader />)}
                    {error && (<Error error={error} />)}
                    {success && (<Success success="Inregistrare cu succes" />)}
                    <form onSubmit={register}>
                        <input type="text" placeholder='nume' className='form-control' value={name} required onChange={(e) => { setname(e.target.value) }} />
                        <input type="email" placeholder='email' className='form-control' value={email} required onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" placeholder='parola' className='form-control' value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="password" placeholder='confirmă parola' className='form-control' value={cpassword} required onChange={(e) => { setcpassword(e.target.value) }} />
                        <button type='submit' className='btn btn-dark mt-3'>Inregistrare!</button>
                    </form>
                    <a href="/login" className="d-block text-center mt-3">Apasa aici pentru autentificare</a>
                </div>
            </div>
        </div>
    );
}
