import { Column } from '@ant-design/plots'

export default function ColumnPlot({ data, currency }) {
  const config = {
    data,
    xField: 'category',
    yField: 'amount',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    seriesField: 'category',
    meta: {
      category: {
        alias: 'Category',
      },
      amount: {
        alias: `Amount ${currency}`,
      },
    },
    colorField: 'type',
    color: ['#1864AB', '#1971C2', '#1C7ED6','#228BE6','#339AF0','#4DABF7','#74C0FC','#A5D8FF'],
    legend: {
      layout: 'horizontal',
      position: 'top'
    }
  }

  return <Column {...config} />
}
