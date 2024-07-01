import clsx from 'clsx'
import { forwardRef } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import colors from 'tailwindcss/colors'
import CustomText from './custom-text'
import { Controller, useFormContext } from 'react-hook-form'

type CustomTextInputProps = TextInputProps & {
  customClassName?: string
  label?: string
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
    },
    ref,
  ) => {
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
        {label && (
          <CustomText customClassName="translate-y-1">{label}</CustomText>
        )}
        <TextInput
          ref={ref}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.zinc[700]}
          keyboardType={keyboardType}
          onFocus={onFocus}
          onBlur={onBlur}
          className="text-text flex-1"
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
