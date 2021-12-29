import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./Posts.css";

const Posts = (props) => {
  return (
    <Card className="card-main">
      <img src={props.image} alt="logo" />
      <Link to="/post:1">
        <h3>{props.title}</h3>
      </Link>
      <h4>{props.content}</h4>
    </Card>
  );
};

export default Posts;
