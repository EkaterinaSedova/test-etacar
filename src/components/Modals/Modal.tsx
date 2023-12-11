import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../store/ModalSlice'
import AddModal from './AddModal'
import PortfolioModal from './PortfolioModal'

const Modal = () => {
  const dispatch = useDispatch()
  const { showModal, modalType } = useSelector(({ modal }) => modal)
  const closeModal = () => {
    dispatch(toggleModal(false))
  }
  return showModal ? (
    <>
      <div onClick={closeModal} />
      {modalType === 'add' ? (
        <AddModal closeModal={closeModal} />
      ) : (
        <PortfolioModal closeModal={closeModal} />
      )}
    </>
  ) : (
    <></>
  )
}

export default Modal
