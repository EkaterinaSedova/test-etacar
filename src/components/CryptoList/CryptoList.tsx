import React, { FC, useState } from 'react'
import { ICryptos } from '../../models/ICryptos'
import styles from './List.module.scss'

interface AssetsListProps {
  items: ICryptos
}
const CryptoList: FC<AssetsListProps> = ({ items }) => {
  const [cryptos, setCryptos] = useState(items.data.filter((item) => +item.priceUsd >= 0.01))
  const [price, setPrice] = useState('desc')
  const [cap, setCap] = useState('desc')
  const [percent, setPercent] = useState('desc')
  const handlePriceClick = () => {
    switch (price) {
      case 'desc': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd))
        setCryptos(sortedCryptos)
        setPrice('asc')
        break
      }
      case 'asc': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd))
        setCryptos(sortedCryptos)
        setPrice('desc')
        break
      }
    }
  }
  const handleMarketCapClick = () => {
    switch (cap) {
      case 'desc': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd))
        setCryptos(sortedCryptos)
        setCap('asc')
        break
      }
      case 'asc': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd))
        setCryptos(sortedCryptos)
        setCap('desc')
        break
      }
    }
  }
  const handleChangePercentClick = () => {
    switch (percent) {
      case 'desc': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr))
        setCryptos(sortedCryptos)
        setPercent('asc')
        break
      }
      case 'asc': {
        const sortedCryptos = cryptos
          .slice()
          .sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
        setCryptos(sortedCryptos)
        setPercent('desc')
        break
      }
    }
  }
  return (
    <div className={styles.cryptosContainer}>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th
              onClick={() => {
                handlePriceClick()
              }}
            >
              Price
            </th>
            <th
              onClick={() => {
                handleMarketCapClick()
              }}
            >
              Market capitalization
            </th>
            <th
              onClick={() => {
                handleChangePercentClick()
              }}
            >
              Price change in 24 hours
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cryptos &&
            cryptos.map((item) => (
              <tr key={item.id}>
                <td>{item.symbol}</td>
                <td>{item.name}</td>
                <td>{parseFloat(item.priceUsd).toFixed(2)}$</td>
                <td>{parseFloat(item.marketCapUsd).toFixed(0)}$</td>
                <td>{parseFloat(item.changePercent24Hr).toFixed(2)}%</td>
                <td>
                  <button>add</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoList
