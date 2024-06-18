import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersByUserId } from '../actions/orderActions'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
export default function Ordersscreen() {
    const ordersstate=useSelector(state=>state.getOrdersByUserIdReducer)
    const {orders,error,loading}=ordersstate
    
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            dispatch(getOrdersByUserId())
        } else {
            window.location.href = '/login'
        }
    }, [dispatch])

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>Comenzile mele</h2>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>
                                    Id Comandă
                                </th>
                                <th>Suma</th>
                                <th>Data</th>
                                <th>Id Tranzacție</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (<Loader/>)}
                            {orders && (orders.map(order=>{
                                return <tr onClick={()=>{window.location=`/orderinfo/${order._id}`}}>
                                    
                                    <td>{order._id}</td>
                                    <td>{order.orderAmount}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.transactionId}</td>
                                    <td>{order.isDelivered ? (<li>Livrat</li>):(<li>Plasat</li>)}</td>
                                    
                                </tr>
                            }))}
                            {error && (<Error error="something went wrong"/>)}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}