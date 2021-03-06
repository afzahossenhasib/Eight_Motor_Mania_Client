import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import './UpdateInventory.css'

const UpdateInventory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const url = `https://lit-stream-45073.herokuapp.com/inventory/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, [id]);

  const handleDelivered = data => {
    const {quantity, ...rest} = inventory;
    if (inventory.quantity > 0) {
      const quantity1 = parseInt(inventory.quantity) - 1;
      const quantityString = quantity1.toString();
      const newQuantity = {quantity: quantityString, ...rest};
      setInventory(newQuantity);
  
      const url = `https://lit-stream-45073.herokuapp.com/inventory/${id}`
      fetch (url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newQuantity) 
    })
    .then(res => res.json())
    .then (data => {
      console.log(data);
    })
    }
  }

  const [updateQuantity, setUpdateQuantity] = useState(''); 
  const handleInput = event => {
   
      setUpdateQuantity(event.target.value) 
      console.log(setUpdateQuantity);
    
  } 

  const handleRestock = event => {
    const {quantity, ...rest} = inventory;

      const quantity1 = parseInt(inventory.quantity);
      const quantity2 = parseInt (updateQuantity);
      const newUpdateQuantity = quantity1 + quantity2;
      const quantityString = newUpdateQuantity.toString();
      const newQuantity = {quantity: quantityString, ...rest};
      setInventory(newQuantity);
  
      const url = `https://lit-stream-45073.herokuapp.com/inventory/${id}`
      fetch (url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newQuantity) 
    })
    .then(res => res.json())
    .then (data => {
      console.log(data);
    })
    
  }

  return (
    <div className="container">
        <h2 className="text-center title w-50 d-block mx-auto text-center my-4">Update Delivaerd And Stock</h2>
        <div className="left-row text-center w-50 d-block mx-auto">
                <img className="w-50 d-block mx-auto" src={inventory.img} alt="" />
                <h2 className='fw-bold'>{inventory.name}</h2>
                <p className='fs-5 fw-bold text-danger'>Price: <span className='text-muted'>${inventory.price}</span></p>
                <p className='fs-5 fw-bold text-danger'>Quantity: <span className='text-muted'>{inventory.quantity}</span> 
                {/* <button className="update-button ms-3">Stock Update</button> */}
                </p>
                <p className='fs-6 fw-bold px-2'>Details: <span className='text-muted'>{inventory.desription}</span></p>
                <p className='fs-5 fw-bold'>Supplier: <span className='text-muted'>{inventory.supplier}</span></p>
                <button onClick={handleDelivered} className='delete-button d-block fs-6 mx-auto w-50'>
                {inventory.quantity > 0 ?
                  <> delivered </> :
                  <div className='text-white'>Stock Out</div>
                    }
                </button>
                <input onBlur={handleInput} className="w-25 d-block mx-auto mt-3 border border-warning p-2 rounded" type="number" name="quantity" id="" placeholder="Add Quantity"/> <br />
                    <button onClick={handleRestock} className="update-button d-block fs-5 mx-auto w-50">Update Stock</button>
                </div>
                <div className='manage-button'>
            <Link to='/manageinventory'>Manage Inventory</Link>
            </div>
    </div>
  );
};

export default UpdateInventory;
