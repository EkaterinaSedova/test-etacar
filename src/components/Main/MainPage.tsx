import React, { useEffect, useState } from 'react'
import CryptoList from '../Cryptos/CryptoList'
import { cryptosAPI } from '../../services/cryptosService'
import styles from '../../Index.module.scss'
import Header from '../Header/Header'
import Modal from '../Modals/Modal'
import Search from "../Search/Search";
const MainPage = () => {
  const limit = 100
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const {
    data: cryptos,
    error,
    isLoading,
    refetch,
  } = cryptosAPI.useFetchAllCryptosQuery({ limit, offset })
  const isAvailable = () => {
    if (cryptos && cryptos.data.length < limit) return false
    else return true
  }
  const handleNextClick = () => {
    setPage(page + 1)
  }
  const handlePrevClick = () => {
    setPage(page - 1)
  }
  useEffect(() => {
    const newOffset = limit * (page - 1)
    setOffset(newOffset)
    refetch()
  }, [page])

  return (
    <div className={styles.app}>
      <Modal />
      <Header />
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : cryptos ? (
        <>
          <Search />
          <CryptoList items={[...cryptos.data]} />
          {page > 1 ? (
            <button onClick={() => handlePrevClick()}>prev</button>
          ) : (
            <button disabled>prev</button>
          )}
          {isAvailable() ? (
            <button onClick={() => handleNextClick()}>next</button>
          ) : (
            <button disabled>next</button>
          )}
        </>
      ) : null}
    </div>
  )
}

export default MainPage
