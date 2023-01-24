import { Column } from '@ant-design/plots'

export default function ColumnPlot({ data }) {
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
