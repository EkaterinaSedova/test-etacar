import React, { FC } from 'react'
import styles from './Button.module.scss'
interface ButtonProps {
  coin: Coin
  amount?: number
}

interface Coin {
  coinName: string
  price: number
  amount: number
}

const ButtonDelete: FC<ButtonProps> = ({ coin }) => {
  const handleClick = () => {
    let coins = []
    const portfolioItem = localStorage.getItem('portfolio')
    if (portfolioItem) {
      coins = JSON.parse(portfolioItem)
    }
    const index = coins.findIndex(
      (crypto: Coin) =>
        crypto.coinName === coin.coinName &&
        crypto.price === coin.price &&
        crypto.amount === coin.amount
    )
    if (index !== -1) {
      coins.splice(index, 1)
    }
    if (coins.length) {
      const newPortfolio = JSON.stringify(coins)
      localStorage.setItem('portfolio', newPortfolio)
    }
    else localStorage.removeItem('portfolio')
  }
  return (
    <div
      className={styles.deleteButtonContainer}
      onClick={() => {
        handleClick()
      }}
    >
      <div>Delete</div>
    </div>
  )
}

export default ButtonDelete
