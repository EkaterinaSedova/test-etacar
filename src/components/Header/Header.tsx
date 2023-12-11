import React from 'react'
import { cryptosAPI } from '../../services/cryptosService'
import CryptoHeaderList from '../Cryptos/CryptoHeaderList'
import PortfolioInfo from '../Portfolio/PortfolioInfo'
import styles from './Header.module.scss'

const Header = () => {
  const {
    data: cryptos,
    error,
    isLoading,
  } = cryptosAPI.useFetchAllCryptosQuery({ limit: 3, offset: 0 })
  return (
    <div className={styles.headerContainer}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : cryptos ? (
        <CryptoHeaderList items={cryptos.data} />
      ) : (
        <></>
      )}
      <PortfolioInfo />
    </div>
  )
}

export default Header
