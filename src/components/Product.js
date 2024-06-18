import React from 'react'
import Rating from 'react-rating'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { toggleFavorite } from '../actions/productActions';
export default function Product({product}) {
    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.favoritesReducer);
    const isFavorite = favorites.some(fav => fav._id === product._id);

    const handleFavoriteClick = () => {
        dispatch(toggleFavorite(product));
    };

    return (
        <div className='product-card'>
            <div>
            <Link to={`/product/${product._id}`}>
                    <img src={product.image} className='img-fluid' />
                    <h1>{product.name}</h1>
                </Link>
                    <Rating
                        style={{
                            color: 'orange'
                        }}
                        initialRating={product.rating}
                        emptySymbol="fa fa-star fa-1x"
                        fullSymbol="fa fa-star fa-1x"
                        readonly={true}
                    />
                    <h1>Preț:{product.price}</h1>
               
                    {product.countInStock === 0 ? (
                    <h3 style={{ color: 'red' }}>Produs indisponbil</h3>
                ) : (
                    <h3>In stoc</h3>
                )}
                
                <button className="favorite-button" onClick={handleFavoriteClick}>
                    <i className={`fa-heart ${isFavorite ? 'fa-solid' : 'fa-regular'}`}></i>
                </button>  
            
            </div>
        </div>
    )
}