import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import {
  TextInput,
  TextInputProps,
  View,
  Keyboard,
  Platform,
} from 'react-native'
import colors from 'tailwindcss/colors'
import CustomText from './custom-text'
import { Controller, useFormContext } from 'react-hook-form'

type CustomTextInputProps = TextInputProps & {
  customClassName?: string
  label?: string
  icon?: JSX.Element
}

export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      onChangeText,
      value,
      placeholder,
      customClassName,
      label,
      keyboardType,
      onFocus,
      onBlur,
      editable,
      showSoftInputOnFocus = true,
      icon,
    },
    ref,
  ) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const _ref = useRef<TextInput | null>(null)
    const inputRef = ref ?? _ref

    useEffect(() => {
      const showListener = Keyboard.addListener('keyboardDidShow', () =>
        setIsKeyboardOpen(true),
      )
      const hideListener = Keyboard.addListener('keyboardDidHide', () =>
        setIsKeyboardOpen(false),
      )
      return () => {
        showListener.remove()
        hideListener.remove()
      }
    }, [])

    return (
      <View
        className={clsx(
          'border-b py-3 border-accent text-text flex flex-row items-center w-full',
          customClassName,
        )}
        style={{
          gap: icon ? 4 : 24,
        }}
      >
        {label && (
          <CustomText customClassName="translate-y-1">{label}</CustomText>
        )}
        {icon}
        <TextInput
          className="text-text flex-1"
          ref={inputRef}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.zinc[700]}
          keyboardType={keyboardType}
          onFocus={(event) => {
            const isAndroid = Platform.OS === 'android'
            if (isAndroid && !showSoftInputOnFocus && isKeyboardOpen) {
              Keyboard.dismiss()
              // @ts-expect-error: current is not defined in type
              inputRef.current?.focus()
            } else {
              onFocus?.(event)
            }
          }}
          onBlur={onBlur}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
        />
      </View>
    )
  },
)

type FormTextInputProps = CustomTextInputProps & {
  name: string
}

const FormTextInput = ({ name, ...props }: FormTextInputProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <CustomTextInput
          {...props}
          value={value}
          onChangeText={(value) => {
            onChange(value)
          }}
        />
      )}
    />
  )
}

export default FormTextInput
