import React, { FC } from 'react'
import { ICryptoData } from '../../models/ICryptos'
import styles from './Crypto.module.scss'

interface CryptoListProps {
  items: ICryptoData[]
}
const CryptoHeaderList: FC<CryptoListProps> = ({ items }) => {
  return (
    <div>
      <div className={styles.headerCoinTitle}>Trending:</div>
      {items.map((item) => (
        <div key={item.id} className={styles.headerCoinContainer}>
          <div className={styles.headerCoinName}>
            <div className={styles.headerCoinRank}>{item.rank}.</div>
            {item.symbol}
          </div>
          <div className={styles.headerCoinPrice}>
            {parseFloat(item.priceUsd)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' $'}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CryptoHeaderList
