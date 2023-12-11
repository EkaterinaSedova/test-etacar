import React, { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { IHistoryData } from '../../models/ICryptos'
import moment from 'moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

interface AreaChartProps {
  histories: IHistoryData[]
}
const AreaChart: FC<AreaChartProps> = ({ histories }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  }
  const data = {
    labels: histories.map((history) => moment(history.date).format('DD MMMM HH:mm')),
    datasets: [
      {
        fill: true,
        label: 'Price (USD)',
        data: histories.map((history) => history.priceUsd),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return <Line options={options} data={data} />
}

export default AreaChart
