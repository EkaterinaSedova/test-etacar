import React, { useState } from 'react'
import styles from './Search.module.scss'
import { CRYPTO_ROUTE } from '../../routing/paths'
import { cryptosAPI } from '../../services/cryptosService'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data } = cryptosAPI.useFetchCryptosQuery(searchValue)
  const navigate = useNavigate()
  const handleSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value)
  }
  const handleSearchClick = (id: string) => {
    navigate(CRYPTO_ROUTE + `/${id}`)
  }
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
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
              <div
                key={item.id}
                className={styles.searchItem}
                onClick={() => {
                  handleSearchClick(item.id)
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <p>No results.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
