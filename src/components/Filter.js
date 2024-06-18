import React, { useState } from 'react';
import { filterProducts } from '../actions/productActions';
import { useDispatch } from 'react-redux';

export default function Filter() {

    const [searchkey, setsearchkey] = useState('')
    const [sort, setsort] = useState('popular')
    const [category, setcategory] = useState('all')
    const dispatch = useDispatch()

    return (
        <div className="filter-container">
            <div className="filter-item">
                <input 
                    value={searchkey} 
                    onChange={(e) => { setsearchkey(e.target.value) }} 
                    type='text' 
                    placeholder='Search products' 
                    className='form-control' 
                />
            </div>
            <div className="filter-item">
                <select 
                    className='form-control' 
                    value={sort} 
                    onChange={(e) => { setsort(e.target.value) }}
                >
                    <option value="popular">Popular</option>
                    <option value="htl">High to Low</option>
                    <option value="lth">Low to High</option>
                </select>
            </div>
            <div className="filter-item">
                <select 
                    className='form-control' 
                    value={category} 
                    onChange={(e) => { setcategory(e.target.value) }}
                >
                    <option value="all">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="mobiles">Mobile</option>
                    <option value="games">Games</option>
                </select>
            </div>
            <div className="filter-item">
                <button 
                    className='btn btn-dark' 
                    onClick={() => { dispatch(filterProducts(searchkey, sort, category)) }}
                >
                    FILTER
                </button>
            </div>
        </div>
    );
}
