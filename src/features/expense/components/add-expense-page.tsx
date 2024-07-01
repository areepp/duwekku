import Button from '@/components/button'
import CustomText from '@/components/custom-text'
import FormDatePicker from '@/components/form-date-picker'
import FormTextInput from '@/components/form-text-input'
import { useState } from 'react'
import { View } from 'react-native'
import { FormProvider, useForm } from 'react-hook-form'

const AddExpensePage = () => {
  const [newBudgetName, setNewBudgetName] = useState('')
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
            placeholder="Enter name"
            customClassName="flex-1"
            keyboardType="number-pad"
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Category</CustomText>
          <FormTextInput
            name="category"
            value={newBudgetName}
            onChangeText={setNewBudgetName}
            placeholder="Enter name"
            customClassName="flex-1"
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Budget</CustomText>
          <FormTextInput
            name="budget"
            value={newBudgetName}
            onChangeText={setNewBudgetName}
            placeholder="Enter name"
            customClassName="flex-1"
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Note</CustomText>
          <FormTextInput
            name="note"
            value={newBudgetName}
            onChangeText={setNewBudgetName}
            placeholder="Enter name"
            customClassName="flex-1"
          />
        </View>
        <Button
          customClassName="mt-3"
          onPress={() => {
            // mutate(newBudgetName)
          }}
          text="Create Budget"
        />
      </View>
    </FormProvider>
  )
}

export default AddExpensePage
