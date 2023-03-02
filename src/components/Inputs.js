import { Select, NumberInput, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

import { CalendarEvent } from 'tabler-icons-react'

const DEFAULT_RADIUS = 'xl'

export const InputText = ({
  label,
  placeholder,
  radius = DEFAULT_RADIUS,
  field,
}) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      radius={radius}
      {...field}
    />
  )
}

export const InputDate = ({
  label,
  placeholder,
  radius = DEFAULT_RADIUS,
  field,
}) => {
  return (
    <DatePicker
      label={label}
      placeholder={placeholder}
      radius={radius}
      icon={<CalendarEvent size={16} />}
      {...field}
    />
  )
}

export const InputNumber = ({
  label,
  min = 0,
  radius = DEFAULT_RADIUS,
  field,
}) => {
  return (
    <NumberInput
      label={label}
      radius={radius}
      min={min}
      precision={2}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      formatter={value =>
        !Number.isNaN(parseFloat(value))
          ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
          : '$ '
      }
      {...field}
    />
  )
}

export const InputSelect = ({
  label,
  placeholder,
  radius = DEFAULT_RADIUS,
  data,
  field,
}) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      searchable
      nothingFound="No options"
      radius={radius}
      data={data}
      value={field.value}
      onChange={value => field.onChange(value)}
      onBlur={field.onBlur}
      {...field}
    />
  )
}
