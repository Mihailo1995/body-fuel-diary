import mongoose from 'mongoose'

const nutritionFactsSchema = new mongoose.Schema({
  calories: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },
})

const foodSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    nutritionFacts: nutritionFactsSchema,
  },
  {
    timestamps: true, // enables 'createdAt' and 'updatedAt' fields
  }
)

export const Food = mongoose.model('Food', foodSchema)
