import React, { FC, FormEvent, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ITodo } from "../../interfaces/ITodo"
import { rootState } from "../../store"
import "./CreateTodos.sass"

export const CteateTodos: FC = () => {
  const users = useSelector((state: rootState) => state.users)
  const todos = useSelector((state: rootState) => state.todos)
  const dispatch = useDispatch()

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    let data: any = new FormData(event.currentTarget)
    data = Object.fromEntries(data)
    event.currentTarget.querySelector("i")?.classList.contains("active") ? data.favorite = true:
    data.favorite = false
    console.log(data)
    const todo: ITodo = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      importance: data.importance,
      isFavorite: data.favorite,
      deadline: data.deadline,
    }
    console.log(todo)
    dispatch({type: "ADD_TODO", payload: todo})
  }
  const heartActive = (event: MouseEvent<HTMLDivElement>): void => {
    event.currentTarget.classList.toggle("active")
  }
  return(
    <section className="createTodos">
      <h1 className="label">{users.current ? `Todos user's ${users.current.username}`: "Guest, please enter to create todo"}</h1>
        {users.current &&
          <div className="addTodoWrap">
            <h2>Create new todo</h2>
            <Link to="/">All Todos</Link>
            <form onSubmit={submit} className="addTodo">
              <input required type="text" name="name" className="name" placeholder="Enter todo" />
                <div className="importance">
                  <span>Choose importance</span>
                  <div className="radios">
                    <span className="label">1: </span>
                    <input required name="importance" type="radio" value="1" />
                    <span className="label">2: </span>
                    <input required name="importance" type="radio" value="2" />
                    <span className="label">3: </span>
                    <input required name="importance" type="radio" value="3" />
                    <span className="label">4: </span>
                    <input required name="importance" type="radio" value="4" />
                    <span className="label">5: </span>
                    <input required name="importance" type="radio" value="5" />
                  </div>
                </div>
                <div className="deadline">
                  <span className="chooseDeadline">Choose deadline</span>
                  <input required type="datetime-local" name="deadline" min={new Date().toISOString().substring(0, 16)} />
                </div>
                <div className="isFavorites">
                  <span>Is favorites?</span>
                  <i className="fas fa-heart" onClick={heartActive}></i>
                </div>
              <button className="btn">Create</button>
            </form>
          </div>
        }
    </section>
  )
}