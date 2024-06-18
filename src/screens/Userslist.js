import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserAsAdmin } from '../actions/userActions';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Userslist() {

    const getallusersstate = useSelector(state => state.getAllUsersReducer)
    const { users, loading, error } = getallusersstate
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const handleAdminToggle = (user) => {
        dispatch(updateUserAsAdmin(user._id, !user.isAdmin));
    };

    return (
        <div>
            <h2>Lista utilizatorilor</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <td>Id Utilizator</td>
                        <td>Nume</td>
                        <td>Email</td>
                        <td>Admin</td>
                        <td>Șterge</td>
                    </tr>
                </thead>

                <tbody>
                    {loading && (<Loader />)}
                    {error && (<Error error='something went wrong' />)}
                    {users && (users.map(user => {
                        return <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={user.isAdmin} 
                                    onChange={() => handleAdminToggle(user)} 
                                />
                            </td>
                            <td><i className="fa fa-trash" aria-hidden="true" onClick={() => { dispatch(deleteUser(user._id)) }}></i></td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}
