import {
  Dialog,
  DialogTrigger,
  Form,
  Label,
  Modal,
  ModalOverlay,
  NumberField,
  TextField,
} from 'react-aria-components'

import { Button } from '#components/button'
import { useModal } from '#components/modal'
import { NumberInput, TextInput } from '#components/input'
import { Icon } from '#components/icon'

import { NUTRITION_FACTS } from '#helpers/constants'

import { useCreateFood } from '#hooks/food'

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

const AddFoodModal = () => {
  const addFoodModal = useModal()
  const { mutate: createFood } = useCreateFood()

  const handleCreateFood = (e: React.FormEvent<HTMLFormElement>) => {
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
    createFood(payload)
  }

  return (
    <DialogTrigger>
      <Button onPress={addFoodModal.open}>Add food</Button>

      <ModalOverlay
        isDismissable
        className="fixed inset-0 flex items-center justify-center bg-black/50"
      >
        <Modal
          className="relative min-w-80 rounded-lg border-2 border-orange-700 bg-white p-5 pt-3"
          isOpen={addFoodModal.isOpen}
          onOpenChange={addFoodModal.setIsOpen}
        >
          <Dialog className="outline-none">
            {({ close }) => (
              <>
                <div className="mb-3 flex items-center justify-between text-xl">
                  <h3 className="">Add new food</h3>
                  <button
                    className="p-1"
                    onClick={close}
                  >
                    <Icon
                      name="x"
                      weight="bold"
                    />
                  </button>
                </div>
                <Form
                  className="flex flex-col space-y-2"
                  onSubmit={handleCreateFood}
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
                      onPress={close}
                    >
                      Close
                    </Button>
                    <Button type="submit">Add</Button>
                  </div>
                </Form>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}

export default AddFoodModal
