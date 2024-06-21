import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
function CreatePost() {
  // it is for sanve data to the server
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  //  I have use toastify
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    // saving post mongodb databse
    if (url) {
      fetch("https://instaclone-q4xo.onrender.com/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          auhorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted..!");
            // it will go the home page
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaclone");
    data.append("cloud_name", "sudhanshugaikwad");
    fetch("https://api.cloudinary.com/v1_1/sudhanshugaikwad/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ marginTop: "100px" }}>
          <div className="create-post">
            {/* header */}
            <div className="post-header">
              <h4 style={{ margin: "3px auto" }}>Create new post</h4>
              <button
                id="post-btn"
                onClick={() => {
                  postDetails();
                }}
              >
                Share
              </button>
            </div>

            {/*  image preiview*/}
            <div className="main-div">
              <img
                id="output"
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  loadfile(event);
                  setImage(event.target.files[0]);
                }}
              />
            </div>

            {/* details */}
            <div className="details">
              <div className="card-header">
                <div className="card-pic">
                  <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1690468882~exp=1690469482~hmac=c51b1417a987769d945ce2eb0e9e432fd32c7c564492968360742f9dd4a29057" />
                </div>
                <h5>Sudhanshu G Gaikwad</h5>
              </div>
              <textarea
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                type="text"
                placeholder="Write a caption ..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
