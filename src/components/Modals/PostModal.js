import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React from "react";

const PostModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Posts</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className="form-group">
            <label>Title</label>
            <div>
              <input
                className="form-control"
                type="text"
                data-val="true"
                data-val-required="The title field is required."
                id="title"
                name="title"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Content</label>
            <div>
              <textarea className="form-control" rows={5}></textarea>
            </div>
          </div>
          <div className="form-group">
            <label>Image</label>
            <div>
              <input
                className="form-control"
                type="file"
                data-val="true"
                data-val-required="The Image field is required."
                id="image"
                name="image"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Add Post
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PostModal;
