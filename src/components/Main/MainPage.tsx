import React, { useEffect, useState } from 'react'
import CryptoList from '../CryptoList/CryptoList'
import { cryptosAPI } from '../../services/cryptosService'
import styles from '../../Index.module.scss'
const MainPage = () => {
  const limit = 100
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const { data } = cryptosAPI.useFetchCryptosQuery(searchValue)
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
  const handleSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value)
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
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : cryptos ? (
        <>
          <div className={styles.searchContainer}>
            <input
              type="search"
              name="search"
              placeholder="Search..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
            {searchValue && (
              <div className={styles.searchField}>
                {data && data.data.length ? (
                  data.data.map((item) => <p key={item.id}>{item.name}</p>)
                ) : (
                  <p>No results.</p>
                )}
              </div>
            )}
          </div>
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
