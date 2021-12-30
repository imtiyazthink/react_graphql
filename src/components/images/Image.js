import React from "react";

import "./Image.css";

const image = (props) => (
  <div
    className={props.single ? "single-image" : "image"}
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? "contain" : "cover",
      backgroundPosition: props.left ? "left" : "center",
    }}
  />
);

export default image;
