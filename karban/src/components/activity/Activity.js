import React, { useState } from "react";
import style from "./Activity.module.css";
import Icons from "../icons/Icons";
import { RxActivityLog } from "react-icons/rx";

function Activity() {
  const [details, setShowDetails] = useState(false);
  const [comment, setComment] = useState(false);
  function handleButton() {
    setShowDetails(!details);
  }

  function handleComment() {
    setComment(true);
  }

  function handleInput() {}
  function handleClick() {
    setComment(false);
  }
  return (
    <>
      <div className={style.main}>
        <span className={style.justifyIcon}>
          <Icons icon={<RxActivityLog />} />
        </span>
        <span className={style.disc}>
          <p>Activity</p>
          <button className={style.button} onClick={handleButton}>
            {details ? "Hide Details" : "Show Details"}
          </button>
        </span>
      </div>
      <div className={style.detailsDiv}>
        {details ? (
          <>
            {/* <button className={style.hides}>HIIIIIIIIIIII</button> */}
            <div className={style.mainActivityBox}>
              <span className={style.activityImage}>
                <img
                  className={style.userImages}
                  alt="user"
                  src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  width="40px"
                  height="40px"
                />
              </span>
              <span className={style.activityText}>
                <p>Neha Rajbhar</p>
                <p>Time and Dtae</p>
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={style.comment}>
        <span className={style.justifyImage}>
          <img
            className={style.userImage}
            src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            alt="user"
            width="50px"
            height="50px"
          />
        </span>
        <span className={style.commentBtn}>
          {comment ? (
            <>
              <span className={style.textEditor}>
                <input type="text" onChange={handleInput} />
                <div className={style.btns}>
                  <span>
                    <button className={style.save}>Save</button>
                  </span>
                  <span>
                    <button onClick={handleClick} className={style.cancel}>
                      Cancel
                    </button>
                  </span>
                </div>
              </span>
            </>
          ) : (
            <button onClick={handleComment}>Write a comment....</button>
          )}
        </span>
      </div>
    </>
  );
}

export default Activity;
