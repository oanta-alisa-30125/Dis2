import React, { useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from "../actions/orderActions";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from "../components/Success";
import { clearCart } from "../actions/cartActions"; // Importă acțiunea pentru a goli coșul

export default function Checkout({ amount }) {
    const dispatch = useDispatch();

    const orderstate = useSelector(state => state.placeOrderReducer);
    const { loading, success, error } = orderstate;

    function tokenHandler(token) {
        console.log(token);
        dispatch(placeOrder(token, amount));
    }

    function validate() {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        if (success) {
            dispatch(clearCart()); // Golește coșul
        }
    }, [success, dispatch]);

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error error='Somethng went wrong' />)}
            {success ? (
                <div>
                    <Success success='Comanda plasata cu succes' />
                    
                </div>
            ) : (
                <StripeCheckout
                    token={tokenHandler}
                    amount={amount * 100}
                    shippingAddress
                    currency='RON'
                    stripeKey='pk_test_51Kaz5vJCgqMIiSUCwsBWz9GMD1AVvjVQRjcj5xwTbVjZuZmS673ARZq8emzG1jr9iZQ3ToU7qnwydMUjjT70OPmL00SjGNtLeL'
                >
                    <button className="btn" onClick={validate}>Plateste</button>
                </StripeCheckout>
            )}
        </div>
    );
}
