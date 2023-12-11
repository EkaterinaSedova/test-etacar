import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: 'add',
    showModal: false,
    currentCoin: {},
  },
  reducers: {
    toggleModal: (state, { payload }) => {
      state.showModal = payload
    },
    toggleModalType: (state, { payload }) => {
      state.modalType = payload
    },
    setCoin: (state, { payload }) => {
      state.currentCoin = payload
    },
  },
})

export const { toggleModal, toggleModalType, setCoin } = modalSlice.actions
export default modalSlice.reducer
