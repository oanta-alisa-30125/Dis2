import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Product from '../components/Product';
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function OpenScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getallproductsstate = useSelector(state => state.getAllProductsReducer);
    const { loading, products, error } = getallproductsstate;

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const recommendedProducts = products
        ? products.sort((a, b) => b.rating - a.rating).slice(0, 3)
        : [];

    const phoneProducts = products
        ? products.filter(product => product.category.toLowerCase() === 'telefon')
        : [];

    const cheapestProducts = products
        ? products.sort((a, b) => a.price - b.price).slice(0, 3)
        : [];

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/homescreen?search=${searchTerm}`);
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/homescreen?category=${category}`);
    };

    return (
        <div>
            <div className="container">
                <header className="header">
                    <div className="logo">Ce cauti azi?</div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                    />
                </header>

                <section id="recommended-products">
                    <h2>Produse recomandate</h2>
                    <div className="row justify-content-center products-container">
                        {loading && <Loader />}
                        {error && <Error error='eroare' />}
                        {recommendedProducts.map(product => (
                            <div className="col-md-3 m-2 p-2" key={product._id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </section>
                <hr />
                <section id="phone-products">
                    <h2>Telefoane</h2>
                    <div className="row justify-content-center products-container">
                        {loading && <Loader />}
                        {error && <Error error='eroare' />}
                        {phoneProducts.map(product => (
                            <div className="col-md-3 m-2 p-2" key={product._id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section id="cheapest-products">
                    <h2>Produse cu cel mai mic preț</h2>
                    <div className="row justify-content-center products-container">
                        {loading && <Loader />}
                        {error && <Error error='eroare' />}
                        {cheapestProducts.map(product => (
                            <div className="col-md-3 m-2 p-2" key={product._id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </section>



            </div>

            <footer className="footer mt-5">
                <div className="row no-gutters">
                    <div className="col-md-5">
                        <h5>Despre Online Shop</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about-us">Despre noi</Link></li>
                            <li><Link to="/return-policy">Politica de Retur</Link></li>

                        </ul>
                    </div>
                    <div className="col-md-7">
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li>Telefon: 00000</li>
                            <li>Email: alisaoanta@yahoo.com</li>
                        </ul>
                    </div>

                </div>
            </footer>
        </div>
    );
}
