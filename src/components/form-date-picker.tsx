import clsx from 'clsx'
import { useState } from 'react'
import { View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import CustomText from './custom-text'

type FormDatePickerProps = {
  customClassName?: string
}

const FormDatePicker = ({ customClassName }: FormDatePickerProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<Date>(new Date())

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
        {dayjs(date).format('DD/MM/YY (ddd)')}
      </CustomText>
      <CustomText onPress={() => setIsTimePickerOpen(!isTimePickerOpen)}>
        {dayjs(time).format('HH:mm')}
      </CustomText>

      <DateTimePickerModal
        date={new Date(date)}
        isVisible={isDatePickerOpen}
        mode="date"
        onConfirm={(date) => {
          setDate(date)
          setIsDatePickerOpen(false)
        }}
        onCancel={() => setIsDatePickerOpen(false)}
      />
      <DateTimePickerModal
        date={new Date(time)}
        isVisible={isTimePickerOpen}
        mode="time"
        onConfirm={(date) => {
          console.log(date)
          setTime(date)
          setIsTimePickerOpen(false)
        }}
        onCancel={() => setIsTimePickerOpen(false)}
      />
    </View>
  )
}

export default FormDatePicker
