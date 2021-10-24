import React, { FC, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rootState } from '../../store'
import { IUser } from '../../interfaces/IUser'

import "./Header.sass" 

export const Header: FC = () => {
  const users = useSelector((state: rootState) => state.users)
  console.log(users)
  const dispatch = useDispatch()
  const [userInput, setUserInput] = useState<string>("")
  const usersDownList = useRef<HTMLElement>(null)
  const toggleDownList = (event: React.MouseEvent<HTMLDivElement>): void =>{
    event.currentTarget.classList.toggle("active")
    usersDownList.current?.classList.toggle("active")
  }
  const addUser = (event: React.FormEvent): void => {
    event.preventDefault()
    const user: IUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: userInput,
      todos:[]
    }
    if(users){
      console.log(users)
      dispatch({type: "ADD_USER", payload: user})
    }
    setUserInput("")
  }
  const out = (): void => {
    dispatch({type: "OUT", payload: null})
  }
  const enter = (user: IUser): void => {
    dispatch({type: "ENTER", payload: user})
  }
  const del = (user: IUser): void => {
    if(users && typeof users !== "undefined"){
      dispatch({type: "DEL_USER", payload: user})
    }
  }
  return(
    <div className="header">
      <div className="logo">TODO LIST</div>
      <div className="users"><i onClick={toggleDownList} className="fas fa-users usersIcon"></i></div>
      <div ref={usersDownList as React.RefObject<HTMLDivElement>} className="usersDownList">
        <div className="users">
          {users && users.all.map(user => {
            if(users.current && users.current.id === user.id){
              return <div key={user.id} className="currentUser">
                <div className="username">{user.username}</div>
                <div className="btns">
                  <button onClick={out} className="btn enterAndOut">Out <i className="fas fa-sign-in-alt"></i></button>
                  <button onClick={() => del(user)} className="btn delete"><i className="fas fa-trash"></i></button>
                </div>
              </div>
            }else{
              return <div key={user.id} className="anotherUser">
                <div className="username">{user.username}</div>
                <div className="btns">
                  <button onClick={() => enter(user)} className="btn enterAndOut">Enter <i className="fas fa-sign-in-alt"></i></button>
                  <button onClick={() => del(user)} className="btn delete"><i className="fas fa-trash"></i></button>
                </div>
              </div>
            }
          })}
        </div>
        <form onSubmit={addUser} className="addUser">
          <input required value={userInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserInput(event.target.value)} className="input" type="text" placeholder="Username" />
          <button className="btn" >Add</button>
        </form>
      </div>
    </div>
  )
}