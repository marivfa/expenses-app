import React, { useEffect, useState } from 'react'
import { Column } from '@ant-design/plots'
import { GetAll } from '../commons/Api'

export default function ColumnPlot() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    setIsLoading(true)
    GetAll(`dashboard/by_category`).then(
      res => {
        let arrTMP = []
        Object.entries(res).forEach(([key, value]) => {
          let obj = {
            category: key,
            amount: value,
          }
          arrTMP.push(obj)
        })

        setData(arrTMP)

        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }

  const config = {
    data,
    title: {
      visible: true,
      text: 'Your Stats',
    },
    xField: 'category',
    yField: 'amount',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      category: {
        alias: 'Category',
      },
      amount: {
        alias: 'Amount',
      },
    },
  }

  return <Column {...config} />
}
