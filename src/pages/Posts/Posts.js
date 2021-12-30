import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./Posts.css";
import Image from "../../components/images/Image";
import Button from "../../components/Button/Button";

const Posts = (props) => {
  return (
    <Card className="card-main">
      <div className="card_image">
        <Image contain imageUrl={"http://localhost:4000/" + props.image} />
      </div>

      <h5 className="card_title">{props.title}</h5>

      <p className="card_content">{props.content}</p>
      <Link to={`/post/${props.id}`}>
        <Button className="more_content">Read More</Button>
      </Link>
    </Card>
  );
};

export default Posts;
