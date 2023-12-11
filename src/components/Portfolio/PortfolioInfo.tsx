import React from 'react'
import { toggleModal, toggleModalType } from '../../store/ModalSlice'
import { useDispatch } from 'react-redux'
//function calculatePercentageDifference(oldValue: number, newValue: number) {
//    return ((newValue - oldValue) / oldValue) * 100;
//}
const PortfolioInfo = () => {
  const portfolioItem = localStorage.getItem('portfolio')
  const coins = portfolioItem ? JSON.parse(portfolioItem) : null
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(toggleModalType('portfolio'))
    dispatch(toggleModal(true))
  }
  const portfolioPrice =
    coins && Array.isArray(coins)
      ? coins.reduce(
          (total: number, coin: { coinName: string; price: number; amount: number }) =>
            total + coin.price * coin.amount,
          0
        )
      : 0
  return (
    <div
      onClick={() => {
        handleClick()
      }}
    >
      Portfolio: {portfolioPrice || '0'} USD
    </div>
  )
}

export default PortfolioInfo
