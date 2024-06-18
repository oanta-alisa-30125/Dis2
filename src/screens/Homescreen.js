import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Filter from '../components/Filter';
import Product from '../components/Product';
import { useLocation } from 'react-router-dom';

export default function Homescreen() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const [filteredProducts, setFilteredProducts] = useState([]);

    const getallproductsstate = useSelector(state => state.getAllProductsReducer);
    const { loading, products, error } = getallproductsstate;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products) {
            let filtered = products;
            if (searchTerm) {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            if (category) {
                filtered = filtered.filter(product => 
                    product.category.toLowerCase() === category.toLowerCase()
                );
            }
            setFilteredProducts(filtered);
        }
    }, [products, searchTerm, category]);

    return (
        <div className="container">
            <Filter />
            <div className='row justify-content-center products-container'>
                {loading ? <Loader /> : error ? <Error error='Ceva nu a mers bine' /> : 
                (filteredProducts.map(product => (
                    <div className='col-md-3 m-2 p-2' key={product._id}>
                        <Product product={product}  />
                    </div>
                )))}
            </div>
        </div>
    );
}