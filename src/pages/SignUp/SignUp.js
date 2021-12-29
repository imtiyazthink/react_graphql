import React from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import "./SignUp.css";
import logo from "../../assets/images/logo-sm.png";
import { MdAccountCircle, MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="main-signup-div">
      <div className="main-signup-body">
        <Card className="main">
          <div className="auth-signup-logo-box">
            <img src={logo} height="35" alt="logo" className="auth-logo" />
          </div>
          <div className="text-center auth-logo-text">
            <h4 className="mt-0 mb-2 mt-1">Welcome</h4>
            <p className="text-muted mb-0">Sign Up to continue.</p>
          </div>
          <div className="container">
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-group">
                  <span className="auth-form-icon">
                    <MdDriveFileRenameOutline />
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    data-val="true"
                    data-val-required="The Full Name field is required."
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-group">
                  <span className="auth-form-icon">
                    <AiOutlineMail />
                  </span>
                  <input
                    size={20}
                    className="form-control"
                    type="email"
                    data-val="true"
                    data-val-required="The Email ID field is required."
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-group">
                  <span className="auth-form-icon">
                    <RiLockPasswordLine />
                  </span>
                  <input
                    className="form-control"
                    type="password"
                    data-val="true"
                    data-val-required="The Password field is required."
                    id="Password"
                    name="Password"
                  />
                </div>
              </div>
              <Button className="signup-button">
                Sign Up <MdAccountCircle />
              </Button>
            </form>
          </div>
          <div>
            Already an existing user? <br />
            <Link to="/login">Click here for login</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
