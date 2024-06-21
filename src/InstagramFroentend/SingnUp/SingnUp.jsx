import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SingnUp.css";
import { useState } from "react";

import { toast } from "react-toastify";

function SingnUp() {
  const navigate = useNavigate();

  //  I have use toastify
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  //  I have create varebls for send from in to the database
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // It is a from valitation using Regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passReagex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  // This is function create for send data to the databse in the input field
  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email..!");
      return;
    } else if (!passReagex.test(password)) {
      notifyA(
        "Password must contain at least eight charaters , including at least 1 number and 1 includes both lower and upercase letters and special charactrs for example A,b, @,#,$,0"
      );
      return;
    }

    // sending data to server
    fetch("https://instaclone-q4xo.onrender.com/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
      }),
    })
      // it is end point create for if error is comiming  in the program then it will be show you..!
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
          // console.log(data)
        } else {
          notifyB(data.massage);
          //  I have send page to the sign in page
          navigate("/Signin");
        }

        // console.log(data)
      });
  };

  return (
    <>
      <center>
        <div className="container-fluide mainContainer1">
          <div className=" MainDIV">
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
                  Sign up to see photos and videos <br></br> from your friends
                </p>
              </div>
            </div>

            <div className="row">
              <div className="mt-2 Sections">
                <div>
                  <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <br></br>
                  <input
                    type="text"
                    value={name}
                    placeholder="Full Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                  <br></br>
                  <input
                    type="text"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    required
                  />
                  <br></br>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <br></br>
                  <br></br>

                  <div>
                    <p className="mb-3" style={{ fontFamily: "sans-serif" }}>
                      By singn up , you agree to uot Terms , <br></br>
                      Privacy policy and cookies policy
                    </p>
                  </div>

                  <button
                    value={SingnUp}
                    className="BTN"
                    onClick={() => {
                      postData();
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="LastHeadding">
            <p style={{ fontFamily: "sans-serif" }}>
              Already have an account ?
              <Link to="/Signin">
                <b>
                  <span style={{ cursor: "pointer", color: "lblue" }}>
                    {" "}
                    Sign In{" "}
                  </span>
                </b>
              </Link>
            </p>
          </div>
        </div>
      </center>
    </>
  );
}

export default SingnUp;
