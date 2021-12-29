import React from "react";
import "./NavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BsPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Blog Board</Navbar.Brand>
          <Nav className="me-auto">
            <div className="right-content">
              <Nav.Link href="/profile">
                <BsPersonFill size={20} />
              </Nav.Link>
            </div>
            <Nav.Link href="/logout">
              <FiLogOut size={20} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
