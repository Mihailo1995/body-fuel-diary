import { Link, Outlet } from 'react-router-dom'

import { Container } from '#components/container'
import { Icon } from '#components/icon'
import { Loader } from '#components/loader'

import { useDeleteFood, useGetAllFoods } from '#hooks/food'

import AddFoodModal from '#pages/foods/add-food-modal'

import { Food } from '#types/food.types'

const Foods = () => {
  const { data: foods, isLoading /* error, isError */ } = useGetAllFoods()
  const { mutate: deleteFood } = useDeleteFood()
  console.log('foods', foods)

  return (
    <>
      <div>
        <Container className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Foods</h1>
          <AddFoodModal />
        </Container>

        <div>
          {isLoading ? (
            <Loader />
          ) : (
            foods.map((food: Food) => (
              <div
                key={food._id}
                className="flex items-center justify-between gap-4 border-b border-slate-300 px-5 py-3 first:border-t"
              >
                <span className="flex-1 truncate whitespace-nowrap text-left hover:text-orange-700">
                  {food.title}
                </span>
                <div className="flex items-center gap-8">
                  <span className="min-w-fit text-sm">{food.nutritionFacts.calories} kcal</span>
                  <Icon
                    name="trash"
                    size="md"
                    className="cursor-pointer text-red-700"
                    onClick={() => deleteFood(food._id)}
                  />
                  <Link to={`/foods/${food._id}/edit`}>
                    <Icon
                      name="pencil"
                      size="md"
                    />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Outlet />
    </>
  )
}

export default Foods