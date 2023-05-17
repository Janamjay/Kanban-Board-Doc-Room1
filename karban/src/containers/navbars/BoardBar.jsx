import React from 'react'
import style from "./BoardBar.module.css"
import {AiOutlineStar} from "react-icons/ai"
import {AiOutlineUserAdd} from "react-icons/ai"
import { BiRocket } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";


function BoardBar() {
  return (
    <div className={style.navbar}>
      <div className={style.name}>
           Home Management
           <span className={style.icon}><AiOutlineStar/></span>
      </div>
      <button className={style.pBtn}>
          <BiRocket fontSize='1.4rem' color="white" /> <p>Power-Ups</p>
        </button>
      <button className={style.pBtn}>
          <AiFillThunderbolt fontSize='1.4rem' color="white" /> <p>Automation</p>
        </button>
        <button className={style.pBtn}>
          <BsFilter fontSize='1.4rem' color="white" /> <p>Filter</p>
        </button>
      <div className={style.button}>
        <img className={style.userImage} src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt='user' width="50px" height="50px"/>
        <button className={style.share}><AiOutlineUserAdd className={style.user}/>Share</button>
      </div>
    </div>
  )
}

export default BoardBar;
