import clsx from 'clsx'
import { useState } from 'react'
import { View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import CustomText from './custom-text'
import { Controller, useFormContext } from 'react-hook-form'

type TDatePickerValue = {
  date: Date
  time: Date
}

type CustomDatePickerProps = {
  customClassName?: string
  onChange: (props: TDatePickerValue) => void
  value: TDatePickerValue
}

const CustomDatePicker = ({
  customClassName,
  value,
  onChange,
}: CustomDatePickerProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)

  return (
    <View
      className={clsx(
        'border-b py-3 border-accent text-text flex flex-row w-full',
        customClassName,
      )}
      style={{
        gap: 24,
      }}
    >
      <CustomText onPress={() => setIsDatePickerOpen(!isDatePickerOpen)}>
        {dayjs(value.date).format('DD/MM/YY (ddd)')}
      </CustomText>
      <CustomText onPress={() => setIsTimePickerOpen(!isTimePickerOpen)}>
        {dayjs(value.time).format('HH:mm')}
      </CustomText>

      <DateTimePickerModal
        date={new Date(value.date)}
        isVisible={isDatePickerOpen}
        mode="date"
        onConfirm={(date) => {
          onChange({ date, time: value.time })
          setIsDatePickerOpen(false)
        }}
        onCancel={() => setIsDatePickerOpen(false)}
      />
      <DateTimePickerModal
        date={new Date(value.time)}
        isVisible={isTimePickerOpen}
        mode="time"
        onConfirm={(newTime) => {
          onChange({ time: newTime, date: value.date })
          setIsTimePickerOpen(false)
        }}
        onCancel={() => setIsTimePickerOpen(false)}
      />
    </View>
  )
}

type FormDatePickerProps = Pick<CustomDatePickerProps, 'customClassName'> & {
  name: string
}

const FormDatePicker = ({ name }: FormDatePickerProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{
        date: new Date(),
        time: new Date(),
      }}
      render={({ field: { onChange, value } }) => {
        return <CustomDatePicker value={value} onChange={onChange} />
      }}
    />
  )
}

export default FormDatePicker
