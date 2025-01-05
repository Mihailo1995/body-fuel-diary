import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components'

import { Button } from '#components/button'
import { Loader } from '#components/loader'
import { useModal } from '#components/modal'
import { Icon } from '#components/icon'

import { useGetAllFoods } from '#hooks/food'

import { Food } from '#types/food.types'

type ImportFoodModalProps = {
  onImportFood: (food: Food) => void
}

export const ImportFoodModal = ({ onImportFood }: ImportFoodModalProps) => {
  const importFoodModal = useModal()
  const { data: foods, isLoading /* error, isError */ } = useGetAllFoods()

  return (
    <DialogTrigger>
      <Button onPress={importFoodModal.open}>Import food</Button>

      <ModalOverlay
        isDismissable
        className="fixed inset-0 flex items-center justify-center bg-black/50"
      >
        <Modal
          className="relative w-80 rounded-lg border border-slate-900 bg-white p-5 pt-3"
          isOpen={importFoodModal.isOpen}
          onOpenChange={importFoodModal.setIsOpen}
        >
          <Dialog className="outline-none">
            {({ close }) => (
              <>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl">Select food to import</h3>
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
                <div className="mb-4 flex flex-col">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    foods.map((food: Food) => (
                      <button
                        key={food._id}
                        className="flex items-center justify-between gap-4 border-b border-slate-300 p-1 first:border-t hover:text-orange-700"
                        onClick={() => onImportFood(food)}
                      >
                        <span className="flex-1 truncate whitespace-nowrap text-left">
                          {food.title}
                        </span>
                        <span className="text-sm">{food.nutritionFacts.calories} kcal</span>
                      </button>
                    ))
                  )}
                </div>
                <Button
                  variant="secondary"
                  style="outline"
                  onPress={close}
                >
                  Close
                </Button>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
