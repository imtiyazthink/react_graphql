import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "../../components/Navbar/NavBar";
import "./Dashboard.css";
import PostModal from "../../components/Modals/PostModal";
import PostItems from "../Posts/PostItems";
import logo from "../../assets/images/logo-sm.png";

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);

  const fecthPosts = useCallback(async () => {
    try {
      const graphqlQuery = {
        query: `
          query FetchPosts($page: Int) {
            posts(page: $page) {
              posts {
                _id
                title
                content
                imageUrl
                creator {
                  name
                }
              }
              totalPosts
            }
          }
        `,
        variables: {
          page: 5,
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
          setPosts(resData.data.posts.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fecthPosts();
  }, [fecthPosts]);

  return (
    <>
      <NavBar />
      <div className="post-button">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          + POST
        </Button>
      </div>
      <PostItems posts={posts} />
      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        isEdit={false}
      />
    </>
  );
};

export default Dashboard;
