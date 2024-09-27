import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Filter from "./Filter";

const TodoApp = () => {
  const [apiTodos, setApiTodos] = useState([]);
  const [localTodos, setLocalTodos] = useState([]); 
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedLocalTodos = JSON.parse(localStorage.getItem("localTodos")) || [];
    setLocalTodos(savedLocalTodos);

    axios
      .get("https://dummyjson.com/todos")
      .then((response) => {
        setApiTodos(response.data.todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(localTodos));
  }, [localTodos]);

  const addTodo = (task) => {
    const newTodo = {
      id: Date.now(),
      todo: task,
      completed: false,
    };
    setLocalTodos([...localTodos, newTodo]);
  };

  const toggleCompleteApiTodo = (id) => {
    const updatedTodo = apiTodos.find((todo) => todo.id === id);
    axios
      .put(`https://dummyjson.com/todos/${id}`, {
        completed: !updatedTodo.completed,
      })
      .then(() => {
        setApiTodos(
          apiTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating API todo:", error);
      });
  };

  const toggleCompleteLocalTodo = (id) => {
    setLocalTodos(
      localTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteApiTodo = (id) => {
    axios
      .delete(`https://dummyjson.com/todos/${id}`)
      .then(() => {
        setApiTodos(apiTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting API todo:", error);
      });
  };

  const deleteLocalTodo = (id) => {
    setLocalTodos(localTodos.filter((todo) => todo.id !== id));
  };

  const filterTodos = (todos) => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filterTodos(apiTodos)}
        toggleComplete={toggleCompleteApiTodo}
        deleteTodo={deleteApiTodo}
      />
      <TodoList
        todos={filterTodos(localTodos)}
        toggleComplete={toggleCompleteLocalTodo}
        deleteTodo={deleteLocalTodo}
      />
    </div>
  );
};

export default TodoApp;
