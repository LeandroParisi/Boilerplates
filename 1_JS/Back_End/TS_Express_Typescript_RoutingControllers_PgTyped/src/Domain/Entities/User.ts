export interface IUser {
  id : number
  name : string
  email : string
  password : string
  dailyCaloriesThreshold : number
  monthlyExpensesThreshold : number
  role : string
  createdAt : Date
  updatedAt : Date
  isActive : boolean
}

export class User implements IUser {
  id: number

  name: string

  email: string

  password: string

  dailyCaloriesThreshold: number

  monthlyExpensesThreshold : number

  role: string

  createdAt : Date

  updatedAt : Date

  isActive: boolean
}
