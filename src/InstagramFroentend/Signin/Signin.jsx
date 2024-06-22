import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { LoginContaxt } from "../contaxt/LoginContaxt";

function Signin() {
  const { setUserLogin } = useContext(LoginContaxt);

  const navigate = useNavigate();

  //  I have use toastify
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // It is a from valitation using Regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // This is function create for send data to the databse in the input field
  // const postData = () =>{
  //   if(!emailRegex.test(email)){
  //     notifyA("Invalid email..!");
  //     return
  //   }

  //   // sending data to server
  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email..!");
      return;
    }

    // Sending data to server
    fetch("https://instaclone-q4xo.onrender.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error); // Show error notification
        } else {
          notifyB("Sign In Successfully"); // Show success notification
          // Navigate to the home page after successful sign-in
          //console.log(data)
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setUserLogin(true);
          navigate("/");
        }

        // console.log(data);
      });
  };

  return (
    <>
      <center>
        <div className="mainContainer2">
          <div className="container MainDIV2">
            <div className="row mt-3">
              <div>
                <img
                  src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png"
                  width="150px"
                  height="60px"
                />
              </div>
              <div>
                <p className="mt-3" style={{ fontFamily: "sans-serif" }}>
                  Sign in to see photos and videos <br></br> from your friends
                </p>
              </div>
            </div>

            <div className="row">
              <div className="mt-2">
                <div>
                  <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <br></br>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <br></br>
                  <br></br>

                  <button
                    className="BTN1"
                    onClick={() => {
                      postData();
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="LastHeadding2">
            <p style={{ fontFamily: "sans-serif" }}>
              Don't have an account ?
              <Link to="/SingnUp">
                <b>
                  <span style={{ cursor: "pointer", color: "lblue" }}>
                    {" "}
                    Sign Up{" "}
                  </span>
                </b>
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <p style={{color:'white'}}>@ 2024 | Designed By Sudhanshu Gaikwad</p>
          </div>
        </div>
      </center>
    </>
  );
}

export default Signin;
