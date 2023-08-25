import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp({initialTodos}) {
  const [todos, setTodos] = useState(initialTodos);

  /** add a new todo to list */
  function create(newTodo) {
    let newTodoWithId = { ...newTodo, id: uuid() };
    setTodos(todos => [...todos, newTodoWithId]);
  }

  /** update a todo with updatedTodo */
  function update(updatedTodo) {
    // console.log(updatedTodo);
    // const todo = todos.filter(todo => todo.id === updatedTodo.id);
    function updatedTodos(todos) {
      todos.map(todo => { todo.id === updatedTodo.id ? updatedTodo : todo });
    }
    setTodos(updatedTodos(todos));
  }

  /** delete a todo by id */
  function remove(id) {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }

  const editableTodoListComponent =
    <EditableTodoList todos={todos} update={update} remove={remove}/>

  const noTodos = <span className="text-muted">You have no todos.</span>

  const topTodoSection = (
    <section className="mb-4">
      <h3>Top Todo</h3>
      <TopTodo todos={todos}/>
    </section>
  )

  return (
      <main className="TodoApp">
        <div className="row">

          <div className="col-md-6">
             { todos.length === 0 ? noTodos : editableTodoListComponent}
          </div>

          <div className="col-md-6">
            { todos.length === 0 ? null : topTodoSection}
            <section>
              <h3 className="mb-3">Add Nü</h3>
              <TodoForm handleSave={create}/>
            </section>
          </div>

        </div>
      </main>
  );
}

export default TodoApp;