import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import Dropdown from "../../components/dropdown/Dropdown";
import cardStyles from "./card.module.css";
import { Link } from "react-router-dom";

const Card = ({card, handleDeleteTask}) => {

  const [showDropdown, setShowDropdown] = useState(false);
  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  
  return (
    <Link style={{textDecoration:"none"}} to={`/${card.cardID}`}>
      <div className={cardStyles.card_main}>
        <div className={cardStyles.card_top}>
          <div className={cardStyles.card_title}>{card?.cardTitle}</div>
          <div className={cardStyles.top_more}>
            <FiMoreHorizontal onClick={handleClick} />
            {showDropdown && (
              <Dropdown>
                <div className={cardStyles.dropdown}>
                  <p><span onClick={()=>handleDeleteTask(card.cardID)}>Delete card</span></p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={cardStyles.card_footer}>
          {card?.createdAt && (
            <p>
              <AiOutlineClockCircle /> {card?.createdAt}
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