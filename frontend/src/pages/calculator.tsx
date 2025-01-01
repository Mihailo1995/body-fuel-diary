import { useState } from 'react'
import { Form, Label, NumberField } from 'react-aria-components'

import { Container } from '#components/container'
import { ImportFoodModal } from '#components/import-food-modal'
import { Button } from '#components/button'
import { NumberInput } from '#components/input'

import { NUTRITION_FACTS } from '#helpers/constants'

import { Food, NutritionFacts } from '#types/food.types'

type FoodMetricInputProps = {
  label: string
  value: number
  onChange: (value: number) => void
  result?: number | undefined
}

const FoodMetricInput = ({ label, value, onChange, result }: FoodMetricInputProps) => {
  return (
    <div className="flex items-center">
      <NumberField
        className="flex w-[164px] items-center justify-between"
        minValue={0}
        formatOptions={{
          useGrouping: false,
          maximumFractionDigits: 2,
        }}
        value={value}
        onChange={onChange}
      >
        <Label>{label}</Label>
        <NumberInput />
      </NumberField>
      {!isNaN(result as number) && (
        <span className="ml-2">{`${result} ${label === 'Calories' ? 'kcal' : 'g'}`}</span>
      )}
    </div>
  )
}

const initialState: NutritionFacts = {
  calories: NaN,
  fat: NaN,
  carbs: NaN,
  protein: NaN,
}

const Calculator = () => {
  const [foodTitle, setFoodTitle] = useState<Food['title']>('')
  const [grams, setGrams] = useState<number>(NaN)
  const [nutritionFacts, setNutritionFacts] = useState<NutritionFacts>(initialState)
  const [results, setResults] = useState<NutritionFacts>(initialState)

  console.log('grams', grams)
  console.log('nutritionFacts', nutritionFacts)
  console.log('results', results)

  const calculateResults = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formatNumber = (n: number) => Math.round((Number(grams) / 100) * n)
    setResults({
      calories: formatNumber(nutritionFacts.calories),
      fat: formatNumber(nutritionFacts.fat),
      carbs: formatNumber(nutritionFacts.carbs),
      protein: formatNumber(nutritionFacts.protein),
    })
  }

  const resetFields = () => {
    setFoodTitle('')
    setGrams(NaN)
    setNutritionFacts(initialState)
    setResults(initialState)
  }

  const handleImportFood = (food: Food) => {
    setResults(initialState)
    setNutritionFacts(food.nutritionFacts)
    setFoodTitle(food.title)
  }

  return (
    <Container>
      <Form
        className="flex flex-col space-y-2"
        onSubmit={calculateResults}
        onReset={resetFields}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="italic">{foodTitle}</h3>
          <ImportFoodModal onImportFood={handleImportFood} />
        </div>

        <FoodMetricInput
          label="Grams"
          value={grams}
          onChange={(newValue) => setGrams(newValue)}
        />
        {NUTRITION_FACTS.map(({ id, label }) => (
          <FoodMetricInput
            key={id}
            label={label}
            value={nutritionFacts?.[id as keyof NutritionFacts]}
            onChange={(newValue) => {
              setNutritionFacts({ ...nutritionFacts, [id]: newValue } as NutritionFacts)
              setFoodTitle('')
            }}
            result={results?.[id as keyof NutritionFacts]}
          />
        ))}

        <div className="flex justify-between pt-3">
          <Button
            type="reset"
            variant="secondary"
          >
            Reset
          </Button>
          <Button type="submit">Calculate</Button>
        </div>
      </Form>
    </Container>
  )
}

export default Calculator
