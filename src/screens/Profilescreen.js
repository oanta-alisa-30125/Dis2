import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { updateUser } from "../actions/userActions";

export default function Profilescreen() {
    const loginstate = useSelector(state => state.loginReducer)
    
    const updateuserstate=useSelector((state)=>state.updateUserReducer)
    const currentUser = loginstate.currentUser
    const {loading,success,error}=updateuserstate
    
    const dispatch = useDispatch()
    const [name, setname] = useState(currentUser.name)
    const [email, setemail] = useState(currentUser.email)
    const [password, setpassword] = useState()
    const [cpassword, setcpassword] = useState()

    function update(e) {
        e.preventDefault()
        if (password == cpassword) {
            const updateduser = {
                name: name,
                email: email,
                password: password
            }
            dispatch(updateUser(currentUser._id, updateduser))
        } else {
            alert('Parolele nu se potrivesc')
        }

    }

    return (
        <div className="profile-screen">
            <div className='col-md-5 profile-card'>
                <div>
                    <h2 className='text-center m-3'>Update</h2>

                    {loading && (<Loader />)}
                    {error && (<Error error='Email already exist' />)}
                    {success && (<Success success="Inregistrare cu success" />)}
                    <form onSubmit={update}>
                        <input type="text" placeholder='nume' className='form-control' value={name} required onChange={(e) => { setname(e.target.value) }} />
                        <input type="text" placeholder='email' className='form-control' value={email} required onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" placeholder='parolă' className='form-control' value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="password" placeholder='confirmă parola' className='form-control' value={cpassword} required onChange={(e) => { setcpassword(e.target.value) }} />
                        <button type='submit' className='btn mt-3'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
