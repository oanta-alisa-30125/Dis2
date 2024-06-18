import axios from 'axios';

export const registerNewUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    try {
        await axios.post('/api/users/register', user);
        dispatch({ type: 'USER_REGISTER_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAILED',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const loginUser = (user) => dispatch => {
    dispatch({ type: 'USER_LOGIN_REQUEST' })

    axios
        .post('/api/users/login', user)
        .then(res => {
            dispatch({ type: 'USER_LOGIN_SUCCESS' })
            localStorage.setItem('currentUser', JSON.stringify(res.data))
            window.location.href = '/'
        })
        .catch(err => {
            dispatch({ type: 'USER_LOGIN_FAILED', payload: err })
            console.log(err);
        });
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
    dispatch({ type: 'USER_LOGOUT' })
    window.location.href = '/login'
}

export const updateUser = (userid, updateduser) => dispatch => {
    dispatch({ type: 'USER_UPDATE_REQUEST' })

    axios
        .post('/api/users/update', { userid, updateduser })
        .then(res => {
            dispatch({ type: 'USER_UPDATE_SUCCESS' })
            window.location.reload()
        })
        .catch(err => {
            dispatch({ type: 'USER_UPDATE_FAILED', payload: err })
            console.log(err);
        });
}

export const getAllUsers = () => dispatch => {
    dispatch({ type: 'GET_ALLUSERS_REQUEST' })
    axios.get('/api/users/getallusers').then(res => {
        dispatch({ type: 'GET_ALLUSERS_SUCCESS', payload: res.data })
    }).catch(err => {
        dispatch({ type: 'GET_ALLUSERS_FAILED' , payload:err})
    })
}

export const deleteUser = (userid) => dispatch => {
    dispatch({ type: 'DELETE_USER_REQUEST' })
    axios.post('/api/users/deleteuser',{userid}).then(res => {
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: res.data })
    alert('user deleted successfully')
    window.location.reload()
    }).catch(err => {
        dispatch({ type: 'DELETE_USER_FAILED' , payload:err})
    })
}

export const updateUserAsAdmin = (userid, isAdmin) => async (dispatch, getState) => {
    dispatch({ type: 'UPDATE_USER_AS_ADMIN_REQUEST' });
    try {
        const { currentUser } = getState().loginReducer;
        if (currentUser && currentUser.isAdmin) {
            const config = {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            };
            await axios.post('/api/users/updateUserAsAdmin', { userid, isAdmin }, config);
            dispatch({ type: 'UPDATE_USER_AS_ADMIN_SUCCESS' });
            dispatch(getAllUsers());
        } else {
            throw new Error('Access denied');
        }
    } catch (error) {
        dispatch({ type: 'UPDATE_USER_AS_ADMIN_FAILED', payload: error.message });
    }
};