import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from "axios";
import "../addFriend/AddConnection.css"

const EditFriend = () => {

  const {id} = useParams();
  const users = {
    name: "",
    dateOfBirth: "",
    phone: ""
}
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inpHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
      setUser(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [id])

  const submitForm = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response)=> {
        console.log(response);
        toast.success(response.data.msg, {position: "top-right"})
        navigate("/");
    }).catch(error => console.log(error));
}

  return (
    <div className='addConnection'>
        <Link to={"/"}>&#x2190; All Connections</Link>
        <h3>Update Connection</h3>
        <form className='addForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Full Name</label>
                <input type='text' value={user.name} onChange={inpHandler} id='name' name='name' autoComplete='off' placeholder='Ex- Agyat Vishwas'/>
            </div>
            <div className='inputGroup'>
            <label htmlFor='dateOfBirth'>Date of Birth</label>
            <input type='date' value={user.dateOfBirth} onChange={inpHandler} id='dateOfBirth' name='dateOfBirth' autoComplete='off'/>
            </div>
            <div className='inputGroup'>
                <label htmlFor='phone'>Phone Number</label>
                <input type='text' value={user.phone} onChange={inpHandler} id='phone' name='phone' autoComplete='off' placeholder='Ex- 70502....'/>
            </div>
            <div className='inputGroup'>
                <button type='submit'>Update Connection</button>
            </div>
        </form>
    </div>
  )
}

export default EditFriend