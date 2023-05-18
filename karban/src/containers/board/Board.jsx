import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "../card/Card";
import Editable from "../../components/editable/Editable";
import Dropdown from "../../components/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  moveCardToAnotherList
} from "../../redux/tasksSlice";
import { updateTitle, reorderCards } from "../../redux/listsSlice";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import boardStyles from "./board.module.css";

const Board = (props) => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newListTitle, setNewListTitle] = useState(props.board?.listTitle);
  const listTitle = useSelector((state) => state.lists.value.listTitle);

  function handleEditTitle() {
    setEditMode(true);
  }

  function handleSaveTitle() {
    dispatch(
      updateTitle({
        listID: props.board.listID,
        listTitle: newListTitle,
        index: props.index,
      })
    );
    setEditMode(false);
  }

  function handleChangeTitle(event) {
    setNewListTitle(event.target.value);
  }

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

  function handleOnDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
  
    const sourceListID = source.droppableId; // Define sourceListID here
    const destinationListID = destination.droppableId;
    const cardID = result.draggableId;
    const startIndex = source.index;
    const endIndex = destination.index;
  
    if (destinationListID !== sourceListID) {
      dispatch(
        moveCardToAnotherList({
          cardID: cardID,
          sourceListID: sourceListID,
          destinationListID: destinationListID
        })
      );
    } else if (startIndex !== endIndex) {
      dispatch(
        reorderCards({
          listID: props.board.listID,
          startIndex: startIndex,
          endIndex: endIndex
        })
      );
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={boardStyles.main_board}>
        <div className={boardStyles.board_top}>
          {editMode ? (
            <input
              className={boardStyles.input}
              autoFocus
              type="text"
              defaultValue={listTitle}
              value={newListTitle}
              onChange={handleChangeTitle}
              onBlur={handleSaveTitle}
            />
          ) : (
            <p
              className={boardStyles.board_top_title}
              onClick={handleEditTitle}
            >
              {props.board?.listTitle}
            </p>
          )}
          <div className={boardStyles.top_more}>
            <FiMoreHorizontal onClick={handleClick} />
            {showDropdown && (
              <Dropdown>
                <div className={boardStyles.dropdown}>
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
        <Droppable droppableId="cards">
          {(provided) => (
            <ul className="cards"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className={`${boardStyles.board_cards} ${boardStyles.custom_scroll}`}>
              {allTasks
                ?.filter((task) => task.listID === props.board.listID)
                .map((item, index) => (
                  <Draggable key={item.cardID} draggableId={item.cardID} index={index}>
                  {(provided) => <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><Card
                    
                    card={item}
                    index={index}
                    handleDeleteTask={handleDeleteTask}
                  /></li>}
                  </Draggable>
                ))}
              {provided.placeholder}
              <Editable
                text="Add a card"
                placeholder="Enter a title for this card...."
                handleAddTask={handleAddTask}
              />
              </div>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
