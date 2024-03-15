import React, { useState } from "react";

import {
  ListItem,
  Checkbox,
  Switch,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

const TRASH_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
      clipRule="evenodd"
    />
  </svg>
);

function TodoItem(props) {
  const [completed, setCompleted] = useState(false);
  const [id, setId] = useState(props.id);
  const [editMode, setEditMode] = useState(false);

  const [taskName, setTaskName] = useState(props.data.title);
  const [taskDesc, setTaskDesc] = useState(props.data.desc);
  const [taskDue, setTaskDue] = useState(props.data.date);

  const taskNameChange = ({ target }) => setTaskName(target.value);
  const taskDescChange = ({ target }) => setTaskDesc(target.value);
  const taskDueChange = ({ target }) => setTaskDue(target.value);

  const onChange = ({ target }) => setCompleted(!completed);

  const handleRemove = () => {
    props.func(id);
  };

  const handleEdit = (state) => {
    if (state == "edit") {
    }
    setEditMode(!editMode);
  };

  return (
    <ListItem className="relative items-start text-white hover:text-white hover:bg-[color:#78909c] h-64 ">
      <div className="flex flex-col w-full h-10 ">
        {editMode ? (
          <>
            <div className="flex flex-col gap-3">
              <Input
                color="white"
                label="Edit Task Name"
                defaultValue={taskName}
                onChange={taskNameChange}
              />
              <input
                className="border outline text-white p-3 focus:border-2 rounded-md bg-transparent outline-none border-white"
                type="date"
                id="date-selector"
                name="trip-start"
                defaultValue={taskDue}
                min={new Date().toJSON().slice(0, 10)}
                max="9999-12-31"
                onChange={taskDueChange}
              />
              <Textarea
                className="!w-3/4 text-white border-white focus:border-white border-t-white focus:border-t-white"
                defaultValue={taskDesc}
                onChange={taskDescChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="pb-3">Task Name: {taskName}</div>
            <div className="pb-3">Due: {taskDue}</div>
            <div className="">Description: {taskDesc}</div>
            <div className="absolute top-0 right-0 pt-5 flex justify-center items-center px-2">
              <div className="pr-3">Completed</div>
              <Switch color="red" onChange={onChange} />
              <div
                className={completed ? "pl-2 hover:text-[color:red]" : "hidden"}
                id={id}
                onClick={handleRemove}
              >
                {TRASH_ICON}
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-0 right-0 m-5 mb-7 ">
          {editMode ? (
            <Button color="green" onClick={handleEdit}>
              DONE
            </Button>
          ) : (
            <Button color="blue" onClick={handleEdit}>
              EDIT
            </Button>
          )}
        </div>
      </div>
    </ListItem>
  );
}

export default TodoItem;
