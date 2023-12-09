import React, { FC } from 'react'
import { ICryptos } from '../../models/ICryptos'

interface AssetsListProps {
  items: ICryptos
}
const CryptoList: FC<AssetsListProps> = ({ items }) => {
  const cryptos = items.data.filter((item) => +item.priceUsd >= 0.01)
  console.log(cryptos)
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price</th>
          <th>Market capitalization</th>
          <th>Price change in 24 hours</th>
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
              <td>{item.marketCapUsd}</td>
              <td>{parseFloat(item.changePercent24Hr).toFixed(5)}%</td>
              <td>
                <button>add</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default CryptoList
