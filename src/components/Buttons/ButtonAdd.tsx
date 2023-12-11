import React, { FC } from 'react'
import styles from './Button.module.scss'
import { setCoin, toggleModal, toggleModalType } from '../../store/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ICryptoData } from '../../models/ICryptos'
interface ButtonProps {
  coin: ICryptoData
  amount?: number
}
const ButtonAdd: FC<ButtonProps> = ({ coin, amount }) => {
  const dispatch = useDispatch()
  const { showModal } = useSelector(({ modal }) => modal)
  const handleClick = () => {
    if (showModal) {
      let coins = []
      const portfolioItem = localStorage.getItem('portfolio')
      if (portfolioItem) {
        coins = JSON.parse(portfolioItem)
      }
      const coinToAdd = {
        coinName: coin.id,
        price: coin.priceUsd,
        amount: amount,
      }
      coins.push(coinToAdd)
      const coinsString = JSON.stringify(coins)
      localStorage.setItem('portfolio', coinsString)
    } else {
      dispatch(setCoin(coin))
      dispatch(toggleModalType('add'))
      dispatch(toggleModal(true))
    }
  }
  return (
    <div
      className={styles.buttonContainer}
      onClick={() => {
        handleClick()
      }}
    >
      <div>Add</div>
    </div>
  )
}

export default ButtonAdd
