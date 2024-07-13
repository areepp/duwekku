import Button from '@/components/button'
import CustomText from '@/components/custom-text'
import FormDatePicker from '@/components/form-date-picker'
import FormTextInput from '@/components/form-text-input'
import { useState } from 'react'
import { View } from 'react-native'
import { FormProvider, useForm } from 'react-hook-form'
import { CATEGORIES } from '../utils/categories-constant'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AddExpensePage = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState<
    JSX.Element | undefined
  >(undefined)
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <View className="p-6 flex bg-background" style={{ gap: 9 }}>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Date</CustomText>
          <FormDatePicker name="transaction_date" />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Amount</CustomText>
          <FormTextInput
            name="amount"
            placeholder="Enter amount"
            customClassName="flex-1"
            keyboardType="number-pad"
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Category</CustomText>
          <FormTextInput
            name="category"
            placeholder="Enter category"
            customClassName="flex-1"
            showSoftInputOnFocus={false}
            onFocus={() => {
              setShowCategories(true)
            }}
            onBlur={() => {
              setShowCategories(false)
            }}
            icon={selectedCategoryIcon}
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Note</CustomText>
          <FormTextInput
            name="note"
            placeholder="Enter note"
            customClassName="flex-1"
          />
        </View>
        <Button
          onPress={() => console.log('fdasdfasadfs', methods.getValues())}
          customClassName="mt-3"
          text="Create Budget"
        />
      </View>
      {showCategories && (
        <View className="p-6 flex flex-wrap flex-row" style={{ gap: 9 }}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => {
                methods.setValue('category', category.name)
                setSelectedCategoryIcon(category.icon)
              }}
              className="flex flex-row items-center bg-backgroundDimmed3 rounded-full px-3 py-2"
            >
              {category.icon}
              <CustomText customClassName="ml-1">{category.name}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </FormProvider>
  )
}

export default AddExpensePage
