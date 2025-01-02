import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '#components/layout'

import Calculator from '#pages/calculator'
import Diary from '#pages/diary'
import Profile from '#pages/profile'
import Foods from '#pages/foods/foods'
import AddFood from '#pages/foods/add-food'
import EditFood from '#pages/foods/edit-food'
import DeleteFoodModal from '#pages/foods/delete-food-modal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Calculator /> },

      { path: 'foods', element: <Foods /> },
      { path: 'foods/add-food', element: <AddFood /> },
      { path: 'foods/:foodId/edit', element: <EditFood /> },
      { path: 'foods/:foodId/delete', element: <DeleteFoodModal /> },

      { path: 'diary', element: <Diary /> },

      { path: 'profile', element: <Profile /> },

      { path: '*', element: <h5>Page not found</h5> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
