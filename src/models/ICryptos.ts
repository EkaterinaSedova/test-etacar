export interface ICryptoData {
  img: string | undefined
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string | null
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
}

export interface ICryptos {
  data: ICryptoData[]
  timestamp: string
}

export interface ICrypto {
  data: ICryptoData
  timestamp: string
}

export interface IHistory {
  data: IHistoryData[]
  timestamp: string
}

export interface IHistoryData {
  priceUsd: string
  time: number
  circulatingSupply: string
  date: string
}
