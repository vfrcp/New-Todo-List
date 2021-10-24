import { createStore, combineReducers } from "redux";
import { todosReducer } from "./reducers/todos";
import { usersReducer } from "./reducers/users";

const rootReducer = combineReducers({
  users: usersReducer,
  todos: todosReducer
})

export type rootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)