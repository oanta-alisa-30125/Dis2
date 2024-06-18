import React, { useEffect } from "react";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Userslist from './Userslist'
import Productslist from "./Productslist";
import Orderlist from "./Orderlist";
import Addproduct from "./Addproduct";
import EditProduct from "./EditProduct";
import { useSelector } from "react-redux";

export default function Adminscreen() {
    const userstate = useSelector((state) => state.loginReducer)
    const { currentUser } = userstate;

    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            window.location.href = '/';
        }
    }, [currentUser]);

    if (!currentUser || !currentUser.isAdmin) {
        return null;
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-10">
                    <ul className="admin d-flex justify-content-around">
                        <li><Link to='/admin/userslist' style={{ color: 'black' }}>Lista utilizatorilor</Link></li>
                        <li><Link to='/admin/productslist' style={{ color: 'black' }}>Lista produselor</Link></li>
                        <li><Link to='/admin/addnewproduct' style={{ color: 'black' }}>Adauga produse</Link></li>
                        <li><Link to='/admin/orderslist' style={{ color: 'black' }}>Lista comenzilor</Link></li>
                    </ul>

                    <Routes>
                        <Route path='userslist' element={<Userslist />} />
                        <Route path='productslist' element={<Productslist />} />
                        <Route path='orderslist' element={<Orderlist />} />
                        <Route path='addnewproduct' element={<Addproduct />} />
                        <Route path='/editproduct/:productid' element={<EditProduct />} />
                        <Route path="*" element={<Navigate to="userslist" />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
