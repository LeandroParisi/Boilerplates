export interface ExpensesByMonth {
  month : string
  totalSpent : number
  isOverThreshold : boolean
}

export interface CaloriesByDay {
  month : string
  calories : number
  year : number
  day : number
  isOverThreshold : boolean
}

export interface IUserStatistics {
  caloriesByDay : CaloriesByDay[]
  expensesByMonth : ExpensesByMonth[]
}
