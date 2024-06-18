import React from "react";
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { getAllProducts ,deleteProduct} from "../actions/productActions";
import {Link} from 'react-router-dom'
export default function Productslist(){
    
    const getallproductsstate=useSelector(state=>state.getAllProductsReducer)
 const{products,loading,error}=getallproductsstate
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllProducts())
      },[])
    return (
        <div>
           <h2>Lista produselor</h2>
           <table className="table table-bordered">
            <thead>
                <tr>
                <td>Nume</td>
                <td>Preț</td>
                <td>Produse în stoc</td>
                <td>Id</td>
                <td>Ștergere</td>
                </tr>
            </thead>
            <tbody>
            {loading && (<Loader/>)}
            {error && (<Error error='something went wrong'/>)}
            {products && (products.map(product=>{
                return <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>{product._id}</td>
                    <td>
                        <i className="fa fa-trash" style={{marginLeft:'10px'}} aria-hidden="true" onClick={()=>{dispatch(deleteProduct(product._id))}}></i>
                        <Link to={`/admin/editproduct/${product._id}`}>
    <i className="fas fa-edit"></i>
</Link>
                        </td>
                </tr>
            }))}
            </tbody>
           </table>
        </div>
    )
}