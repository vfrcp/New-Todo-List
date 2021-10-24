import { IdefaultStateTodos } from "../../interfaces/IdefaultStateTodos"
import { ITodo } from "../../interfaces/ITodo"

const defaulStateTodos: IdefaultStateTodos = {
  all: JSON.parse(localStorage.getItem("todos") || "false")
} 

const add = (Todo: ITodo | false): IdefaultStateTodos | void => {
  if(Todo){
    const allTodos: Array<ITodo> = JSON.parse(localStorage.getItem("todos") || "[]")
    allTodos.push(Todo)
    console.log(allTodos)
    localStorage.setItem("todos", JSON.stringify(allTodos))
    const state: IdefaultStateTodos = {
      all: allTodos
    }
    return state
  }
}
const del = (Todo: ITodo | false): IdefaultStateTodos | void => {
  if(Todo){
    const allTodos: Array<ITodo> = JSON.parse(localStorage.getItem("todos") || "[]")
    const newTodos = allTodos.filter((todo: ITodo): ITodo | void => {
      if(Todo.id !== todo.id){
        return todo
      }
    })
    localStorage.setItem("todos", JSON.stringify(allTodos))
    const state: IdefaultStateTodos = {
      all: newTodos
    }
    return state
  }
}

export const todosReducer = (state: IdefaultStateTodos = defaulStateTodos, action: {type: string, payload: ITodo | false}): IdefaultStateTodos => {
  switch(action.type){
    case "ADD_TODO": return{...state, ...add(action.payload)} 
    case "DEL_TODO": return{...state, ...del(action.payload)}
    default: return state
  }
} 