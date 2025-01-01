export type NutritionFacts = {
  calories: number
  fat: number
  carbs: number
  protein: number
}

export type Food = {
  title: string
  nutritionFacts: NutritionFacts
  _id?: string
  createdAt?: string
  updatedAt?: string
}
