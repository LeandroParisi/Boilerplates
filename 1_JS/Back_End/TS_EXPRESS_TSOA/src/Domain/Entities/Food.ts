export interface IFood {
  id : number
  userId : number
  name : string
  calories : number
  price : number
  takenAt : Date
  isActive : boolean

}

export class Food implements IFood {
  id: number

  userId: number

  name: string

  calories: number

  price: number

  takenAt : Date

  isActive: boolean
}
