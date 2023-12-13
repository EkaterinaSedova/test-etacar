import React, { useState } from 'react'
import { cryptosAPI } from '../../services/cryptosService'
import { useNavigate, useParams } from 'react-router-dom'
import globalStyles from '../../Index.module.scss'
import styles from './Crypto.module.scss'
import { MAIN_ROUTE } from '../../routing/paths'
import AreaChart from '../Charts/AreaChart'
import moment from 'moment'
import ButtonAdd from '../Buttons/ButtonAdd'
import Modal from '../Modals/Modal'
import OtherButton from '../Buttons/OtherButton'
import Header from '../Header/Header'

const SingleCrypto = () => {
  const [interval] = useState('m5')
  const { id } = useParams()
  const navigate = useNavigate()
  const [end, setEnd] = useState(moment().valueOf())
  const [start, setStart] = useState(moment().subtract(1, 'hour').valueOf())
  const historyQuery = id
    ? cryptosAPI.useFetchCryptoHistoryQuery({ id: id, interval: interval, start: start, end: end })
    : { data: undefined }
  const histories = historyQuery.data
  const handleSelectChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === 'hour') setStart(moment().subtract(1, 'hour').valueOf())
    if (value === '12 hours') setStart(moment().subtract(12, 'hours').valueOf())
    if (value === '1 day') setStart(moment().subtract(1, 'day').valueOf())
    setEnd(moment().valueOf())
  }
  const handleBackClick = () => {
    navigate(MAIN_ROUTE)
  }
  const { data, isLoading, error } = id
    ? cryptosAPI.useFetchOneCryptoQuery(id)
    : { data: undefined, isLoading: false, error: null }
  return (
    <div className={globalStyles.app}>
      <Modal />
      <Header />
      {error ? (
        <div className={styles.loader}>
          <div>Oh no, there was an error</div>
          <div
            onClick={() => {
              handleBackClick()
            }}
          >
            <OtherButton text={'Go back'} />
          </div>
        </div>
      ) : isLoading ? (
        <>
          <div className={styles.loader}>Loading...</div>
        </>
      ) : data ? (
        <>
          <div className={styles.coinContainer}>
            <div>
              <div className={styles.singleCoinNameContainer}>
                <div className={styles.singleCoinName}>
                  {data.data.rank}. {data.data.name}
                </div>
                <div className={styles.singleCoinSymbol}>{data.data.symbol}</div>
              </div>
              <div className={styles.singleCoinInfoContainer}>
                <div className={styles.singleCoinInfoHeader}>Total supply:</div>
                <div>{parseFloat(data.data.supply).toLocaleString() + ' ' + data.data.symbol}</div>
              </div>
              <div className={styles.singleCoinInfoContainer}>
                <div className={styles.singleCoinInfoHeader}>Max supply:</div>
                <div>
                  {data.data.maxSupply ? (
                    parseFloat(data.data.maxSupply).toLocaleString() + ' ' + data.data.symbol
                  ) : (
                    <>No info.</>
                  )}
                </div>
              </div>
              <div className={styles.singleCoinInfoContainer}>
                <div className={styles.singleCoinInfoHeader}>Total price: </div>
                <div>
                  {parseFloat(data.data.priceUsd)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                  $
                </div>
              </div>
              <div className={styles.singleCoinInfoContainer}>
                <div className={styles.singleCoinInfoHeader}>Market Cap: </div>
                <div>
                  {data.data.marketCapUsd ? (
                    parseFloat(data.data.marketCapUsd)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' $'
                  ) : (
                    <>No info.</>
                  )}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <ButtonAdd coin={data.data} />
              </div>
              <div className={styles.singleCoinChartSelect}>
                <div className={styles.singleCoinInfoHeader}>Select a range for chart:</div>
                <select onChange={handleSelectChange}>
                  <option id={'hour'}>hour</option>
                  <option id={'12 hours'}>12 hours</option>
                  <option id={'1 day'}>1 day</option>
                </select>
              </div>
            </div>
            <div className={styles.chart}>
              {histories ? (
                <AreaChart histories={histories.data} />
              ) : (
                <div className={styles.loader}>History is not available.</div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              handleBackClick()
            }}
          >
            <OtherButton text={'Go back'} />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default SingleCrypto
