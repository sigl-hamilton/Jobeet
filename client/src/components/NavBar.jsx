import React, { Component } from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom';
import Logo from './Logo';
import Links from './Links';
import api from '../api';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";


class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentUser = this.props.currentUser;

        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom: "10px"}}>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Links currentUser={currentUser}/>
                        {
                            currentUser ?
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            : null
                        }
                    </Nav>
                    {
                        currentUser ?
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                            <Link>{currentUser.firstname}</Link>
                        </Form>
                        : null
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar
