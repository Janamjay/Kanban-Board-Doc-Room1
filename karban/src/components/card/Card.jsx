import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import Dropdown from "../dropdown/Dropdown";
import card from "./card.module.css";

import Chip from "../tags/Chip";

import { Link } from "react-router-dom";

import {useDispatch} from 'react-redux'
import {deleteTask} from '../../redux/tasksSlice'

const Card = (props) => {
  const dispatch=useDispatch()
  const [showDropdown, setShowDropdown] = useState(false);
  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleCardDelete(){
    dispatch(deleteTask(props.card.cardID))
  }
  return (
    <Link style={{textDecoration:"none"}} to={props.card.cardID}>
      <div className={card.card_main}>
        <div className={card.card_top}>
          <div className={card.card_labels}>
            {props.card?.labels?.map((item, index) => {
              return <Chip key={index} text={item.text} color={item.color} />;
            })}
          </div>
          <div className={card.top_more}>
            <FiMoreHorizontal onClick={handleClick} />
            {showDropdown && (
              <Dropdown>
                <div className={card.dropdown}>
                  <p><span onClick={handleCardDelete}>Delete card</span></p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={card.card_title}>{props.card?.cardTitle}</div>
        <div className={card.card_footer}>
          {props.card?.createdAt && (
            <p>
              <AiOutlineClockCircle /> {props.card?.createdAt}
            </p>
          )}
          <p>
            <FiCheckSquare /> 2/4
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
