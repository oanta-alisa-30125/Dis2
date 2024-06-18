import React, { Suspense } from 'react'
import { useState, useDispatch, useSelector } from 'react-redux'
import { addToCart ,deleteFromCart} from '../actions/cartActions'
import Checkout from '../components/Checkout'
export default function Cartscreen(){
    
    const cartreducerstate=useSelector(state=>state.cartReducer)
    const dispatch=useDispatch()
    const {cartItems}=cartreducerstate
    
    var subtotal=cartItems.reduce((acc,item)=>acc+(item.price*item.quantity),0)
    
    return(
        <div>
            <div className='row mt-5 justify-content-center'>
                <div className='col-md-8 text-center'>
                    <h1 className='text-center m-3'>Cosul meu</h1>
                    <table className='table table-bordered'>
                        <thead>
                        <tr>
                            <th>Denumire produs</th>
                            <th>Pret</th>
                            <th>Cantitate</th>
                            <th>Pret total</th>
                            <th>Stergere</th>
                        </tr>
                        </thead>

                        <tbody>
                            {cartItems.map(item=>{
                                return <tr>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td><select value={item.quantity} onChange={(e)=>{dispatch(addToCart(item,e.target.value))}}>
                                        {[...Array(item.countInStock).keys()].map((x,i)=>{
                                            return <option value={i+1}>{i+1}</option>
                                        })}
                                        </select></td>
                                    <td>{item.quantity*item.price}</td>
                                    <td><i className="fa fa-trash" aria-hidden="true" onClick={()=>{dispatch(deleteFromCart(item))}}></i></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <hr/>
                    <h2 className='text-center'>SubTotal:{subtotal} RON</h2>
                    <hr/>

<Checkout amount={subtotal}/>


                </div>
            </div>
        </div>
    )
}

