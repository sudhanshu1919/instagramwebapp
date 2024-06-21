import React, { useEffect } from "react";

import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  //  I have use toastify
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("https://instaclone-q4xo.onrender.com/SingnUp");
    }

    // I have show all posts in the datbase on the home screen
    fetch(" https://instaclone-q4xo.onrender.com/allposts", {
      headers: {
        auhorization: "Bearer" + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  // to show hide comments

  const toggleComment = (value) => {
    if (show) {
      setShow(false);
    } else {
      setItem(value);
      setShow(true);
    }
  };

  const likePost = (id) => {
    fetch("https://instaclone-q4xo.onrender.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        auhorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((values) => {
          if (values._id == result._id) {
            return result;
          } else {
            return values;
          }
        });
        setData(newData);
        //console.log(result);
      })
      .catch((error) => {
        //console.error("Error:", error);
      });
  };

  const unlikePost = (id) => {
    fetch("https://instaclone-q4xo.onrender.com/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        auhorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((value) => {
          if (value._id == result._id) {
            return result;
          } else {
            return value;
          }
        });
        setData(newData);
        // console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // This is function for comments

  const makeComment = (text, id) => {
    fetch("https://instaclone-q4xo.onrender.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        auhorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((value) => {
          if (value._id == result._id) {
            return result;
          } else {
            return value;
          }
        });
        setData(newData);
        setComment(" ");
        notifyB("Comment Posted ..!");
        //console.log(result);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ marginTop: "100px" }}>
          <div className="Home">
            {data.map((value) => {
              return (
                <div className="card">
                  {/* card header */}
                  <div className="card-header">
                    <div className="card-pic">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBynudqy6z4i9Gv4tUlDlKdd5eAF_jQPHSUN86Eq8&s" />
                    </div>
                    <h5 style={{ fontFamily: "sans-serif" }}>
                      {value.postedBy.name}
                    </h5>
                  </div>

                  {/* card image */}
                  <div className="card-image">
                    <img src={value.photo} />
                  </div>

                  {/*  card contaents*/}

                  <div className="card-contaent">
                    {value.likes.includes(
                      JSON.parse(localStorage.getItem("user"))._id
                    ) ? (
                      <span
                        className="material-symbols-outlined-red"
                        onClick={() => {
                          unlikePost(value._id);
                        }}
                      >
                        favorite
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined  material-symbols-outlined"
                        onClick={() => {
                          likePost(value._id);
                        }}
                      >
                        favorite
                      </span>
                    )}

                    <p style={{ fontFamily: "sans-serif" }}>
                      {value.likes.length} Likes
                    </p>
                    <p style={{ fontFamily: "sans-serif" }}>{value.body}</p>

                    <p
                      onClick={() => {
                        toggleComment(value);
                      }}
                      style={{
                        fontFamily: "sans-serif",
                        fontWeight: "bolder",
                        color: "gray",
                        cursor: "pointer",
                      }}
                    >
                      View all comments
                    </p>
                  </div>

                  <div className="add-comment">
                    <span className="material-symbols-outlined">mood</span>
                    <input
                      type="text"
                      placeholder="Add comments ..!"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      style={{ fontFamily: "sans-serif" }}
                    />
                    <button
                      className="comment"
                      onClick={() => {
                        makeComment(comment, value._id);
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Show comments */}

            {show && (
              <div className="showComment">
                <div className="Container">
                  <div className="postPic">
                    <img src={item.photo}></img>
                  </div>

                  <div className="details">
                    {/* card-header */}
                    <div
                      className="card-header"
                      style={{ borderBottom: "1px solid black" }}
                    >
                      <div className="card-pic">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBynudqy6z4i9Gv4tUlDlKdd5eAF_jQPHSUN86Eq8&s" />
                      </div>
                      <h5 style={{ fontFamily: "sans-serif" }}>
                        {item.postedBy.name}
                      </h5>
                    </div>

                    {/* comments section */}
                    <div
                      className="comment-sections"
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {item.comments.map((comment) => {
                        return (
                          <p className="comm">
                            <span
                              className="commenter"
                              style={{ fontWeight: "bold" }}
                            >
                              {comment.postedBy.name}{" "}
                            </span>
                            <span className="commentText">
                              {" "}
                              {comment.comment}
                            </span>
                          </p>
                        );
                      })}
                    </div>

                    {/* Add comments */}

                    <div className="add-comment">
                      <span className="material-symbols-outlined">mood</span>
                      <input
                        type="text"
                        placeholder="Add comments ..!"
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        style={{ fontFamily: "sans-serif" }}
                      />
                      <button
                        className="comment"
                        onClick={() => {
                          makeComment(comment, item._id);
                          toggleComment("");
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="close-comment"
                  onClick={() => {
                    toggleComment();
                  }}
                >
                  <span class="material-symbols-outlined material-symbols-outlined-comment">
                    close
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
