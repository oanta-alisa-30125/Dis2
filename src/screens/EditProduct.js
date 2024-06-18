import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../actions/productActions';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Success from '../components/Success';
import { useParams } from 'react-router-dom';

export default function EditProduct() {
    const dispatch = useDispatch();
    const { productid } = useParams();

    const productstate = useSelector(state => state.getProductByIdReducer);
    const { product, error, loading } = productstate;
    const updateproductstate = useSelector(state => state.updateProductReducer);
    const { success, updateerror, updateloading } = updateproductstate;

    const [name, setname] = useState('');
    const [price, setprice] = useState();
    const [countinstock, setcountinstock] = useState();
    const [imageurl, setimageurl] = useState('');
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');

    useEffect(() => {
        if (product) {
            if (product._id === productid) {
                setname(product.name);
                setprice(product.price);
                setdescription(product.description);
                setimageurl(product.image);
                setcountinstock(product.countInStock);
                setcategory(product.category);
            } else {
                dispatch(getProductById(productid));
            }
        } else {
            dispatch(getProductById(productid));
        }
    }, [dispatch, product, productid]);

    function editproduct(e) {
        e.preventDefault();
        const updatedproduct = {
            name,
            price,
            description,
            countInStock: countinstock,
            category,
            image: imageurl
        };
        dispatch(updateProduct(productid, updatedproduct));
    }

    return (
        <div>
            <h2>Edit Product</h2>
            {loading && <Loader />}
            {updateloading && <Loader />}
            {updateerror && <Error error='Something went wrong' />}
            {success && <Success success='Product updated successfully' />}
            {error && <Error error='Something went wrong' />}
            {product && (
                <div>
                    
                    <form onSubmit={editproduct}>
                        <input type="text" className="form-control mb-2" placeholder="Nume" required value={name} onChange={(e) => setname(e.target.value)} />
                        <input type="number" className="form-control mb-2" placeholder="Pret" required value={price} onChange={(e) => setprice(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Descriere" required value={description} onChange={(e) => setdescription(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Imagine URL" required value={imageurl} onChange={(e) => setimageurl(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Categorie" required value={category} onChange={(e) => setcategory(e.target.value)} />
                        <input type="number" className="form-control mb-2" placeholder="Bucati in stoc" required value={countinstock} onChange={(e) => setcountinstock(e.target.value)} />
                        <button className="btn mt-5" type="submit" style={{ float: 'left' }}>Editeaza produsul!</button>
                    </form>
                </div>
            )}
        </div>
    );
}
