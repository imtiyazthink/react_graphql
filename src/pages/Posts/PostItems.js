import React from "react";
import Posts from "./Posts";
import "./PostItems.css";

const PostItems = (props) => {
  return (
    <div className="posts-div">
      {props.posts.map((post) => (
        <Posts
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          image={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default PostItems;
