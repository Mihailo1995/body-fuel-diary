import express from 'express'
import mongoose from 'mongoose'

import { Food } from '../models/food.model'

export type NutritionFacts = {
  calories: number
  fat: number
  carbs: number
  protein: number
}

const lacksNutritionFacts = (nutritionFacts: NutritionFacts) => {
  return (
    !nutritionFacts.calories ||
    !nutritionFacts.fat ||
    !nutritionFacts.carbs ||
    !nutritionFacts.protein
  )
}

export const getAllFoods = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allFoods = await Food.find({}) // fetch all foods from DB
    res.status(200).json({ success: true, data: allFoods })
  } catch (error) {
    console.error('Error fetching all foods', (error as Error).message)
    res.status(500).json({ success: false, error: 'Server error.' })
  }
}

export const getFood = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid food id.' })
  }

  try {
    const food = await Food.findById(id)
    res.status(200).json({ success: true, data: food })
  } catch (error) {
    console.error('Error fetching food', (error as Error).message)
    res.status(500).json({ success: false, error: 'Server error.' })
  }
}

export const createFood = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, nutritionFacts } = req.body

  if (!title || lacksNutritionFacts(nutritionFacts)) {
    return res
      .status(400)
      .json({ success: false, error: 'Please provide all required fields.' })
  }

  try {
    const newFood = new Food({ title, nutritionFacts })
    await newFood.save()
    res.status(201).json({ success: true, data: newFood })
  } catch (error) {
    console.error('Error creating food', (error as Error).message)
    res.status(500).json({ success: false, error: 'Server error.' })
  }
}

export const updateFood = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params
  const food = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid food id.' })
  }

  try {
    const updatedFood = await Food.findByIdAndUpdate(id, food, { new: true })
    res.status(200).json({
      success: true,
      message: 'Food updated successfully.',
      data: updatedFood,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' })
  }
}

export const deleteFood = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid food id.' })
  }

  try {
    await Food.findByIdAndDelete(id)
    res
      .status(200)
      .json({ success: true, message: 'Food deleted successfully.' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' })
  }
}
