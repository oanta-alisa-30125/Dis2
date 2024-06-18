import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productActions";
import Success from "../components/Success";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function Addproduct(){
  const [name,setname]=useState('')
  const [price,setprice]=useState()
  const [countinstock,setcountinstock]=useState()
  const [imageurl,setimageurl]=useState('')
  const [category,setcategory]=useState('')
  const [description,setdescription]=useState('')
  const dispatch=useDispatch()

  const addproductstate=useSelector(state=>state.addProductReducer)
  const {success, error, loading}=addproductstate
  
  const addproduct=(e)=>{
    e.preventDefault();
    const product={
        name:name,
        price:price,
        countInStock:countinstock,
        image:imageurl,
        description:description,
        category,
    }
    dispatch(addProduct(product))
  }
  
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-8">

                {success && (<Success success="Produs adaugat cu succes" />)}
                    {loading && (<Loader/>)}
                    {error && (<Error error='Eroare'/>)}
                    <h2>Adauga produs</h2>
                    <form onSubmit={addproduct}>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nume produs" required value={name} onChange={(e)=>{setname(e.target.value);}}/>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Pret" required value={price} onChange={(e)=>{setprice(e.target.value);}}/>
                        <input type="text" className="form-control mb-2 mr-ms-2" placeholder="Descriere" required value={description} onChange={(e)=>{setdescription(e.target.value);}}/>
                        <input type="text" className="form-control mb-2 mr-ms-2" placeholder="Imagine URL" required value={imageurl} onChange={(e)=>{setimageurl(e.target.value);}}/>
                        <select className="form-control mb-2 mr-ms-2" required value={category} onChange={(e) => { setcategory(e.target.value); }}>
              <option value="" disabled>Selecteaza o categorie</option>
              <option value="Tableta smart">Tableta smart</option>
              <option value="Telefon">Telefon</option>
              <option value="Electrocasnice">Electrocasnice</option>
              <option value="Casti">Casti</option>
              <option value="Articole vestimentare">Articole vestimentare</option>
            </select>
                        <input type="text" className="form-control mb-2 mr-ms-2" placeholder="Bucati in stoc" required value={countinstock} onChange={(e)=>{setcountinstock(e.target.value);}}/>
<button className="btn mt-5" type="submit" style={{float:'left'}}>Adauga Produs</button>
                    </form>

                </div>
                </div>
        </div>
    )
}