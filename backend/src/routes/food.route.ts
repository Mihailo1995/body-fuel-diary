import express from 'express'

import {
  createFood,
  deleteFood,
  getAllFoods,
  getFood,
  updateFood,
} from '../controllers/food.controller'

const router = express.Router()

router.get('/', getAllFoods)
router.get('/:id', getFood)
router.post('/', createFood)
router.put('/:id', updateFood) // put when updating all fields, patch when updating some fields
router.delete('/:id', deleteFood)

export { router as foodRouter }
