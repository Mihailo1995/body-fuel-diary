import { Form, Label, NumberField, TextField } from 'react-aria-components'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '#components/button'
import { NumberInput, TextInput } from '#components/input'
import { Container } from '#components/container'
import { Icon } from '#components/icon'

import { NUTRITION_FACTS } from '#helpers/constants'

import { useGetFood, useUpdateFood } from '#hooks/food'

import { Food } from '#types/food.types'

type NutritionFactInputProps = {
  name: string
  label: string
}

const NutritionFactInput = ({ name, label }: NutritionFactInputProps) => {
  return (
    <NumberField
      name={name}
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

const EditFood = () => {
  const navigate = useNavigate()
  const { foodId } = useParams()
  const { data: food } = useGetFood(foodId)
  const { mutate: updateFood } = useUpdateFood(foodId)

  console.log('food', food)

  const goBack = () => navigate('/foods')

  const handleUpdateFood = (e: React.FormEvent<HTMLFormElement>) => {
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
    updateFood(payload)
    goBack()
  }

  return (
    <Container>
      <div className="mb-3 flex items-center justify-between text-xl">
        <h3 className="">Edit food</h3>
        <button
          className="p-1"
          onClick={goBack}
        >
          <Icon
            name="x"
            weight="bold"
          />
        </button>
      </div>
      <Form
        className="flex flex-col space-y-2"
        onSubmit={handleUpdateFood}
      >
        <TextField
          name="title"
          isRequired
          className="mb-4 flex items-center gap-2 border-b border-black"
          aria-label="Title"
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
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Container>
  )
}

export default EditFood
