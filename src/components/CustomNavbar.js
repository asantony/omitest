import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';


export default class CustomNavbar extends Component {
    render() {
        return (
            < Navbar bg="light" variant="light" >
                <Navbar.Brand href="#home"><img className="omilogo" src="../images/logoOMI.svg" alt="omilogo"></img> UI Test </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" variant="pills">
                        <Nav.Link href="/" >Product List</Nav.Link>
                        <Nav.Link href="unittest" >Unit Test</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}