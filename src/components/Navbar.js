import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    const cartReducer = useSelector(state => state.cartReducer);
    const { cartItems } = cartReducer;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Online Shop</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {currentUser ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    <i className="fa-solid fa-user"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/profile">Actualizare informatii cont</Dropdown.Item>
                                    <Dropdown.Item href="/orders">Comenzile mele</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Deconectare</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    {currentUser && currentUser.isAdmin && (
                            <li className="nav-item">
                                <a className="nav-link" href="/admin"><i className="fa-solid fa-user-cog"></i></a>
                            </li>
                        )}
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                {cartItems.length}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/favorites">
                                <i className="fa-solid fa-heart"></i> 
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
