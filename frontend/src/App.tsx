import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '#components/layout'

import Calculator from '#pages/calculator'
import Diary from '#pages/diary'
import Profile from '#pages/profile'
import Foods from '#pages/foods/foods'
import AddFoodModal from '#pages/foods/add-food-modal'
import EditFoodModal from '#pages/foods/edit-food-modal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Calculator /> },
      {
        path: 'foods',
        element: <Foods />,
        children: [
          { path: 'add-food', element: <AddFoodModal /> },
          { path: ':foodId/edit', element: <EditFoodModal /> },
        ],
      },
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
