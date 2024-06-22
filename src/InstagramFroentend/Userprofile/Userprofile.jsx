import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Userprofile.css";

function Userprofile() {
  const { userId } = useParams();

  const [user, setUser] = useState("");
  const [posts, setPots] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        auhorization: "Bearer" + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPots(result.post);
      });
  }, []);

  return (
    <>
      <div className="container-fluide ">
        <div className="row mt-3 LeftBar2">
          <div className="LeftBar3">
            {/* <div>
                <img src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png" width="130px" height="40px"/>
              </div> */}

            <div className="mt-3">
              <span class="material-symbols-outlined">home</span> <br />
              <span style={{ fontFamily: "sans-serif" }}>Home</span>
            </div>
            <div className="mt-3">
              <span class="material-symbols-outlined">search</span> <br />{" "}
              <span style={{ fontFamily: "sans-serif" }}>Search</span>
            </div>
            <div className="mt-3">
              <span class="material-symbols-outlined">explore</span> <br />
              <span style={{ fontFamily: "sans-serif" }}>Explore</span>
            </div>
            <div className="mt-3">
              <span class="material-symbols-outlined">movie</span>
              <br />
              <span style={{ fontFamily: "sans-serif" }}>Reeal</span>
            </div>
            <div className="mt-3">
              <span class="material-symbols-outlined">chat</span>
              <br />
              <span style={{ fontFamily: "sans-serif" }}>Massage</span>
            </div>
            <div className="mt-3">
              <span class="material-symbols-outlined">favorite</span>
              <br />
              <span style={{ fontFamily: "sans-serif" }}>Like</span>
            </div>
            <div className="mt-3">
              <span
                style={{ color: "royalblue" }}
                class="material-symbols-outlined"
              >
                add_circle
              </span>
              <br />
              <span style={{ fontFamily: "sans-serif" }}>
                <Link
                  to="/CreatePost"
                  style={{ textDecoration: "none", fontFamily: "sans-serif" }}
                >
                  Create
                </Link>
              </span>
            </div>
            <div className="mt-3">
              <span
                style={{ color: "royalblue" }}
                class="material-symbols-outlined"
              >
                account_circle
              </span>
              <br />
              <span style={{ color: "royalblue" }}>Profile</span>
            </div>
            <div className="mt-3"></div>
          </div>

          <div className="row mt-4 RightBar">
            <div className="profile">
              <div className="profile-frame">
                <Link to="/Home">
                  <div className="profile-pic">
                    <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1690468882~exp=1690469482~hmac=c51b1417a987769d945ce2eb0e9e432fd32c7c564492968360742f9dd4a29057" />
                  </div>
                </Link>

                {/* profile data */}

                <div className="profile-data">
                  <h4 style={{ fontFamily: "sans-serif" }}>
                    {" "}
                    {JSON.parse(localStorage.getItem("user")).name}{" "}
                  </h4>
                  <div style={{ display: "flex" }} className="profile-info">
                    <p style={{ fontFamily: "sans-serif" }}>40 post</p>
                    <p style={{ fontFamily: "sans-serif" }}>40 followers</p>
                    <p style={{ fontFamily: "sans-serif" }}>40 following</p>
                  </div>
                </div>
              </div>
              <hr
                style={{ width: "80%", opacity: "1", margin: "25px auto" }}
              ></hr>

              {/* Gallery Section */}

              <div className="gallery">
                {posts.map((value) => {
                  return <img key={value._id} src={value.photo}></img>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userprofile;
