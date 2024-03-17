import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Friends from './components/fetchFriends/Friends';
import AddConnections from './components/addFriend/AddConnections';
import EditFriend from './components/updateFriends/EditFriend';

function App() {
  const [count, setCount] = useState(0);

  const route = createBrowserRouter([
    {
      path:"/",
      element: <Friends/>,
    },
    {
      path:"/add",
      element: <AddConnections/>,
    },
    {
      path:"/edit/:id",
      element: <EditFriend/>,
    },
    
  ])

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
      
    </>
  )
}

export default App
