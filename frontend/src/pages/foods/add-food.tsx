import { useNavigate } from 'react-router-dom'

import { Container } from '#components/container'
import { FoodForm } from '#components/food-form'
import { Icon } from '#components/icon'

import { useCreateFood } from '#hooks/food'

const AddFood = () => {
  const navigate = useNavigate()
  const { mutate: createFood } = useCreateFood()

  return (
    <Container>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl">Add new food</h3>
        <button
          className="p-1"
          onClick={() => navigate('/foods')}
        >
          <Icon
            name="x"
            weight="bold"
          />
        </button>
      </div>
      <FoodForm
        onSubmitFood={createFood}
        submitText="Add"
      />
    </Container>
  )
}

export default AddFood
