import React from "react";
import "./NavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BsPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
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
            <Nav.Link href="#">
              <FiLogOut size={20} onClick={logoutHandler}/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
