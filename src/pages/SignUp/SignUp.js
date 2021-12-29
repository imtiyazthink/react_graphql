import React from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import "./SignUp.css";
import logo from "../../assets/images/logo-sm.png";
import { MdAccountCircle, MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => validator.isEmail(value);

const SignUp = () => {
  const navigate = useNavigate();
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && emailIsValid && passwordValid) {
    formIsValid = true;
  }

  const resetFormHandler = () => {
    resetName();
    resetEmail();
    resetPassword();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Please fill required fields");
      return;
    }

    try {
      const graphqlQuery = {
        query: `
          mutation CreateNewUser($email: String!, $name: String!, $password: String!) {
            createUser(userInput: {email: $email, name: $name, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: emailValue,
          name: nameValue,
          password: passwordValue,
        },
      };
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((res) => {
          resetFormHandler();
          return res.json();
        })
        .then((resData) => {
          if (resData.errors) {
            throw resData.errors[0].message;
          }
          alert("Congratulations..., Please login to continue");
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const nameClasses = nameHasError ? "invalid" : "";
  const emailClasses = emailHasError ? "invalid" : "";
  const passwordClasses = passwordHasError ? "invalid" : "";

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
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label>Full Name</label>
                <div className={nameClasses}>
                  <div className="input-group">
                    <span className="auth-form-icon">
                      <MdDriveFileRenameOutline />
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      value={nameValue}
                      onChange={nameChangeHandler}
                      onBlur={nameBlurHandler}
                      name="name"
                    />
                  </div>
                </div>
                {nameClasses && (
                  <p className="error_text">Please enter your name.</p>
                )}
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className={emailClasses}>
                  <div className="input-group">
                    <span className="auth-form-icon">
                      <AiOutlineMail />
                    </span>
                    <input
                      className="form-control"
                      type="email"
                      value={emailValue}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      name="email"
                    />
                  </div>
                </div>
                {emailHasError && (
                  <p className="error_text">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className={passwordClasses}>
                  <div className="input-group">
                    <span className="auth-form-icon">
                      <RiLockPasswordLine />
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      name="Password"
                      value={passwordValue}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                    />
                  </div>
                </div>
                {passwordClasses && (
                  <p className="error_text">Please enter a password.</p>
                )}
              </div>
              <Button className="signup-button" type="submit">
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
