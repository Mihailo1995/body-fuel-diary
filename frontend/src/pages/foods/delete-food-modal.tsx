import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components'
import { Link, useParams } from 'react-router-dom'

import { Button } from '#components/button'
import { useModal } from '#components/modal'
import { Icon } from '#components/icon'

import { useDeleteFood } from '#hooks/food'

const DeleteFoodModal = () => {
  const { foodId } = useParams()
  const deleteFoodModal = useModal()
  const { mutate: deleteFood } = useDeleteFood()

  return (
    <DialogTrigger>
      <Link to={`/foods/${foodId}/delete`}>
        <Button onPress={deleteFoodModal.open}>Delete food</Button>
      </Link>

      <ModalOverlay
        isDismissable
        className="fixed inset-0 flex items-center justify-center bg-black/50"
      >
        <Modal
          className="relative min-w-80 rounded-lg border-2 border-orange-700 bg-white p-5 pt-3"
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

                <p>Are you sure you want to delete this food?</p>

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

export default DeleteFoodModal
