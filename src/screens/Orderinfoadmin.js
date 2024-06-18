import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, deliverOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Orderinfoadmin() {

    const dispatch = useDispatch();
    const orderState = useSelector(state => state.getOrderByIdReducer);
    const { order, loading, error } = orderState;
    const getOrderIDFromURL = () => {
        const url = window.location.pathname;
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const orderid = getOrderIDFromURL();

    useEffect(() => {
        console.log(`Order ID from URL: ${orderid}`);
        if (orderid) {
            dispatch(getOrderById(orderid));
        }
    }, [dispatch, orderid]);

    const handleDeliver = () => {
        dispatch(deliverOrder(orderid));
    };

    return (
        <div className="orderinfo-container">
            {error && (<Error error='something went wrong' />)}
            {loading && (<Loader />)}
            {order && (
                <div className="orderinfo-content">
                    <div className="d-flex justify-content-center align-items-start">
                        <div className="col-md-5 card m-3 order-items">
                            <h2>Produse în comandă</h2>
                            <hr />
                            {order.orderItems && order.orderItems.map(item => (
                                <div className='order-item' key={item._id}>
                                    <h4>{item.name}</h4>
                                    <p>Cantitate: <b>{item.quantity}</b></p>
                                    <p>Preț: {item.quantity} x {item.price} = {item.price * item.quantity} RON</p>
                                </div>
                            ))}
                        </div>
                        <div className='col-md-5 card m-3 order-details'>
                            <h2>Detalii despre comandă</h2>
                            <hr />
                            <p><strong>Id Comandă:</strong> {order._id}</p>
                            <p><strong>Total:</strong> {order.orderAmount} RON</p>
                            <p><strong>Data comenzii:</strong> {order.createdAt.substring(0, 10)}</p>
                            <p><strong>Id Tranzacție:</strong> {order.transactionId}</p>
                            <p><strong>Status:</strong> {order.isDelivered ? 'Comandă livrată' : 'Comandă plasată'}</p>
                            <hr />
                            <h2>Detalii despre livrare</h2>
                            {order.shippingAddress && (
                                <div className='shipping-address'>
                                    <p><strong>Adresă:</strong> {order.shippingAddress.address}</p>
                                    <p><strong>Oraș:</strong> {order.shippingAddress.city}</p>
                                    <p><strong>Țară:</strong> {order.shippingAddress.country}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-primary" onClick={handleDeliver} disabled={order.isDelivered}>
                            {order.isDelivered ? 'Comandă livrată' : 'Expediaza comanda'}
                        </button>
                    </div>
                </div>
            )}
            <hr />
        </div>
    );
}