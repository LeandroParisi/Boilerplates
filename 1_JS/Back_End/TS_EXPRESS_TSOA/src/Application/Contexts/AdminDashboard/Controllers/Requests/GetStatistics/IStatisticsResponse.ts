export interface CaloriesPerUser {
  userId : number,
  name : string,
  caloriesInAverage : number
}

export interface IStatisticsReponse {
  entriesThisWeek : number
  entriesLastWeek : number
  caloriesPerUserThisWeek : CaloriesPerUser[]
}
