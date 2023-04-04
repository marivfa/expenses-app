import { Line } from '@ant-design/plots'

export default function LinePlot({ data, currency }) {
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'amount',
    xAxis: {
      tickCount: 5,
    },
    meta: {
      date: {
        alias: 'Date',
      },
      amount: {
        alias: `Amount ${currency}`,
      },
    },
    colorField: 'type',
    color: ['#1864AB', '#1971C2', '#1C7ED6','#228BE6','#339AF0','#4DABF7','#74C0FC','#A5D8FF'],
  }

  return <Line {...config} />
}
