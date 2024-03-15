import React, { useRef } from "react";
import { useState } from "react";

import { Navbar, Card, List, ListItem } from "@material-tailwind/react";

import TodoItem from "./todoItem";

function TodoList(props) {
  // console.log(props.tasksList.toReversed());

  return (
    <>
      <Navbar className="px-4 py-2 lg:px-8 lg:py-4 text-center bg-[color:#78909c] border-none py-5 my-2 w-auto mx-2">
        TODO LIST
      </Navbar>
      <List id="board">
        {props.tasksList.map((task, index) => (
          <TodoItem data={task} id={index} func={props.func} />
        ))}
      </List>
    </>
  );
}

export default TodoList;

{
  /* <div className="absolute top-2 right-2 hover:text-[color:red] ">
            {TRASH_ICON}
          </div> */
}
