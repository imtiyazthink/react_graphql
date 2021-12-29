import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "../../components/Navbar/NavBar";
import "./Dashboard.css";
import PostModal from "../../components/Modals/PostModal";
import PostItems from "../Posts/PostItems";
import logo from "../../assets/images/logo-sm.png";

const posts = [
  {
    title: "First Post",
    content: "My first post is here",
    image: logo,
  },
  {
    title: "Second Post",
    content: "My second post is here",
    image: logo,
  },
  {
    title: "Third Post",
    content: "My third post is here",
    image: logo,
  },
  {
    title: "Third Post",
    content: "My third post is here",
    image: logo,
  },
  {
    title: "Third Post",
    content: "My third post is here",
    image: logo,
  },
  {
    title: "Third Post",
    content: "My third post is here",
    image: logo,
  },
  {
    title: "Third Post",
    content: "My third post is here",
    image: logo,
  },
  {
    title: "Third Post",
    content: "My third post is here",
    image: logo,
  },
];
const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <NavBar />
      <div className="post-button">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          + POST
        </Button>
      </div>
      <PostItems posts={posts} />
      <PostModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Dashboard;
