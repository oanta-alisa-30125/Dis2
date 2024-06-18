import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
    dispatch({ type: 'GET_PRODUCTS_REQUEST' });

    try {
        const res = await axios.get('/api/products/getallproducts');
        console.log(res);
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: res.data });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'GET_PRODUCTS_FAILED', payload: err.message });
    }
};
export const getProductById = productid => dispatch => {
    dispatch({ type: 'GET_PRODUCTBYID_REQUEST' });

    axios.post('/api/products/getproductbyid', { productid })
        .then(res => {
            console.log(res);
            dispatch({ type: 'GET_PRODUCTBYID_SUCCESS', payload: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'GET_PRODUCTBYID_FAILED', payload: err.message });
        });
};

export const filterProducts = (searchKey, sortKey, category) => dispatch => {
    var filteredproducts;

    dispatch({ type: 'GET_PRODUCTS_REQUEST' })
    axios.get('/api/products/getallproducts').then(res => {

        filteredproducts = res.data

        if (searchKey) {
            filteredproducts = res.data.filter(product => { return product.name.toLowerCase().includes(searchKey) })
        }
        if (sortKey !== 'popular') {
            if (sortKey == 'htl') {
                filteredproducts = res.data.sort((a, b) => {
                    return -a.price + b.price
                })

            } else {
                filteredproducts = res.data.sort((a, b) => {
                    return a.price - b.price
                })
            }

        }

        if (category !== 'all') {
            filteredproducts = res.data.filter(product => { return product.category.toLowerCase().includes(category) })
        }
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: filteredproducts })
    }).catch(err => {
        dispatch({ type: 'GET_PRODUCTS_FAILED' })

    })

}

export const addProductReview = (review, productid) => (dispatch, getState) => {
    dispatch({ type: 'ADD_PRODUCT_REVIEW_REQUEST' })
    const currentUser = getState().loginReducer.currentUser

    axios.post('/api/products/addreview', { review, productid, currentUser }).then(res => {
        console.log(res);
        dispatch({ type: 'ADD_PRODUCT_REVIEW_SUCCESS' })
        alert('Review trimis cu succes')
        window.location.reload()
    }).catch(err => {
        dispatch({ type: 'ADD_PRODUCT_REVIEW_FAILED' })
    })

}

export const deleteProduct = (productid) => dispatch => {
    dispatch({ type: 'DELETE_PRODUCT_REQUEST' })
    axios.post('/api/products/deleteproduct',{productid}).then(res => {
        dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: res.data })
    alert('product deleted successfully')
    window.location.reload()
    }).catch(err => {
        dispatch({ type: 'DELETE_PRODUCT_FAILED' , payload:err})
    })
}

export const addProduct=(product)=>dispatch=>{
    dispatch({type:'ADD_PRODUCT_REQUEST'})
    axios.post('/api/products/addproduct',{product}).then(res=>{
        console.log(res);
        dispatch({type:'ADD_PRODUCT_SUCCESS'})
   window.location.reload()
    }).catch(err=>{
        dispatch({type:'ADD_PRODUCT_FAILED'})
    })
}

export const updateProduct = (productid, updatedproduct) => dispatch => {
    dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
    axios.post('/api/products/updateproduct', { productid, updatedproduct })
        .then(res => {
            console.log(res.data);
            dispatch({ type: 'UPDATE_PRODUCT_SUCCESS' });
            window.location.href = '/admin/productslist';
        })
        .catch(err => {
            console.error(err);
            dispatch({ type: 'UPDATE_PRODUCT_FAILED', payload: err });
        });
};

export const toggleFavorite = (product) => (dispatch, getState) => {
    const { favorites } = getState().favoritesReducer;
    const isFavorite = favorites.some(fav => fav._id === product._id);
    
    if (isFavorite) {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product._id });
    } else {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    }

    localStorage.setItem('favorites', JSON.stringify(getState().favoritesReducer.favorites));
};