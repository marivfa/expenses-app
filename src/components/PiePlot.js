import React, { useEffect, useState } from 'react'
import { Pie } from '@ant-design/plots'
import { GetAll } from '../commons/Api'

export default function PiePlot() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    setIsLoading(true)
    GetAll(`dashboard/by_type`).then(
      res => {
        let arrTMP = []
        Object.entries(res).forEach(([key, value]) => {
          let obj = {
            type: key,
            value: value,
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
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}\n Amount: {value}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  }

  return <Pie {...config} />
}
