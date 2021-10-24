import { IUser } from "../../interfaces/IUser"
import { IdefaultStateUsers } from "../../interfaces/IdefaultStateUsers"

const defaultStateUsers: IdefaultStateUsers = {
  all: JSON.parse(localStorage.getItem("allUsers") || "[]"),
  current: JSON.parse(localStorage.getItem("currentUser") || "false"),
}

const addUser = (user: IUser | false): IdefaultStateUsers | void => {
  if(user){
    const allUsers: Array<IUser> = JSON.parse(localStorage.getItem("allUsers") || "[]")
    allUsers.push(user)
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    localStorage.setItem("todos", "false")
    const state: IdefaultStateUsers = {
      all: allUsers,
      current: user,
    }
    return state
  }
}
const out = (): IdefaultStateUsers => {
  const allUsers: Array<IUser> = JSON.parse(localStorage.getItem("allUsers") || "[]")
  localStorage.removeItem("currentUser")
  localStorage.removeItem("todos")
  const state: IdefaultStateUsers = {
    all: allUsers,
    current: false,
  }
  return state
}
const enter = (user: IUser | false): IdefaultStateUsers | void => {
  if(user){
    const allUsers: Array<IUser> = JSON.parse(localStorage.getItem("allUsers") || "[]")
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("todos", JSON.stringify(user.todos))
    const state: IdefaultStateUsers = {
      all: allUsers,
      current: user,
    }
    return state
  }
}
const del = (user: IUser | false): IdefaultStateUsers | void => {
  if(user){
    const allUsers: Array<IUser> = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const currentUser: IUser | false = JSON.parse(localStorage.getItem("currentUser") || "false")
    const newUsers: Array<IUser> = allUsers.filter((userFromArray): IUser | void => {
      if(userFromArray.id !== user.id){
        return userFromArray
      }
    })
    localStorage.setItem("allUsers", JSON.stringify(newUsers))
    const state: IdefaultStateUsers = {
      all:newUsers,
      current: currentUser
    }
    return state
  }
}
export const usersReducer = (state: IdefaultStateUsers = defaultStateUsers, action: {type: string, payload: IUser | false}): IdefaultStateUsers => {
  switch(action.type){
    case "ENTER": return {...state, ...enter(action.payload)}
    case "OUT": return{...state, ...out()}
    case "ADD_USER": return{...state, ...addUser(action.payload)}
    case "DEL_USER": return{...state, ...del(action.payload)}
    default: return state
  }
}