import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/plots'
import { GetAll } from '../commons/Api'

export default function LinePlot() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    setIsLoading(true)
    GetAll(`dashboard/by_month`).then(
      res => {
        setData(res)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }

  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'amount',
    xAxis: {
      tickCount: 5,
    },
  }

  return <Line {...config} />
}
