import React, { useState, useEffect, useRef } from "react";

function Profilepic({ changeprofile }) {
  const hiddenFileInput = useRef(null);

  const handelClick = () => {
    hiddenFileInput.current.click();
  };

  const [image, setImage] = useState("");
  const [url, setUrl] = useState(" ");

  // posting image to cloudinary
  const postDetails = () => {
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

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  const postPic = () => {
    // saving post mongodb databse

    fetch("https://instaclone-q4xo.onrender.com/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        auhorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  return (
    <>
      <div className="Profilepic darkBg1">
        <div className="changePic contered">
          <div>
            <h2>Change Profile Photo</h2>
          </div>
          <div style={{ borderTop: "1px solid #8b8585d9" }}>
            <button
              className="upload-btn"
              onClick={handelClick}
              style={{ color: "#1EA1F7" }}
            >
              Upload Photo
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
          <div style={{ borderTop: "1px solid #8b8585d9" }}>
            <button className="upload-btn" style={{ color: "#ed4956" }}>
              Remove Current Photo
            </button>
          </div>
          <div style={{ borderTop: "1px solid #8b8585d9" }}>
            <button
              className="uplad-btn"
              onClick={changeprofile}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profilepic;
