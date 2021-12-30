import React, { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import NavBar from "../../components/Navbar/NavBar";
import "./ViewSinglePost.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import PostModal from "../../components/Modals/PostModal";
import Image from "../../components/images/Image";
import { Button, Modal } from "react-bootstrap";

const ViewSinglePost = () => {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);

  const deleteModalClose = () => setDeleteModalShow(false);

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

  const deletePost = async (event) => {
    event.preventDefault();

    try {
      const graphqlQuery = {
        query: `
          mutation {
            deletePost(id: "${id}")
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
            throw new Error("Deleting the post failed!");
          }
          console.log(resData);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
        <AiOutlineDelete size={33} onClick={() => setDeleteModalShow(true)} />
      </div>
      <div className="post-view">
        <Card className="single-post">
          <div className="card-image">
            <p className="title">{post.title}</p>

            <Image
              contain
              imageUrl={"http://localhost:4000/" + post.imageUrl}
              single={true}
            />
          </div>
          <div className="card-title">
            <p className="content">{post.content}</p>
          </div>
        </Card>
      </div>
      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        isEdit={true}
        post={post}
      />

      <Modal show={deleteModalShow} onHide={deleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delet Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={deletePost}>
          <Modal.Body>Are you sure, you want to delet the post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={deleteModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteModalClose} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ViewSinglePost;
