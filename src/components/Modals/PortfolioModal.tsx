import React, { FC, useState } from 'react'
import styles from './Modal.module.scss'
import ButtonDelete from '../Buttons/ButtonDelete'
interface PortfolioProps {
  closeModal: () => void
}

interface Coin {
  coinName: string
  price: number
  amount: number
}
const PortfolioModal: FC<PortfolioProps> = ({ closeModal }) => {
  const portfolioItem = localStorage.getItem('portfolio')
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }
  const [coins, setCoins] = useState(portfolioItem ? JSON.parse(portfolioItem) : null)
  const handleDeleteClick = (coinToDelete: Coin) => {
    const updatedCoins = coins.filter((coin: Coin) => coin !== coinToDelete)
    setCoins(updatedCoins)
  }
  return (
    <div className={styles.modal} onClick={handleModalClick}>
      <div className={styles.modalContent}>
        <div onClick={closeModal} className={styles.closeButton}>
          ✖
        </div>
        <div className={styles.modalHeader}>
          <div className={styles.title}>Your portfolio: </div>
        </div>
        {coins.length && Array.isArray(coins) ? (
          <div className={styles.modalBody}>
            {coins.map((coin, index) => (
              <div className={styles.modalCoin} key={index}>
                <div className={styles.modalCoinName}>{coin.coinName}</div>{' '}
                <div>
                  {(parseFloat(coin.price) * parseFloat(coin.amount))
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                  $
                </div>
                <div
                  onClick={() => {
                    handleDeleteClick(coin)
                  }}
                >
                  <ButtonDelete coin={coin} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No coins in portfolio.</div>
        )}
      </div>
    </div>
  )
}

export default PortfolioModal
