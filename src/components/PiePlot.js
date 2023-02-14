import { Pie } from '@ant-design/plots'

export default function PiePlot({ data, currency }) {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#228be6', '#FAB005', '#000000'],
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
