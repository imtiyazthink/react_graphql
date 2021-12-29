import React, { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import NavBar from "../../components/Navbar/NavBar";
import "./ViewSinglePost.css";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import PostModal from "../../components/Modals/PostModal";
import Image from "../../components/images/Image";

const ViewSinglePost = () => {
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);

  const fecthPost = useCallback(async () => {
    try {
      const graphqlQuery = {
        query: `query FetchSinglePost($postId: ID!) {
            post(id: $postId) {
              _id
              title
              content
              imageUrl
              creator {
                name
              }
            }
          }
        `,
        variables: {
          postId: id,
        },
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
          setPost(resData.data.post);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);

  useEffect(() => {
    fecthPost();
  }, [fecthPost]);

  return (
    <>
      <NavBar />
      <div className="back-button">
        <Link className="btn btn-primary" to="/home">
          <BiArrowBack /> Back
        </Link>
      </div>
      <div className="edit-button">
        <FiEdit size={30} onClick={() => setModalShow(true)} />
        <AiOutlineDelete size={33} />
      </div>
      <div className="post-view">
        <Card className="single-post">
          <Image contain imageUrl={"http://localhost:4000/" + post.imageUrl} />
          <h3>{post.title}</h3>
          <h4>{post.content}</h4>
        </Card>
      </div>
      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        isEdit={true}
        post={post}
      />
    </>
  );
};

export default ViewSinglePost;
