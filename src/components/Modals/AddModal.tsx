import React, { FC, useState } from 'react'
import styles from './Modal.module.scss'
import { useSelector } from 'react-redux'
import ButtonAdd from '../Buttons/ButtonAdd'

interface AddProps {
  closeModal: () => void
}

const AddModal: FC<AddProps> = ({ closeModal }) => {
  const { currentCoin } = useSelector(({ modal }) => modal)
  const [amount, setAmount] = useState(1)

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(value))
  }
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleAddClick = () => {
    alert('Successfully added!')
    closeModal()
  }

  return (
    <div className={styles.modal} onClick={handleModalClick}>
      <div className={styles.modalContent}>
        <div onClick={closeModal} className={styles.closeButton}>
          ✖
        </div>
        <div className={styles.modalHeader}>
          <div className={styles.title}>Add a coin:</div>
        </div>
        <div>
          <div className={styles.modalProperty}>
            <span className={styles.modalCoinName}>Coin:</span>
            <span>{currentCoin.symbol}</span>
          </div>
          <div className={styles.modalProperty}>
            <span className={styles.modalCoinName}>Price:</span>
            <span>
              {parseFloat(currentCoin.priceUsd)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
              $
            </span>
          </div>
          <div className={styles.modalProperty}>
            <span className={styles.modalCoinName}>Amount:</span>
            <input
              className={styles.modalInput}
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Input amount..."
              value={amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className={styles.modalFooter}
          onClick={() => {
            handleAddClick()
          }}
        >
          <ButtonAdd coin={currentCoin} amount={amount} />
        </div>
      </div>
    </div>
  )
}

export default AddModal
