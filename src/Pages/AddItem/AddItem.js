import React from 'react';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import './AddItem.css'
import auth from '../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddItem = () => {

  const [user] = useAuthState(auth);
  console.log(user);
    const { register, handleSubmit } = useForm();
    // console.log(register);
    const onSubmit = data => {
      console.log(data)

      const url = `https://lit-stream-45073.herokuapp.com/inventory`;
      console.log(url);
      fetch (url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then (res => res.json())
      .then (result => {
        console.log(result);
      });

      axios.post('https://lit-stream-45073.herokuapp.com/myitem', data)
      .then (response => {
        const {data} = response;
        if (data.insertedId) {
          toast('New Item Added');
        }
      })
    };

    return (
        <div className='container w-100 mx-auto'>
            <h1 className='text-center title w-50 d-block mx-auto text-center my-4'>Add New Item</h1>
            <form className='d-flex flex-column add-cont' onSubmit={handleSubmit(onSubmit)}>
            
            <input className='w-50 d-block mx-auto mb-5' placeholder='Email' type="email" value={user?.email} {...register("email")}/>
            <input className='w-50 d-block mx-auto mb-5' placeholder='Product Name' {...register("name", { required: true, maxLength: 20 })} />
            <textarea className='w-50 d-block mx-auto mb-5' placeholder='Desription' type="text" {...register("desription")} />
            <input className='w-50 d-block mx-auto mb-5' placeholder='Price' type="number" {...register("price")} />

            <input className='w-50 d-block mx-auto mb-5' placeholder='Quantity' type="number" {...register("quantity")} />
            <input className='w-50 d-block mx-auto mb-5' placeholder='Supplier' type="text" {...register("supplier")} />
            <input className='w-50 d-block mx-auto mb-5' placeholder='Photo URL' type="text" {...register("img")} />
            <input className='update-button w-25 d-block mx-auto' type="submit" value="Add Item" />
    </form>
        </div>
    );
};

export default AddItem;