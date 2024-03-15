import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AddTodoForm } from "./Components/addTodoItemForm";
import TodoList from "./Components/todoList";

function App() {
  // window.addEventListener("click", () => {
  //   console.log("DEBUG", newTask);
  // });

  const [tasks, setTasks] = useState([]);

  const getFormData = (data) => {
    setTasks([data, ...tasks]);
  };

  const updateTaskListOnRemove = (id) => {
    console.log("hi", id);
    let newArr = [...tasks];
    newArr.splice(id, 1);
    setTasks(newArr);
    // setTasks([...newTasksList]);
  };

  useEffect(() => {
    // console.log("curr", tasks);
  }, [tasks]);

  return (
    <>
      <div className="flex w-full sm:flex-col justify-center">
        <div className="sm:w-full md:w-2/4 h-2/3 flex justify-center flex-wrap">
          <AddTodoForm func={getFormData} />
        </div>
        <div className="sm:w-full md:w-2/4 lg:w-1/2 sm:p-0 bg-[color:#37474f] rounded-2xl lg:ml-10 md:h-screen lg:h-screen overflow-scroll overflow-x-hidden">
          <TodoList tasksList={tasks} func={updateTaskListOnRemove} />
        </div>
      </div>
    </>
  );
}

export default App;
