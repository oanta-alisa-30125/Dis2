import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

export default function FavoritesScreen() {
    const { favorites } = useSelector(state => state.favoritesReducer);

    return (
        <div className="container">
            <h2 className="mt-4" >Produse favorite</h2>
            <div className="row">
                {favorites.length === 0 ? (
                    <p>Încă nu există produse favorite</p>
                ) : (
                    favorites.map(product => (
                        <div className='col-md-3 m-2 p-2' key={product._id}>
                            <Product product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}