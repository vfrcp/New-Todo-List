import { ITodo } from "./ITodo";

export interface IUser{
  id: string,
  username: string,
  todos?: Array<ITodo>,
}