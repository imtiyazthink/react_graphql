import React from "react";
import Posts from "./Posts";
import "./PostItems.css";

const PostItems = (props) => {
  return (
    <div className="posts-div">
      {props.posts.map((post) => (
        <Posts
          key={post.id}
          title={post.title}
          content={post.content}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default PostItems;
