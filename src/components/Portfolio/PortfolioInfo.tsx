import React from 'react'
import { toggleModal, toggleModalType } from '../../store/ModalSlice'
import { useDispatch } from 'react-redux'
import styles from './Portfolio.module.scss'

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
    <div className={styles.portfolioContainer}>
      <div className={styles.portfolioTitle}>Your portfolio: </div>
      <div className={styles.portfolioPrice}>
        <span className={styles.portfolioPriceNumber}>{portfolioPrice.toFixed(2)}</span>
        <span className={styles.portfolioPriceUsd}>USD</span>
      </div>
      <div
        className={styles.portfolioClickMe}
        onClick={() => {
          handleClick()
        }}
      >
        Click here to know more about your portfolio!
      </div>
    </div>
  )
}

export default PortfolioInfo
