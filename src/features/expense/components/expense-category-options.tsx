import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomText from '@/components/custom-text'
import { useFormContext } from 'react-hook-form'
import { Iconify } from 'react-native-iconify'
import { TCreateExpenseForm } from './add-expense-page'
import { useGetAllCategories } from '../hooks/query-hooks'

const CategoryIcon: Record<string, JSX.Element> = {
  Food: <Iconify icon="ph:bowl-food" size={24} color="white" />,
  'Social Life': <Iconify icon="formkit:people" size={24} color="white" />,
  Transport: <Iconify icon="ph:train" size={24} color="white" />,
  Household: <Iconify icon="ph:house" size={24} color="white" />,
  'Daily Needs': (
    <Iconify icon="ph:shopping-cart-simple" size={24} color="white" />
  ),
  Apparel: <Iconify icon="ph:coat-hanger" size={24} color="white" />,
  Health: <Iconify icon="solar:health-linear" size={24} color="white" />,
  Education: <Iconify icon="ph:student" size={24} color="white" />,
  Gift: <Iconify icon="ph:gift" size={24} color="white" />,
}

type Props = {
  setSelectedCategoryIcon: React.Dispatch<
    React.SetStateAction<JSX.Element | undefined>
  >
}

const ExpenseCategoryOptions = ({ setSelectedCategoryIcon }: Props) => {
  const { setValue } = useFormContext<TCreateExpenseForm>()

  const { data } = useGetAllCategories()

  return (
    <View className="p-6 flex flex-wrap flex-row" style={{ gap: 9 }}>
      {data?.map((category) => {
        const SelectedCategoryIconELement = CategoryIcon[category.name] ?? (
          <Iconify icon="ph:question" size={24} color="white" />
        )
        return (
          <TouchableOpacity
            key={category.name}
            onPress={() => {
              setValue('category.name', category.name)
              setValue('category.id', category.id)
              setSelectedCategoryIcon(SelectedCategoryIconELement)
            }}
            className="flex flex-row items-center bg-backgroundDimmed3 rounded-full px-3 py-2"
          >
            {SelectedCategoryIconELement}
            <CustomText customClassName="ml-1">{category.name}</CustomText>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default ExpenseCategoryOptions
