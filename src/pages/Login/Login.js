import React from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import "./Login.css";
import logo from "../../assets/images/logo-sm.png";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="main-login-div">
      <div className="main-login-body">
        <Card className="login-main">
          <div className="auth-login-logo-box">
            <img src={logo} height="35" alt="logo" className="auth-logo" />
          </div>
          <div className="text-center auth-logo-text">
            <h4 className="mt-0 mb-2 mt-1">Let's Get Started</h4>
            <p className="text-muted mb-0">Sign in to continue.</p>
          </div>
          <div className="container">
            <form>
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
              <Button className="login-button">
                Login <BiLogIn />
              </Button>
            </form>
          </div>
          <div>
            Not an existing user?
            <br />
            <Link to="/signup">Create a new account.</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
