import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import "./PostModal.css";

const isNotEmpty = (value) => value.trim() !== "";

const PostModal = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [postValue, setPostValue] = useState({
    title: "",
    content: "",
    imagePath: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { _id, title, content, imageUrl } = props.isEdit && props.post;

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: contentValue,
    isValid: contentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid && contentIsValid) {
    formIsValid = true;
  }

  const resetFormHandler = () => {
    resetTitle();
    resetContent();
  };

  const imageChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setPostValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!props.isEdit) {
      if (!formIsValid) {
        toast.warn("Please fill required fields", {
          position: "top-center",
        });
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      if (props.isEdit) {
        formData.append("oldPath", imageUrl);
      }
      fetch("http://localhost:4000/post-image", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((fileResData) => {
          const imagePath = fileResData.filePath || "undefined";
          let graphqlQuery = {
            query: `
          mutation CreateNewPost($title: String!, $content: String!, $imageUrl: String!) {
            createPost(postInput: {title: $title, content: $content, imageUrl: $imageUrl}) {
              _id
              title
              content
              imageUrl
            }
          }
        `,
            variables: {
              title: titleValue,
              content: contentValue,
              imageUrl: imagePath,
            },
          };

          if (props.isEdit) {
            graphqlQuery = {
              query: `
                mutation UpdateExistingPost($postId: ID!, $title: String!, $content: String!, $imageUrl: String!) {
                  updatePost(id: $postId, postInput: {title: $title, content: $content, imageUrl: $imageUrl}) {
                    _id
                    title
                    content
                    imageUrl                
                  }
                }
              `,
              variables: {
                postId: _id,
                title: postValue.title ? postValue.title : title,
                content: postValue.content ? postValue : content,
                imageUrl: postValue.imagePath ? postValue.imagePath : imageUrl,
              },
            };
          }

          return fetch("http://localhost:4000/graphql", {
            method: "POST",
            body: JSON.stringify(graphqlQuery),
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          });
        })
        .then((res) => {
          resetFormHandler();
          return res.json();
        })
        .then((data) => {
          if (data.errors) {
            throw data.errors[0].message;
          }
          if (props.isEdit) {
            navigate("/home");
            return toast.success("Post Updated Successfully...!", {
              position: "top-center",
            });
          }
          toast.success("Post Added Successfully...!", {
            position: "top-center",
          });
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-center",
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const titleClasses = titleHasError ? "invalid" : "";
  const contentClasses = contentHasError ? "invalid" : "";

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton className="modal_header">
        <Modal.Title>{props.isEdit ? "Edit Posts" : "Add Post"}</Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="form-group">
            <label>Title</label>
            <div className={titleClasses}>
              <input
                className="form-control"
                type="text"
                {...(props.isEdit
                  ? {
                      defaultValue: title,
                      onChange: onChangeHandler,
                    }
                  : {
                      value: titleValue,
                      onChange: titleChangeHandler,
                      onBlur: titleBlurHandler,
                    })}
                name="title"
              />
            </div>
            {titleClasses && (
              <p className="error_text">Please enter post title.</p>
            )}
          </div>
          <div className="form-group">
            <label>Content</label>
            <div className={contentClasses}>
              <textarea
                className="form-control"
                rows={5}
                name="content"
                {...(props.isEdit
                  ? {
                      defaultValue: content,
                      onChange: onChangeHandler,
                    }
                  : {
                      value: contentValue,
                      onChange: contentChangeHandler,
                      onBlur: contentBlurHandler,
                    })}
              ></textarea>
            </div>
            {contentClasses && (
              <p className="error_text">Please enter post content.</p>
            )}
          </div>
          <div className="form-group">
            <label>Image</label>
            <div>
              <input
                className="form-control"
                type="file"
                onChange={imageChangeHandler}
                name="image"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide} type="submit">
            {props.isEdit ? "Update Post" : "Add Post"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PostModal;
