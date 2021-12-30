import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import "./Login.css";
import logo from "../../assets/images/logo-sm.png";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => validator.isEmail(value);

const Login = () => {
  const navigate = useNavigate();
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

  if (emailIsValid && passwordValid) {
    formIsValid = true;
  }

  const notify = () =>
    toast.success("Logged In Successfully...!", {
      position: "top-center",
    });

  const resetFormHandler = () => {
    resetEmail();
    resetPassword();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      toast.warn("Please fill required fields", {
        position: "top-center",
      });
      return;
    }

    try {
      const graphqlQuery = {
        query: `
          query UserLogin($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              userId
            }
          }
        `,
        variables: {
          email: emailValue,
          password: passwordValue,
        },
      };
      await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          localStorage.setItem("userId", resData.data.login.userId);
          localStorage.setItem("token", resData.data.login.token);
          notify();
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

  const emailClasses = emailHasError ? "invalid" : "";
  const passwordClasses = passwordHasError ? "invalid" : "";

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
            <form onSubmit={submitHandler}>
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
                      name="email"
                      value={emailValue}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
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
              <Button className="login-button" type="submit">
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
