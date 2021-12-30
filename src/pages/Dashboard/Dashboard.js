import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "../../components/Navbar/NavBar";
import "./Dashboard.css";
import PostModal from "../../components/Modals/PostModal";
import PostItems from "../Posts/PostItems";
import { BiFastForward } from "react-icons/bi";
import { AiFillBackward } from "react-icons/ai";

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);
  const pages = Math.round(posts.length / dataPerPage);

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

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = posts.slice(indexOfFirstData, indexOfLastData);

  return (
    <>
      <NavBar />
      <div className="post-button">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          + POST
        </Button>
      </div>
      {currentData.length === 0 ? (
        <div className="no_posts">
          <h1>No Posts are available</h1>
        </div>
      ) : (
        <>
          <PostItems posts={currentData} />
          <div className="pagination">
            <Button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? "disabled" : ""}`}
            >
              <AiFillBackward /> prev
            </Button>
            <Button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? "disabled" : ""}`}
            >
              next <BiFastForward />
            </Button>
          </div>
        </>
      )}

      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        isEdit={false}
      />
    </>
  );
};

export default Dashboard;
