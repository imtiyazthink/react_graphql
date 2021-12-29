import React from "react";
import "./Form.css";
const Form = () => {
  return (
    <form>
      <div className="wrapper">
        <input
          type="text"
          placeholder="Your User Name"
          name="user"
          className="inputText"
        />
      </div>
      <div className="wrapper">
        <input
          type="text"
          placeholder="Your Password"
          name="password"
          className="inputText"
        />
      </div>
    </form>
  );
};

export default Form;
