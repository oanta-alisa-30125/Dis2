import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from "../actions/orderActions";
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Orderlist() {
    const getordersstate = useSelector(state => state.getAllOrdersReducer);
    const { loading, error, orders } = getordersstate;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error error='something went wrong' />)}

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id Comandă</th>
                        <th>Email</th>
                        <th>Id utilizator</th>
                        <th>Suma</th>
                        <th>Data</th>
                        <th>Id Tranzacție</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order._id} onClick={() => { window.location.href = `/orderinfoadmin/${order._id}` }}>
                            <td>{order._id}</td>
                            <td>{order.email}</td>
                            <td>{order.userid}</td>
                            <td>{order.orderAmount}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.transactionId}</td>
                            <td>{order.isDelivered ? (<h3>Livrat</h3>):(<h3>Plasat</h3>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
