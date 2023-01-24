import { Line } from '@ant-design/plots'

export default function LinePlot({ data }) {
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
