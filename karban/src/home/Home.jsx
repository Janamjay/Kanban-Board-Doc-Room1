import React from "react";
import style from "./Home.module.css";
import Navbar from "../containers/navbar/Navbar";
import Board from "../containers/board/Board";
import Editable from "../components/editable/Editable";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addList, deleteList } from "../redux/listsSlice";
import { v4 as uuid } from "uuid";

function Home() {
  const dispatch = useDispatch();
  const listArr = useSelector((state) => state.lists.value);

  const handleAddList = (title) => {
    dispatch(addList({ id: uuid(), title: title, cards: [] }));
  };

  const handleDeleteList = (listID) => {
    // console.log(listID)
    dispatch(deleteList(listID));
  };

  return (
    <>
      <div className={style.mainLayout}>
        <div className={style.image}>
          <Navbar />
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
                text="Add list"
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
