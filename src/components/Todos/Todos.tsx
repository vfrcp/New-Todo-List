import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { rootState } from '../../store'
import "./Todos.sass"
import { IdefaultStateTodos } from '../../interfaces/IdefaultStateTodos'
import { ITodo } from '../../interfaces/ITodo'

export const Todos: FC = () => {
  const todos: IdefaultStateTodos = useSelector((state: rootState) => state.todos)
  console.log(todos)
  return(
    <section className="todosSect">
      <Link to="/create">Create Todo</Link>
      <div className="todosWrap">
        <div className="todos">
          {todos.all && todos.all.map((todo: ITodo) => {
            return <div className="todo">
              <div className="name">{todo.name}</div>
              <div className="deadline">{todo.deadline}</div>
              <div className="isFavorite"></div>
              <div className="importance">
                <meter value={todo.importance} low={2} high={3} min="1" max="5"></meter>
              </div>
              <div className="btns">
                <button className="btn complete">Complete</button>
                <button className="">Done</button>
                <button className="">{todo.isFavorite ? "Delete from favorites": "Add to favorites"}</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}