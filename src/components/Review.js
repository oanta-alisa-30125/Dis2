import { set } from "mongoose";
import React, { useState } from "react";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview } from "../actions/productActions";
export default function Review({ product }) {

    const dispatch = useDispatch()
    const [rating, setrating] = useState(5)
    const [comment, setcomment] = useState('')

    function sendreview() {

        if(localStorage.getItem('currentUser'))
            {const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        var alreadyreviewed
        for (var i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i].userid == currentUser._id) {
                alreadyreviewed = true
            }
        }

        if (alreadyreviewed) {
            alert('Ai lasat deja un review')
        } else {
            const review = {
                rating: rating,
                comment: comment
            }
            dispatch(addProductReview(review, product._id))
        }}else{
            window.location.href='/login'
        }
        

    }
    return (
        <div>
            <h2>Parerea ta conteaza!</h2>
            <Rating
                style={{
                    color: 'orange'
                }}
                initialRating={rating}
                emptySymbol="fa fa-star fa-1x"
                fullSymbol="fa fa-star fa-1x"
                onChange={(e) => { setrating(e) }}


            />

            <input type="text" className="form-control mt-2" value={comment} onChange={(e) => { setcomment(e.target.value) }} />
            <button className="btn mt-5" onClick={sendreview}>Trimite review</button>
            {product.reviews && product.reviews.length > 0 && (
                <>
                    <h2 className="mt-3">Cele mai recente recenzii</h2>
                    {product.reviews.map(review => (
                        <div className="text-left" key={review._id}>
                            <Rating
                                style={{ color: 'orange' }}
                                initialRating={review.rating}
                                emptySymbol="fa fa-star fa-1x"
                                fullSymbol="fa fa-star fa-1x"
                                readonly
                            />
                            <p>{review.comment}</p>
                            <p>By: {review.name}</p>
                            <hr />
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}