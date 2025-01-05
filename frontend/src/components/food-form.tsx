import { Form, Label, NumberField, TextField } from 'react-aria-components'
import { useNavigate } from 'react-router-dom'

import { Button } from '#components/button'
import { NumberInput, TextInput } from '#components/input'

import { NUTRITION_FACTS } from '#helpers/constants'

import { Food, NutritionFacts } from '#types/food.types'

type NutritionFactInputProps = {
  name: string
  label: string
  defaultValue?: number
}

const NutritionFactInput = ({ name, label, defaultValue }: NutritionFactInputProps) => {
  return (
    <NumberField
      name={name}
      defaultValue={defaultValue}
      isRequired
      className="flex items-center justify-between"
      minValue={0}
      formatOptions={{
        useGrouping: false,
        maximumFractionDigits: 2,
      }}
    >
      <Label>{label}</Label>
      <NumberInput className="text-right" />
    </NumberField>
  )
}

type FoodFormProps = {
  onSubmitFood: (payload: Food) => void
  submitText: string
  defaultValues?: Food
}

export const FoodForm = ({ onSubmitFood, submitText, defaultValues }: FoodFormProps) => {
  const navigate = useNavigate()

  // ToFix: bug when reopening edited food 1st time, old state from RQ
  console.log('defaultValues', defaultValues)

  const goBack = () => navigate('/foods')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const payload: Food = {
      title: data.title as string,
      nutritionFacts: {
        calories: Number(data.calories),
        fat: Number(data.fat),
        carbs: Number(data.carbs),
        protein: Number(data.protein),
      },
    }
    onSubmitFood(payload)
    goBack()
  }

  return (
    <Form
      className="flex flex-col space-y-2"
      onSubmit={handleSubmit}
    >
      <TextField
        name="title"
        isRequired
        className="mb-4 flex items-center gap-2 border-b border-black"
        aria-label="Title"
        defaultValue={defaultValues?.title}
      >
        <TextInput
          className="flex-1 placeholder:text-black"
          placeholder="Title"
        />
      </TextField>

      {NUTRITION_FACTS.map(({ id, label }) => (
        <NutritionFactInput
          key={id}
          name={id}
          label={label}
          defaultValue={defaultValues?.nutritionFacts[id as keyof NutritionFacts]}
        />
      ))}

      <div className="flex justify-between pt-3">
        <Button
          variant="secondary"
          style="outline"
          onPress={goBack}
        >
          Close
        </Button>
        <Button type="submit">{submitText}</Button>
      </div>
    </Form>
  )
}
