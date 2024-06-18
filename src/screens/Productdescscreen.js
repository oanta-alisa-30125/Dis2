import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Review from '../components/Review';

export default function Productdescscreen() {
    const { id: productid } = useParams();
    const dispatch = useDispatch();
    const [quantity, setquantity] = useState(1);
    const getproductbyidstate = useSelector(state => state.getProductByIdReducer);
    const { product, loading, error } = getproductbyidstate;

    useEffect(() => {
        dispatch(getProductById(productid));
    }, [dispatch, productid]);

    const addtocart = () => {
        if (product.countInStock > 0) {
            dispatch(addToCart(product, quantity));
        }
    };

    return (
        <div className="container product-details-container">
            {loading ? (
                <Loader />
            ) : error ? (
                <Error error='Ceva nu a functionat corect' />
            ) : (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card product-details-card">
                            <h1>{product.name}</h1>
                            <img src={product.image} className="img-fluid bigimg" alt={product.name} />
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="col-md-6 product-details-info">
                        <div className="m-2">
                            <h1 className="price">Pret: {product.price}</h1>
                            <hr />
                            {product.countInStock === 0 ? (
                                <h3 style={{ color: 'red' }}>Produs indisponil</h3>
                            ) : (
                                <>
                                    <h1>Selecteaza cantitatea</h1>
                                    <select className="form-control quantity-select" value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map((x, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <hr />
                                    <button className="btn btn-dark" onClick={addtocart}>Adaugă în coș</button>
                                </>
                            )}
                        </div>
                        <hr />
                        <div className="review-section">
                            <Review product={product} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
