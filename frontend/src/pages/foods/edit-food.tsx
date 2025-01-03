import { useNavigate, useParams } from 'react-router-dom'

import { Container } from '#components/container'
import { FoodForm } from '#components/food-form'
import { Icon } from '#components/icon'
import { Loader } from '#components/loader'

import { useGetFood, useUpdateFood } from '#hooks/food'

const EditFood = () => {
  const navigate = useNavigate()
  const { foodId } = useParams()
  const { data: food, isLoading } = useGetFood(foodId)
  const { mutate: updateFood } = useUpdateFood(foodId)

  console.log('/ / food', food)

  return (
    <Container>
      <div className="mb-3 flex items-center justify-between text-xl">
        <h3 className="">Edit food</h3>
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
      {isLoading ? (
        <Loader />
      ) : (
        <FoodForm
          onSubmitFood={updateFood}
          submitText="Save"
          defaultValues={food}
        />
      )}
    </Container>
  )
}

export default EditFood
