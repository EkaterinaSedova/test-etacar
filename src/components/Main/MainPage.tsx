import React from 'react'
import CryptoList from '../CryptoList/CryptoList'
import { cryptosAPI } from '../../services/cryptosService'
import styles from '../../Index.module.scss'
const MainPage = () => {
  const { data: cryptos, error, isLoading } = cryptosAPI.useFetchAllCryptosQuery(3)
  return (
    <div className={styles.app}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : cryptos ? (
        <>
          <CryptoList items={cryptos} />
        </>
      ) : null}
    </div>
  )
}

export default MainPage
