import { IUser } from "./IUser"

export interface IdefaultStateUsers{
  all: Array<IUser>,
  current: IUser | false
}