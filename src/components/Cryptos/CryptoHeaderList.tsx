import React, { FC } from 'react'
import { ICryptoData } from '../../models/ICryptos'

interface CryptoListProps {
  items: ICryptoData[]
}
const CryptoHeaderList: FC<CryptoListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.name +
            ' ' +
            parseFloat(item.priceUsd)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,') +
            ' $'}
        </div>
      ))}
    </div>
  )
}

export default CryptoHeaderList
