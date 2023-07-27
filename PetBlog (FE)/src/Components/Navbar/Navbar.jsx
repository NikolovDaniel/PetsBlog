import React from 'react';
import '../CSS/Navbar.css';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>

        <Navbar.Brand>
          <img
            height={"30"}
            src="https://mentormate.atlassian.net/s/-ia3qmx/b/9/c8bcc8e1a06db28e2046b9cbcf9bf59a/_/jira-logo-scaled.png" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto fs-3 text-center">
            <Nav.Link className='navlink'><Link to="/" className='text-decoration-none text-white'>All Pets</Link></Nav.Link>
            <Nav.Link className='navlink'><Link to="/random-pet" className='text-decoration-none text-white'>Random Pet</Link></Nav.Link>
            <NavDropdown title="Pet Panel" id="pet-panel-dropdown">
              <NavDropdown.Item className='text-center'>
                <Link to="/pet-add" className="text-decoration-none text-dark fs-5">
                  Add Pet
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className='text-center'>
                <Link to="/pet-edit" className="text-decoration-none text-dark fs-5">
                  Edit Pet
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className='text-center'>
                <Link to="/image-add" className="text-decoration-none text-dark fs-5">
                  Add Image
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className='text-center'>
                <Link to="/preferences-add" className="text-decoration-none text-dark fs-5">
                  Add Pet Preferences
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className='text-center'>
                <Link to="/download-pet-ids" className="text-decoration-none text-dark fs-5">
                  Download your Pet IDs
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;