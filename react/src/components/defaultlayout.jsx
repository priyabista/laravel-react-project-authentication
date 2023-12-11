import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function DefaultLayout(){
    const {user, token, setUser, setToken, notification} = useStateContext()
    if(!token){
        return <Navigate to="/login" />
    }


    const onLogout = (e) =>{
        e.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }


    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])
    return (
        <div id="defaultLayout">

<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/dashboard">User Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login"> {user.name}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={onLogout} >
              Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            
            <div className="content">
                {/* <header>
                   
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="mx-2 btn-logout btn btn-danger">Logout</a>
                    </div>
                </header> */}
                <main>
                    <Outlet />
                </main>
            </div>
            {/* {notification &&
            <div className="notification">
                {notification}
            </div>
            }    */}
        </div>
    )
}