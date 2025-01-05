import { Link } from 'react-router-dom'

import { Container } from '#components/container'
import { Icon } from '#components/icon'
import { Loader } from '#components/loader'
import { Button } from '#components/button'
import { DeleteFoodModal } from '#components/delete-food-modal'

import { useGetAllFoods } from '#hooks/food'

import { Food } from '#types/food.types'

const Foods = () => {
  const { data: foods, isLoading /* error, isError */ } = useGetAllFoods()
  console.log('foods', foods)

  return (
    <div>
      <Container className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Foods</h1>
        {/* ToFix: Add food button doesn't always work */}
        <Link to="/foods/add">
          <Button>Add food</Button>
        </Link>
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
              <span className="flex-1 truncate whitespace-nowrap text-left">{food.title}</span>
              <div className="flex items-center gap-8">
                <span className="min-w-fit text-sm">{food.nutritionFacts.calories} kcal</span>
                <DeleteFoodModal
                  foodId={food._id}
                  foodTitle={food.title}
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
  )
}

export default Foods
