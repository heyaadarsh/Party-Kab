import React, { useState } from 'react'
import "./AddConnection.css";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddConnections = () => {

    const api = import.meta.env.VITE_APIURL;

    const users = {
        name: "",
        dateOfBirth: "",
        phone: ""
    }
    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) =>{
        const {name, value} = e.target;
        console.log(e.target.name);
        setUser({...user, [name]:value});
    }

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post(`https://${api}/create`, user)
        .then((response)=> {
            console.log(response);
            toast.success(response.data.msg, {position: "top-right"})
            navigate("/");
        }).catch(error => console.log(error));
    }

  return (
    <div className='addConnection'>
        <Link to={"/"}>&#x2190; All Connections</Link>
        <h3>Add a Connection</h3>
        <form className='addForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Full Name</label>
                <input type='text' onChange={inputHandler} id='name' name='name' autoComplete='off' placeholder='Ex- Agyat Vishwas'/>
            </div>
            <div className='inputGroup'>
            <label htmlFor='dateOfBirth'>Date of Birth</label>
            <input type='date' id='dateOfBirth' onChange={inputHandler} name='dateOfBirth' autoComplete='off'/>
            </div>
            <div className='inputGroup'>
                <label htmlFor='phone'>Phone Number</label>
                <input type='text' onChange={inputHandler} id='phone' name='phone' autoComplete='off' placeholder='Ex- 70502....'/>
            </div>
            <div className='inputGroup'>
                <button type='submit'>Add Connection</button>
            </div>
        </form>
    </div>
  )
}

export default AddConnections
