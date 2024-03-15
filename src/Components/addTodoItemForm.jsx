import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

const INITIAL_BTN_STATE = true;

const reducer = (state, action) => {
  switch (action.type) {
    case "FILLED":
      return false;
    case "AWAIT":
      return true;
    default:
      return true;
  }
};

export function AddTodoForm(props) {
  const [filled, dispatch] = useReducer(reducer, INITIAL_BTN_STATE);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [date, setDate] = useState("");

  const DEBUGGER = () => {
    console.log("TASK NAME FIELD:", taskName);
    console.log("TASK DESC FIELD:", taskDesc);
    console.log("DATE FIELD:", date);
  };

  const handleFilled = () => {
    dispatch({ type: "FILLED" });
  };

  const handleAwait = () => {
    dispatch({ type: "AWAIT" });
  };

  const handleSubmit = () => {
    props.func({ title: taskName, desc: taskDesc, date: date });
  };

  useEffect(() => {
    const dateSelectorEl = document.getElementById("date-selector");
    const taskNameEl = document.getElementById("task-name-input");
    const taskDescEl = document.getElementById("task-desc-input");

    dateSelectorEl.addEventListener("input", (e) => {
      setDate(e.target.value);
    });
    taskNameEl.addEventListener("input", (e) => {
      setTaskName(e.target.value);
    });
    taskDescEl.addEventListener("input", (e) => {
      setTaskDesc(e.target.value);
    });
  }, []);

  useEffect(() => {
    // DEBUGGER();
    if (taskName.length > 0 && taskDesc.length > 0 && isDateValid(date)) {
      handleFilled();
    } else {
      handleAwait();
    }
  }, [taskName, taskDesc, date]);

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="flex">
        Welcome to Task
        <div className="bg-black text-white px-1 rounded-md">LITE</div>
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Add a Task Below
      </Typography>
      <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Task Name
          </Typography>
          <Input
            id="task-name-input"
            size="lg"
            placeholder="Ex.. Drink water"
            defaultValue={taskName}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Task Description
          </Typography>
          <Textarea id="task-desc-input" label="Description" />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Completion By
          </Typography>
          <input
            className="border !border-blue-gray-200 p-3 rounded-md"
            type="date"
            id="date-selector"
            name="trip-start"
            defaultValue={date}
            min={new Date().toJSON().slice(0, 10)}
            max="9999-12-31"
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              SET PRIORITY
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              ></a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button
          className="mt-6  text-center"
          loading={filled}
          fullWidth
          id="submit-btn"
          onClick={handleSubmit}
        >
          <div>{filled ? "Please fill out the form" : "Add Task"}</div>
        </Button>
      </form>
    </Card>
  );
}
