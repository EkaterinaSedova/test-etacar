import React, { useEffect, useState } from 'react'
import CryptoList from '../Cryptos/CryptoList'
import { cryptosAPI } from '../../services/cryptosService'
import styles from '../../Index.module.scss'
import { CRYPTO_ROUTE } from '../../routing/paths'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import Modal from '../Modals/Modal'
const MainPage = () => {
  const limit = 100
  const navigate = useNavigate()
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
  const handleSearchClick = (id: string) => {
    navigate(CRYPTO_ROUTE + `/${id}`)
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
                  data.data.map((item) => (
                    <p
                      key={item.id}
                      onClick={() => {
                        handleSearchClick(item.id)
                      }}
                    >
                      {item.name}
                    </p>
                  ))
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
