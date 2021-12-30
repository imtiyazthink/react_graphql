import React, { useCallback, useEffect, useState } from "react";
import "./NavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const fecthUser = useCallback(async () => {
    try {
      const graphqlQuery = {
        query: `
        {
          user {
            name
            email
          }
        }
          `,
      };
      await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          if (resData.errors) {
            throw new Error("Fetching posts failed!");
          }
          setUser(resData.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fecthUser();
  }, [fecthUser]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Blog Board</Navbar.Brand>
          <Navbar.Brand>{`Welcome ${user && user.name}!`}</Navbar.Brand>
          <Nav className="me-auto">
            <div className="right-content">
              <Navbar.Brand>{user && user.email}</Navbar.Brand>
              <Nav.Link>
                <AiOutlineMail size={20} />
              </Nav.Link>
            </div>
            <Nav.Link href="#">
              <FiLogOut size={20} onClick={logoutHandler} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
