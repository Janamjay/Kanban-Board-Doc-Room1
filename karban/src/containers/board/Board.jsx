import React, { useState } from "react";
import board from "./board.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "../card/Card";
import Editable from "../../components/editable/Editable";
import Dropdown from "../../components/dropdown/Dropdown";

import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../../redux/tasksSlice";

import { v4 as uuid } from "uuid";

const Board = (props) => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.value);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleAddTask(inputValue) {
    const currentDate = new Date();
    const formatDate = currentDate.getDate();
    const formatMonth = currentDate.toLocaleString("default", {
      month: "short",
    });
    const newCard = {
      cardID: uuid(),
      listID: props.board.listID,
      cardTitle: inputValue,
      createdAt: `${formatDate} ${formatMonth}`,
    };
    dispatch(addTask(newCard));
  }

  function handleDeleteTask(cardID) {
    dispatch(deleteTask(cardID));
  }

  return (
    <div className={board.main_board}>
      <div className={board.board_top}>
        <p className={board.board_top_tittle}>{props.board?.listTitle}</p>
        <div className={board.top_more}>
          <FiMoreHorizontal onClick={handleClick} />
          {showDropdown && (
            <Dropdown>
              <div className={board.dropdown}>
                <p>
                  <span onClick={() => props.listDelete(props.board.listID)}>
                    Delete
                  </span>
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className={`${board.board_cards}  ${board.custom_scroll}`}>
        {allTasks
          ?.filter((task) => task.listID === props.board.listID)
          .map((item) => (
            <Card
              key={item.cardID}
              card={item}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        <Editable
          text="Add a card"
          placeholder="Enter a title for this card...."
          handleAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};

export default Board;
