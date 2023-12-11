import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useStateContext } from "../contexts/ContextProvider";


export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()


    useEffect(()=>{
        getUsers();
    }, []) 
    
    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            setNotification('User was successfully deleted')
            getUsers()
          })
      }


    const getUsers = () =>{
        setLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false)
            setUsers(data.data)
            console.log(data)
        })
        .catch(
            setLoading(false)
        )
    }
    return (
<div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn btn-add text-white bg-black d-block mx-auto">
         Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                <Link to={`/users/${u.id}`}>
                <Button  className="btn-edit bg-primary">
                  Edit
                </Button>
              </Link>
                  {/* <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link> */}
                  &nbsp;
                  <Button className="btn-delete bg-danger" onClick={ev => onDeleteClick(u)}>Delete</Button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
 
      
    </div>
    )
}