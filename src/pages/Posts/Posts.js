import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./Posts.css";
import Image from "../../components/images/Image";

const Posts = (props) => {
  return (
    <Card className="card-main">
      <div className="card_image">
        <Image contain imageUrl={"http://localhost:4000/" + props.image} />
      </div>
      <Link to={`/post/${props.id}`}>
        <h5 className="card_title">Title Name</h5>
      </Link>
      <p className="card_content">
        Hello there welcome to my first blog website, I warmly welcome to my
        family, please be sitted
      </p>
    </Card>
  );
};

export default Posts;
