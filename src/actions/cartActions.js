import axios from "axios";


export const addToCart = (product, quantity) => async (dispatch, getState) => {
    const { data } = await axios.post('/api/products/getproductbyid', { productid: product._id });

    if (data.countInStock >= quantity) {
        const cartItem = {
            name: product.name,
            _id: product._id,
            price: product.price,
            countInStock: data.countInStock,
            quantity: quantity
        };

        dispatch({ type: 'ADD_TO_CART', payload: cartItem });
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
    } else {
        alert('Produsul nu este disponibil in cantitatea solicitata');
    }
};

export const deleteFromCart=(item)=>(dispatch,getState)=>{

    dispatch({type:'DELETE_FROM_CART', payload:item})
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))

}


export const clearCart = () => dispatch => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cartItems'); // Elimină elementele din localStorage
};