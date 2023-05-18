import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import Dropdown from "../../components/dropdown/Dropdown";
import cardStyles from "./card.module.css";
import { Link } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";


const Card = ({ card, handleDeleteTask, index }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  return (
    // <Draggable draggableId={card.cardID} index={index}>
      // {(provided) => (
        // <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Link style={{ textDecoration: "none" }} to={`/${card.cardID}`}>
            {/* <Droppable droppableId="card"> */}
              {/* {(provided) => ( */}
                {/* <div {...provided.droppableProps} ref={provided.innerRef}> */}
                  <div className={cardStyles.card_main}>
                    <div className={cardStyles.card_top}>
                      <div className={cardStyles.card_title}>{card?.cardTitle}</div>
                      <div className={cardStyles.top_more}>
                        <FiMoreHorizontal onClick={handleClick} />
                        {showDropdown && (
                          <Dropdown>
                            <div className={cardStyles.dropdown}>
                              <p>
                                <span onClick={() => handleDeleteTask(card.cardID)}>Delete card</span>
                              </p>
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
                  {/* {provided.placeholder} */}
                {/* </div> */}
              {/* )} */}
            {/* </Droppable> */}
          </Link>
        // </div>
    //   )}
    // </Draggable>
  );
};

export default Card;
