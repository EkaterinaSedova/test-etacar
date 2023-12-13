import React, { FC, useEffect, useState } from 'react'
import styles from './Crypto.module.scss'
import { ICryptoData } from '../../models/ICryptos'
import { useNavigate } from 'react-router-dom'
import { CRYPTO_ROUTE } from '../../routing/paths'
import ButtonAdd from '../Buttons/ButtonAdd'

interface AssetsListProps {
  items: ICryptoData[]
}
const CryptoList: FC<AssetsListProps> = ({ items }) => {
  const navigate = useNavigate()
  useEffect(() => {
    setCryptos(
      items.filter((item) => {
        return (
          item.marketCapUsd !== null && item.changePercent24Hr !== null && +item.priceUsd >= 0.01
        )
      })
    )
  }, [items])
  const [cryptos, setCryptos] = useState(items.filter((item) => +item.priceUsd >= 0.01))
  const [price, setPrice] = useState('=')
  const [cap, setCap] = useState('=')
  const [percent, setPercent] = useState('=')
  const handlePriceClick = () => {
    switch (price) {
      case '↓': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd))
        setCryptos(sortedCryptos)
        setPrice('↑')
        setCap('=')
        setPercent('=')
        break
      }
      case '=': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd))
        setCryptos(sortedCryptos)
        setPrice('↑')
        setCap('=')
        setPercent('=')
        break
      }
      case '↑': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd))
        setCryptos(sortedCryptos)
        setPrice('↓')
        setCap('=')
        setPercent('=')
        break
      }
    }
  }
  const handleMarketCapClick = () => {
    switch (cap) {
      case '↓': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd))
        setCryptos(sortedCryptos)
        setCap('↑')
        setPrice('=')
        setPercent('=')
        break
      }
      case '=': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd))
        setCryptos(sortedCryptos)
        setCap('↑')
        setPrice('=')
        setPercent('=')
        break
      }
      case '↑': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd))
        setCryptos(sortedCryptos)
        setCap('↓')
        setPrice('=')
        setPercent('=')
        break
      }
    }
  }
  const handleChangePercentClick = () => {
    switch (percent) {
      case '↓': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr))
        setCryptos(sortedCryptos)
        setCap('=')
        setPrice('=')
        setPercent('↑')
        break
      }
      case '=': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr))
        setCryptos(sortedCryptos)
        setCap('=')
        setPrice('=')
        setPercent('↑')
        break
      }
      case '↑': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
        setCryptos(sortedCryptos)
        setCap('=')
        setPrice('=')
        setPercent('↓')
        break
      }
    }
  }
  const handleTrClick = (id: string) => {
    navigate(CRYPTO_ROUTE + `/${id}`)
  }
  return (
    <div className={styles.cryptosContainer}>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Symbol</th>
            <th>Name</th>
            <th
              onClick={() => {
                handlePriceClick()
              }}
            >
              <span>Price</span>
              <span className={styles.sort}>{price}</span>
            </th>
            <th
              onClick={() => {
                handleMarketCapClick()
              }}
            >
              <span>Market capitalization</span>
              <span className={styles.sort}>{cap}</span>
            </th>
            <th
              onClick={() => {
                handleChangePercentClick()
              }}
            >
              <span>Price change in 24 hours</span>
              <span className={styles.sort}>{percent}</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cryptos &&
            cryptos.map((item) => (
              <tr key={item.id}>
                <td></td>
                <td
                  onClick={() => {
                    handleTrClick(item.id)
                  }}
                >
                  {item.symbol}
                </td>
                <td
                  onClick={() => {
                    handleTrClick(item.id)
                  }}
                >
                  {item.name}
                </td>
                <td
                  onClick={() => {
                    handleTrClick(item.id)
                  }}
                >
                  {parseFloat(item.priceUsd)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                  $
                </td>
                <td
                  onClick={() => {
                    handleTrClick(item.id)
                  }}
                >
                  {parseFloat(item.marketCapUsd)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                  $
                </td>
                <td
                  onClick={() => {
                    handleTrClick(item.id)
                  }}
                >
                  {parseFloat(item.changePercent24Hr).toFixed(2)}%
                </td>
                <td>
                  <ButtonAdd coin={item} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoList
