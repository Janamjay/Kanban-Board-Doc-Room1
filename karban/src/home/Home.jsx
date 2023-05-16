import React, { useState } from "react";
import style from "./Home.module.css";
import BoardBar from "../containers/navbars/BoardBar";
import Board from "../containers/board/Board";
import Editable from "../components/editable/Editable";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addList, deleteList } from "../redux/listsSlice";
import { v4 as uuid } from "uuid";
import LeftSidebar from "../containers/navbars/LeftSidebar";

function Home() {
  const dispatch = useDispatch();
  const listArr = useSelector((state) => state.lists.value);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAddList = (title) => {
    dispatch(addList({ id: uuid(), title: title, cards: [] }));
  };

  const handleDeleteList = (listID) => {
    dispatch(deleteList(listID));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={style.mainLayout}>
        <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ""}`}>
          <LeftSidebar />
        </div>
        <div className={style.content}>
          <BoardBar toggleSidebar={toggleSidebar} />
          <div className={style.outer_board}>
            <div className={style.inner_board}>
              {listArr?.map((item) => (
                <Board
                  key={item.listID}
                  board={item}
                  listDelete={handleDeleteList}
                />
              ))}
              <Editable
                text="Add another list"
                placeholder="Enter list title...."
                onSubmit={(value) => handleAddList(value)}
              />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
