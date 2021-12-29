import React from "react";
import Card from "../../components/Card/Card";
import NavBar from "../../components/Navbar/NavBar";
import "./ViewSinglePost.css";
import logo from "../../assets/images/logo-sm.png";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const ViewSinglePost = () => {
  return (
    <>
      <NavBar />
      <div className="back-button">
        <Link className="btn btn-primary" to="/home">
          <BiArrowBack /> Back
        </Link>
      </div>
      <div className="edit-button">
        <FiEdit size={30} />
        <AiOutlineDelete size={33} />
      </div>
      <div className="post-view">
        <Card className="single-post">
          <img src={logo} alt="logo" />
          <h3>First Post</h3>
          <h4>My first post is here</h4>
        </Card>
      </div>
    </>
  );
};

export default ViewSinglePost;
