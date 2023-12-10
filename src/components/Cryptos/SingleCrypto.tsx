import React, { useState } from 'react'
import { cryptosAPI } from '../../services/cryptosService'
import { useNavigate, useParams } from 'react-router-dom'
import globalStyles from '../../Index.module.scss'
import styles from './Crypto.module.scss'
import { MAIN_ROUTE } from '../../routing/paths'
import AreaChart from '../Charts/AreaChart'

const SingleCrypto = () => {
  const [interval, setInterval] = useState('d1')
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: histories } = id
    ? cryptosAPI.useFetchCryptoHistoryQuery({ id: id, interval: interval })
    : { data: undefined }
  const handleSelectChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === 'hour') setInterval('h1')
    if (value === '12 hours') setInterval('h12')
    if (value === '1 day') setInterval('d1')
  }
  const handleBackClick = () => {
    navigate(MAIN_ROUTE)
  }
  const { data, isLoading, error } = id
    ? cryptosAPI.useFetchOneCryptoQuery(id)
    : { data: undefined, isLoading: false, error: null }
  return (
    <div className={globalStyles.app}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <div className={styles.coinContainer}>
            <h1>{data.data.name}</h1>
            <button className={styles.coinButton}>add</button>
            <div>
              <div className={styles.coinHeader}>Symbol:</div>
              <div>{data.data.symbol}</div>
            </div>
            <div>
              <div className={styles.coinHeader}>Rank:</div>
              <div>{data.data.rank}</div>
            </div>
            <div>
              <div className={styles.coinHeader}>Supply:</div>
              <div>{parseFloat(data.data.supply).toLocaleString() + ' ' + data.data.symbol}</div>
            </div>
            <div>
              <div className={styles.coinHeader}>Price: </div>
              <div>
                {parseFloat(data.data.priceUsd)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                $
              </div>
            </div>
            <div>
              <div className={styles.coinHeader}>Market Capitalization: </div>
              <div>
                {parseFloat(data.data.marketCapUsd)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                $
              </div>
            </div>
            <div>
              <div className={styles.coinHeader}>Max supply:</div>
              <div>
                {data.data.maxSupply ? (
                  parseFloat(data.data.maxSupply).toLocaleString() + ' ' + data.data.symbol
                ) : (
                  <>No info.</>
                )}
              </div>
            </div>
            <div>
              <select onChange={handleSelectChange}>
                <option id={'1 day'}>1 day</option>
                <option id={'12 hours'}>12 hours</option>
                <option id={'hour'}>hour</option>
              </select>
            </div>
            {histories ? <AreaChart histories={histories.data} /> : <>History is not available.</>}
          </div>
        </>
      ) : null}
      <button
        onClick={() => {
          handleBackClick()
        }}
      >
        back
      </button>
    </div>
  )
}

export default SingleCrypto
