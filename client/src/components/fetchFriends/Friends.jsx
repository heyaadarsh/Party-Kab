import React, { useEffect, useState } from 'react'
import "./Friends.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from "moment";
import { useNavigate } from 'react-router-dom';


const Friends = () => {

    const navigate = useNavigate();

    const api = import.meta.env.VITE_APIURL;

    const [users, setUsers] = useState([]);
    const [upcomingBirthday, setUpcomingBirthday] = useState({});

    useEffect(() => {
        
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://${api}/get`);
                setUsers(response.data);
                if (response.data.length > 0) {
                    setUpcomingBirthday(response.data[0]);
                }
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (upcomingBirthday.dateOfBirth) {
            const targetDate = moment(upcomingBirthday.dateOfBirth);
            const currentDate = moment();
    
            // Check if the upcoming birthday has occurred in the current year
            const birthdayThisYear = moment(targetDate).year(currentDate.year());
            
            
            // Calculate the difference in days
            let remainingDays;
            if (birthdayThisYear.isSameOrAfter(currentDate)) {
                // If upcoming birthday is in the current year or later
                remainingDays = birthdayThisYear.diff(currentDate, 'days');
            } else {
                // If upcoming birthday is in the next year
                const birthdayNextYear = moment(targetDate).year(currentDate.year() + 1);
                remainingDays = birthdayNextYear.diff(currentDate, 'days');
            }
    
            // Update the birthday state with remaining days
            setUpcomingBirthday(prevState => ({
                ...prevState,
                remainingDays: remainingDays >= 0 ? remainingDays : 0
            }));
        }
    }, [upcomingBirthday]);

    const deleteUser = async (userID) => {
        await axios.delete(`http://${api}/delete/${userID}`)
            .then((responses) => {
                setUsers(prevUsers => prevUsers.filter((user) => user._id !== userID))
                toast.success(responses.data.msg, { position: "top-right" })
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className='navbar'>
                <img src='https://iili.io/JWE61xp.png' alt='logo'/>
            </div>
            <div className='upcoming'>
                <h4>Upcoming Birthdays:</h4>
                <h3>{upcomingBirthday.name}'s Birthday is coming in {upcomingBirthday.remainingDays} days</h3>
            </div>
            <div className='featured'>
                <div className='featured-1'>
                    <h4>Mom's Birthday in 186 Days!</h4>
                </div>
                <div className='featured-1'>
                    <h4>Dad's Birthday in 47 Days!</h4>
                </div>
                <div className='featured-1' id='ft3'>
                    <h4>Girlfriend's Birthday: Not Found!</h4>
                </div>
            </div>
            <div className='friendTable'>
                <Link to={"/add"} className='addButton'>Add a Connection</Link>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{moment(user.dateOfBirth).format('DD/MM/YYYY')}</td>
                                        <td>{user.phone}</td>
                                        <td className='actionButtons'>
                                            <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Friends;













// import React, { useEffect, useState } from 'react';
// import "./Friends.css";
// import axios from 'axios';
// import moment from "moment";

// const Friends = () => {
//     const [users, setUsers] = useState([]);
//     const [upcomingBirthday, setUpcomingBirthday] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/api/get");
//                 setUsers(response.data);
//                 if (response.data.length > 0) {
//                     setUpcomingBirthday(response.data[0]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className='friends-container'>
//             <div className='navbar'>
//                 <img src='https://iili.io/JWE61xp.png' alt='logo' />
//             </div>
//             <div className='upcoming'>
//                 <h4>Upcoming Birthday:</h4>
//                 {upcomingBirthday && (
//                     <h3>{upcomingBirthday.name}'s Birthday is coming on {moment(upcomingBirthday.dateOfBirth).format('MMMM Do')}</h3>
//                 )}
//             </div>
//             <div className='friendTable'>
//                 <table border={1} cellPadding={10} cellSpacing={0}>
//                     <thead>
//                         <tr>
//                             <th>S.No.</th>
//                             <th>Name</th>
//                             <th>Date of Birth</th>
//                             <th>Phone Number</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{user.name}</td>
//                                 <td>{moment(user.dateOfBirth).format('MMMM Do, YYYY')}</td>
//                                 <td>{user.phone}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Friends;

