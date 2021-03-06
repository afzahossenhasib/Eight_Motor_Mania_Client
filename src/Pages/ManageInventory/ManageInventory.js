import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInventory from '../../hooks/useInventory';
import './ManageInventory.css'

const ManageInventory = () => {
    const [inventory, setInventory] = useInventory ();
    const navigate = useNavigate();
        const handleInventory = id => {
            navigate (`/inventory/${id}`)
        }
    
        const handleDelete = id => {
            const procced = window.confirm('Are You Sure?')

            if (procced) {
                const url = `https://lit-stream-45073.herokuapp.com/inventory/${id}`;
                fetch (url, {
                    method: 'DELETE'
                })
                .then (res => res.json())
                .then (data => {
                    console.log(data);
                    const remaining = inventory.filter(manage => manage._id !== id);
                    setInventory (remaining);
                })
            }
        };

    return (
        <div className='container'>
            <h1 className='title w-50 d-block mx-auto text-center mt-5'>Manage Inventory</h1>
            <div className='inventory-section'>
            {
                inventory.map(manage => {
                    const {name, price, img, desription, supplier, quantity, _id} = manage
                    return (
                        <div key={manage._id} className='inventory-item text-center'>
                            <img className="w-75 d-block mx-auto" src={img} alt="" />
                            <h2 className='fw-bold'>{name}</h2>
                            <p className='fs-5 fw-bold text-danger'>Price: <span className='text-muted'>${price}</span></p>
                            <p className='fs-5 fw-bold text-danger'>Quantity: <span className='text-muted'>{quantity}</span></p>
                            <p className='fs-6 fw-bold px-2'>Details: <span className='fs-6 text-muted'>{desription}</span></p>
                            <p className='fs-5 fw-bold'>Supplier: <span className='text-muted'>{supplier}</span></p>
                            <div className='ps-5'>
                            <button className='update-button me-3' onClick={()=> handleInventory(_id)}>Update</button>

                            <button
                            onClick={() => handleDelete(manage._id)} 
                            className='delete-button'>
                                Delete
                            </button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
                <div className='manage-button'>
                    <Link to='/additem'>Add New Item</Link>
                </div>
        </div>
    );
};

export default ManageInventory;