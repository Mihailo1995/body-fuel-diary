import {
  Button as RAButton,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components'

import { Button } from '#components/button'
import { useModal } from '#components/modal'
import { Icon } from '#components/icon'

import { useDeleteFood } from '#hooks/food'

import { Food } from '#types/food.types'

type DeleteFoodModalProps = {
  foodId: Food['_id']
  foodTitle: Food['title']
}

export const DeleteFoodModal = ({ foodId, foodTitle }: DeleteFoodModalProps) => {
  const deleteFoodModal = useModal()
  const { mutate: deleteFood } = useDeleteFood()

  return (
    <DialogTrigger>
      <RAButton onPress={deleteFoodModal.open}>
        <Icon
          name="trash"
          size="md"
          className="cursor-pointer text-red-700"
          onClick={deleteFoodModal.open}
        />
      </RAButton>

      <ModalOverlay
        isDismissable
        className="fixed inset-0 flex items-center justify-center bg-black/50"
      >
        <Modal
          className="relative w-80 rounded-lg border border-slate-900 bg-white p-5 pt-3"
          isOpen={deleteFoodModal.isOpen}
          onOpenChange={deleteFoodModal.setIsOpen}
        >
          <Dialog className="outline-none">
            {({ close }) => (
              <>
                <div className="mb-3 flex items-center justify-between text-xl">
                  <h3 className="">Delete food</h3>
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

                <p>
                  Are you sure you want to delete{' '}
                  <strong className="font-semibold">{foodTitle}</strong>?
                </p>

                <div className="flex justify-between pt-3">
                  <Button
                    variant="secondary"
                    style="outline"
                    onPress={close}
                  >
                    Close
                  </Button>
                  <Button
                    onPress={() => {
                      deleteFood(foodId)
                      close()
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
